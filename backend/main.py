from fastapi import FastAPI,HTTPException
from pydantic import BaseModel
import socket
from fastapi.middleware.cors import CORSMiddleware

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
class ScanResponse(BaseModel):
    target: str
    resolved_ip: str
    results: list[PortResult]

@app.get("/")
def root():
    return {"message": "Cyber Dashboard API"}

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

    for port in ports_to_scan:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM) # socket .AF_INET -> désigne l'ipv4 // .SOCK_STREAM désigne le protocole TCP
        sock.settimeout(0.5)

        result = sock.connect_ex((data.ip, port))

        scan_results.append({
            "port": port,
            "status": "OPEN" if result == 0 else "CLOSED"
        })

        sock.close()

    return {
        "target": data.ip,
        "resolved_ip": resolved_ip,
        "results": scan_results
    }