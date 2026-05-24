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
class ScanResponse(BaseModel):
    target: str
    resolved_ip: str
    open_ports: list[int]
@app.get("/")
def root():
    return {"message": "Cyber Dashboard API"}

@app.post("/scan",response_model=ScanResponse)
def scan_ports(data: ScanRequest):
    if not data.ip.strip():
        return {
            "error": "IP ou domaine invalide"
        }
    ports = [21, 22, 80, 443, 3306]
    open_ports = []
    try :
        resolved_ip = socket.gethostbyname(data.ip)
    except Exception as e:

        print(e)

        raise HTTPException(
            status_code=400,
            detail="Impossible de résoudre ce domaine"
        )

    for port in ports:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(0.5)

        result = sock.connect_ex((data.ip, port))

        if result == 0:
            open_ports.append(port)

        sock.close()

    return {
        "ip": data.ip,
        "resolved_ip": resolved_ip,
        "open_ports": open_ports
    }