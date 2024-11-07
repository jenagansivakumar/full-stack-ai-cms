
# AI-Enhanced Content Workflow Manager



This project is a content management system with AI-enhanced features, allowing for CRUD operations, automated tagging using OpenAI, and content recommendations. It’s fully containerized using Docker for ease of deployment.



## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Docker Setup](#docker-setup)
- [API Endpoints](#api-endpoints)
- [Future Enhancements](#future-enhancements)

  

## Features

- CRUD Operations: Easily add, update, delete, and view content.
- AI-Powered Tagging: Generates tags based on content using OpenAI API.
- Content Recommendations: Provides recommendations based on keywords.
- Dockerized Setup: All components are containerized for streamlined deployment.
## tech-stack

- Backend: Node.js, Express, MongoDB
- Frontend: React, TypeScript
- AI Integration: OpenAI API
- Docker: Containerised environment using Docker and Docker Compose

  
## project-Structure
- backend/
  - index.ts              # Main server file
  - controllers/          # API controllers
  - models/               # Database models
  - services/             # AI integration and other services
  - Dockerfile            # Docker configuration
- frontend/
  - src/
    - components/         # React components
    - services/           # API calls
  - Dockerfile            # Docker configuration for frontend
- docker-compose.yml      # Docker Compose setup

  
## prerequisites
- Node.js v18+
- Docker
- MongoDB is managed within Docker, so no external setup is needed.

  
## installation


1. Clone the repository:
```bash 
git clone https://github.com/jenagansivakumar/ai-enhanced_content_workflow_manager.git
```

2. Install Dependencies:
Navigate to both backend and frontend folders to install dependencies.

For Backend:
```bash
cd ai-enhanced_content_workflow_manager_backend
npm install
```

For Frontend:
```bash
cd ../ai-enhanced_content_workflow_manager_frontend
npm install
```

## environment-variables:

Create a .env file in ai-enhanced_content_workflow_manager_backend and add the following:

```bash
AI_API_KEY=<Your OpenAI API Key>
DATABASE_URL=mongodb://mongo:27017/ai_content_management
NODE_ENV=production
```

## usage
Running Locally
1. Start the MongoDB database:
```bash
docker run -d -p 27017:27017 --name mongo mongo:5
```

2. In the backend folder, start the server:
```bash
npm run dev
```

3. In the frontend folder, start the React app:
```bash
npm start
```


## docker-setup
This project is fully Dockerized with both frontend and backend components. Follow these steps to get started.

1. Ensure Docker is running.
2. From the ai-enhanced_content_workflow_manager_backend folder, run the following:

```bash
docker compose up --build
```

This will:

- Build and run the backend, frontend, and MongoDB containers.
- Expose the backend on port 4000 and frontend on port 3000.

To stop the services:
```bash
docker compose down
```

## api-endpoints

### Base URL
`http://localhost:4000`

### Endpoints

| Method | Endpoint              | Description                          |
|--------|------------------------|--------------------------------------|
| GET    | `/api/content`         | Retrieves all content items         |
| POST   | `/api/content`         | Creates a new content item          |
| PUT    | `/api/content/:id`     | Updates a content item              |
| DELETE | `/api/content/:id`     | Deletes a content item              |
| GET    | `/api/content/search`  | Searches content by keyword         |

---

## future-enhancements

- **Advanced AI Features:** Incorporate additional AI models for deeper content analysis.
- **Improved Search Algorithms:** Implement fuzzy matching or semantic search for better search results.
- **User Authentication:** Add user roles and authentication to enhance security.
- **Customizable Tagging:** Allow users to customize the tag generation.

---

## commands-summary

## development

- Run backend: `npm run dev`
- Run frontend: `npm start`
- Run MongoDB: `docker run -d -p 27017:27017 --name mongo mongo:5`

## docker

- Build and run containers: `docker compose up --build`
- Stop containers: `docker compose down`

---

## contact

If you have any questions or suggestions, feel free to reach out!

---
