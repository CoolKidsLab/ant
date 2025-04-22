# Ant Project

Ant is a community-driven AI automation framework that combines large language models with specialized tools for tasks like web search, crawling, and Python code execution.

## Project Structure

- `frontend/`: Next.js-based frontend application
- `backend/`: Python backend service
- `proxy/`: Caddy reverse proxy
- `docker-compose.dev.yml`: Development environment configuration
- `docker-compose.prod.yml`: Production environment configuration

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Development

1. Clone the repository
2. Configure ./backend/.env
3. Run the development environment:
   ```bash
   docker compose -f docker-compose.dev.yml up
   ```
4. Access the application at `http://localhost:3000`

### Production

1. Clone the repository
2. Configure ./backend/.env and ./frontend/.env
3. Deploy the production environment:
```bash
docker compose -f docker-compose.prod.yml up -d
```
4. Access the application at `https://moochee.us`

## License

This project is licensed under the MIT License. 
