# Cyber Dashboard

Cyber Dashboard est un projet fullstack développé avec React et FastAPI permettant d'effectuer des scans réseau TCP sur une machine ou un domaine.

Le projet a été réalisé pour apprendre :
- le développement backend avec FastAPI
- React moderne avec hooks
- les bases du réseau en Python
- Docker et la containerisation
- le fonctionnement des sockets TCP

---

## Stack technique

### Frontend
- React
- Vite
- JavaScript
- TailwindCSS

### Backend
- FastAPI
- Python
- Pydantic
- Socket TCP / DNS

### DevOps
- Docker
- Docker Compose

---

## Fonctionnalités

- Scan de ports TCP
- Scan personnalisé de ports
- Détection des états OPEN / CLOSED / FILTERED
- Identification des services réseau courants
- Résolution DNS des domaines
- Historique des scans
- API REST avec FastAPI
- Validation des données avec Pydantic
- Gestion des erreurs HTTP
- Interface React avec TailwindCSS

---

## Fonctionnement réseau

Le scanner utilise des sockets TCP Python afin de tenter des connexions sur différents ports.

Le projet permet de comprendre :
- le fonctionnement des ports réseau
- les connexions TCP
- les timeouts réseau
- les services associés aux ports
- les bases du scan réseau

---

## API

L'API est développée avec FastAPI et utilise :
- des modèles Pydantic pour la validation
- des réponses typées
- des status HTTP adaptés
- la résolution DNS via le module `socket`

Documentation Swagger :

```text
http://127.0.0.1:8000/docs
```

---

## Exemple de résultat

Entrée :

```text
scanme.nmap.org
```

Résultat :

```text
Port 22 (SSH) → OPEN
Port 80 (HTTP) → OPEN
Port 443 (HTTPS) → OPEN
```

---

## Lancer le projet

### Sans Docker

#### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Lancer avec Docker

```bash
docker compose up --build
```

Frontend :
```text
http://localhost:5173
```

Backend :
```text
http://localhost:8000/docs
```

---

## Objectif du projet

Projet personnel réalisé pour approfondir :
- React
- FastAPI
- Python backend
- Docker
- les bases réseau
- les sockets TCP
- le développement fullstack
