import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [ip, setIp] = useState("");
  const [ports, setPorts] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);
  const scanIP = async () => {

    const response = await fetch("http://127.0.0.1:8000/scan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ip }),
    });
  
    const data = await response.json();
  
    setPorts(data.open_ports);
  };
  return (
    <div>
  <h1>Cyber Dashboard</h1>

  <input
    type="text"
    placeholder="Adresse IP"
    value={ip}
    onChange={(e) => setIp(e.target.value)}
  />

  <button onClick={scanIP}>
    Scanner
  </button>

  <ul>
    {ports.map((port) => (
      <li key={port}>
        Port {port} ouvert
      </li>
    ))}
  </ul>
</div>
  );
}

export default App;