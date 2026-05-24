# Cyber Dashboard

Application fullstack développée avec React et FastAPI permettant d'effectuer un scan réseau basique et d'afficher les ports ouverts d'une machine ou d'un domaine.

## Technologies utilisées

### Frontend
- React
- Vite
- JavaScript
- TailwindCSS

### Backend
- FastAPI
- Python
- Pydantic

## Fonctionnalités


- Scan de ports réseau
- Résolution DNS
- Historique des scans
- API REST avec FastAPI
- Gestion des erreurs HTTP
- Validation des données avec Pydantic
- Interface React avec TailwindCSS
  
## API

L'API est développée avec FastAPI et utilise :
- Pydantic pour la validation des données
- des modèles de réponse typés
- des status HTTP adaptés
- la résolution DNS via le module socket

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
