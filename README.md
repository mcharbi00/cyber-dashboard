# Cyber Dashboard

Application fullstack développée avec React et FastAPI permettant d'effectuer un scan réseau basique et d'afficher les ports ouverts d'une machine ou d'un domaine.

## Technologies utilisées

### Frontend
- React
- Vite
- JavaScript

### Backend
- FastAPI
- Python
- Pydantic

## Fonctionnalités

- Scan de ports réseau
- API REST avec FastAPI
- Communication frontend/backend
- Affichage dynamique des résultats
- Gestion du CORS

## Exemple

Entrée :

```text
scanme.nmap.org
```

Résultat :

```text
Port 22 ouvert
Port 83 ouvert
```

## Lancer le projet

### Backend

```bash
cd backend
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Objectif

Projet personnel réalisé pour approfondir :
- le développement fullstack
- React
- FastAPI
- les bases réseau en Python
