function ScanForm({ ip, setIp, scanIP }) {

    return (
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
    );
  }
  
  export default ScanForm;