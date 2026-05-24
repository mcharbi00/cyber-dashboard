import { useEffect, useState } from "react";
import PortCard from "./components/PortCard";
import ScanForm from "./components/ScanForm";
import { scanTarget } from "./services/api";

function App() {
  const [message, setMessage] = useState("");
  const [ip, setIp] = useState("");
  const [scanResult, setScanResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory]= useState([]);
  const [portsInput, setPortsInput] = useState("80,443");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);
  const scanIP = async () => {

    try {
  
      setLoading(true);
      setError("");
      setScanResult(null);
  
      const data = await scanTarget(ip,portsInput);
  
      if (data.detail) {
        setError(data.detail);
        return;
      }
  
      setScanResult(data);
  
      setHistory((prev) => [
        {
          target: ip,
          ports: data.results
          .filter((result) => result.status === "OPEN")
          .map((result) => result.port),

          time: new Date().toLocaleTimeString(),
        },
        ...prev,
      ]);
  
    } catch (err) {
  
      setError("Erreur pendant le scan");
  
    } finally {
  
      setLoading(false);
  
    }
  };


  
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4">
  
      <div className="w-full max-w-xl bg-zinc-900 p-6 rounded-lg">
  
        <h1 className="text-3xl font-semibold mb-5">
          Cyber Dashboard
        </h1>
  
        <ScanForm
          ip={ip}
          setIp={setIp}
          scanIP={scanIP}
          loading={loading}
          portsInput={portsInput}
          setPortsInput={setPortsInput}
        /> 
  
        {loading && (
          <p className="mt-4 text-zinc-400">
            Scan en cours...
          </p>
        )}
  
        {error && (
          <p className="mt-4 text-red-500">
            {error}
          </p>
        )}
  
  {scanResult && (

<div className="mt-5 space-y-2">

  <div className="bg-zinc-800 border border-zinc-700 rounded-md p-3">
    IP : {scanResult.resolved_ip}
  </div>

  {scanResult.results.map((result) => (
    <div
    key={result.port}
    className={`border rounded-md p-3 ${
      result.status === "OPEN"
      ? "bg-green-900 border-green-700"
      : result.status === "FILTERED"
      ? "bg-yellow-900 border-yellow-700"
      : "bg-red-900 border-red-700"
    }`}
  >
    Port {result.port} ({result.service}) → {result.status}
  </div>

  ))}

</div>
)}
        <div className="mt-8">

      <h2 className="text-lg mb-3">
        Historique
      </h2>

      <div className="space-y-2">

        {history.map((scan, index) => (

          <div
            key={index}
            className="bg-zinc-800 border border-zinc-700 rounded-md p-3 text-sm"
          >
            [{scan.time}] {scan.target} → ports : {scan.ports.join(", ")}
          </div>

        ))}

      </div>

</div>
      </div>
  
    </div>
  );
}

export default App;