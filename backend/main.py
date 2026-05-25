from fastapi import FastAPI,HTTPException
from pydantic import BaseModel
import socket
from fastapi.middleware.cors import CORSMiddleware
from concurrent.futures import ThreadPoolExecutor

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class ScanRequest(BaseModel):
    ip: str
    ports: str

class PortResult(BaseModel):
    port: int
    status: str
    service: str
class ScanResponse(BaseModel):
    target: str
    resolved_ip: str
    results: list[PortResult]

COMMON_SERVICES = {
    21: "FTP",
    22: "SSH",
    80: "HTTP",
    443: "HTTPS",
    3306: "MySQL",
}
@app.get("/")
def root():
    return {"message": "Cyber Dashboard API"}
def scan_port(target, port):

    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(0.5)

    try:

        result = sock.connect_ex((target, port))

        status = "OPEN" if result == 0 else "CLOSED"

    except socket.timeout:

        status = "FILTERED"

    sock.close()

    return {
        "port": port,
        "status": status,
        "service": COMMON_SERVICES.get(port, "Unknown")
    }
@app.post("/scan",response_model=ScanResponse)
def scan_ports(data: ScanRequest):
    ports_to_scan = [int(port) for port in data.ports.split(",")]
    if not data.ip.strip():
        return {
            "error": "IP ou domaine invalide"
        }
    scan_results = []
    try :
        resolved_ip = socket.gethostbyname(data.ip)
    except Exception as e:

        print(e)

        raise HTTPException(
            status_code=400,
            detail="Impossible de résoudre ce domaine"
        )

    with ThreadPoolExecutor(max_workers=20) as executor:

        scan_results = list(
            executor.map(
                lambda port: scan_port(data.ip, port),
                ports_to_scan
            )
        )


    return {
        "target": data.ip,
        "resolved_ip": resolved_ip,
        "results": scan_results
    }