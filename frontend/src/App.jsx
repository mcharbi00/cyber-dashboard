import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [ip, setIp] = useState("");
  const [ports, setPorts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
  
        <div className="flex gap-2">
  
          <input
            type="text"
            placeholder="Adresse IP ou domaine"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 outline-none"
          />
  
          <button
            onClick={scanIP}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-black"
          >
            Scanner
          </button>
  
        </div>
  
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
  
            <div
              key={port}
              className="bg-zinc-800 border border-zinc-700 rounded-md p-3"
            >
              Port {port} ouvert
            </div>
  
          ))}
  
        </div>
  
      </div>
  
    </div>
  );
}

export default App;