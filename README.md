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
2. Run the development environment:
   ```bash
   docker-compose -f docker-compose.dev.yml up
   ```
3. Access the application at `http://localhost:3000`

### Production

To deploy the production environment:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## License

This project is licensed under the MIT License. 