export async function scanTarget(ip) {

    const response = await fetch("http://127.0.0.1:8000/scan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ip }),
    });
  
    return response.json();
  }
  