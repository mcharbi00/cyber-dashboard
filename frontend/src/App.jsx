import { useEffect, useState } from "react";
import PortCard from "./components/PortCard";
import ScanForm from "./components/ScanForm";

function App() {
  const [message, setMessage] = useState("");
  const [ip, setIp] = useState("");
  const [ports, setPorts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory]= useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);
  const scanIP = async () => {
    setPorts([]); //Permet d'effacer les précédents resultats
    try {
    setLoading(true);
    const response = await fetch("http://127.0.0.1:8000/scan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ip }),
    });

  
    const data = await response.json();
  
    setPorts(data.open_ports);
    setHistory((prev) => [
      {
        target: ip,
        ports: data.open_ports,
        time: new Date().toLocaleTimeString(),
      },
      ...prev, // ... Permet de déplier le tableau
    ])
  }
  catch(err){
    setError("Erreur pendant le scan");

  }
  finally{
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
  
        <div className="mt-5 space-y-2">

          {ports.map((port) => (
            <PortCard key={port} port={port} />

          ))}
  
        </div>
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