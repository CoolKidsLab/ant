# Ant

[![Python 3.12+](https://img.shields.io/badge/python-3.12+-blue.svg)](https://www.python.org/downloads/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Ant is a community-driven AI automation framework that combines large language models with specialized tools for tasks like web search, crawling, and Python code execution.

## Table of Contents

- [Quick Start](#quick-start)
- [Project Statement](#project-statement)
- [Architecture](#architecture)
- [Features](#features)
- [Setup](#setup)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Configuration](#configuration)
- [Usage](#usage)
- [Docker](#docker)
- [Web UI](#web-ui)
- [Development](#development)
- [FAQ](#faq)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Quick Start

```bash
# Clone the repository
git clone https://github.com/CoolKidsLabs/ant.git
cd ant

# Install dependencies, uv will take care of the python interpreter and venv creation
uv sync

# Playwright install to use Chromium for browser-use by default
uv run playwright install

# Configure environment
# Windows: copy .env.example .env
cp .env.example .env
# Edit .env with your API keys

# Run the project
uv run main.py
```

## Architecture

Ant implements a hierarchical multi-agent system where a supervisor coordinates specialized agents to accomplish complex tasks:

![Ant Architecture](./assets/architecture.png)

The system consists of the following agents working together:

1. **Coordinator** - The entry point that handles initial interactions and routes tasks
2. **Planner** - Analyzes tasks and creates execution strategies
3. **Supervisor** - Oversees and manages the execution of other agents
4. **Researcher** - Gathers and analyzes information
5. **Coder** - Handles code generation and modifications
6. **Browser** - Performs web browsing and information retrieval
7. **Reporter** - Generates reports and summaries of the workflow results

## Features

### Core Capabilities

- 🤖 **LLM Integration**
    - It supports the integration of most models through [litellm](https://docs.litellm.ai/docs/providers). 
    - Support for open source models like Qwen
    - OpenAI-compatible API interface
    - Multi-tier LLM system for different task complexities

### Tools and Integrations

- 🔍 **Search and Retrieval**
    - Web search via Tavily API
    - Neural search with Jina
    - Advanced content extraction

### Development Features

- 🐍 **Python Integration**
    - Built-in Python REPL
    - Code execution environment
    - Package management with uv

### Workflow Management

- 📊 **Visualization and Control**
    - Workflow graph visualization
    - Multi-agent orchestration
    - Task delegation and monitoring

## Setup

### Prerequisites

- [uv](https://github.com/astral-sh/uv) package manager

### Installation

Ant leverages [uv](https://github.com/astral-sh/uv) as its package manager to streamline dependency management.
Follow the steps below to set up a virtual environment and install the necessary dependencies:

```bash
# Step 1: Create and activate a virtual environment through uv
uv python install 3.12
uv venv --python 3.12

source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Step 2: Install project dependencies
uv sync
```

By completing these steps, you'll ensure your environment is properly configured and ready for development.

### Configuration

tbd

> **Note:**
>
> - The system uses different models for different types of tasks:
>     - The reasoning LLM is used for complex decision-making and analysis.
>     - The basic LLM is used for simple text tasks.
>     - The vision-language LLM is used for tasks involving image understanding.
> - The configuration of all LLMs can be customized independently.
> - The Jina API key is optional. Providing your own key can obtain a higher rate limit (you can obtain this key at [jina.ai](https://jina.ai/)).
> - The default configuration for Tavily search is to return up to 5 results (you can obtain this key at [app.tavily.com](https://app.tavily.com/)). 

### Configure Pre-commit Hook

Ant includes a pre-commit hook that runs linting and formatting checks before each commit. To set it up:

1. Make the pre-commit script executable:

```bash
chmod +x pre-commit
```

2. Install the pre-commit hook:

```bash
ln -s ../../pre-commit .git/hooks/pre-commit
```

The pre-commit hook will automatically:

- Run linting checks (`make lint`)
- Run code formatting (`make format`)
- Add any reformatted files back to staging
- Prevent commits if there are any linting or formatting errors

## Usage

### Basic Execution

To run Ant with default settings:

```bash
uv run main.py
```

### API Server

Ant provides a FastAPI-based API server with streaming support:

```bash
# Start the API server
make serve

# Or run directly
uv run server.py
```

The API server exposes the following endpoints:

- `POST /api/chat/stream`: Chat endpoint for LangGraph invoke with streaming support
    - Request body:
  ```json
  {
    "messages": [{ "role": "user", "content": "Your query here" }],
    "debug": false
  }
  ```
    - Returns a Server-Sent Events (SSE) stream with the agent's responses

### Advanced Configuration

Ant can be customized through various configuration files in the `src/config` directory:

- `env.py`: Configure LLM models, API keys, and base URLs
- `tools.py`: Adjust tool-specific settings (e.g., Tavily search results limit)
- `agents.py`: Modify team composition and agent system prompts

### Agent Prompts System

Ant uses a sophisticated prompting system in the `src/prompts` directory to define agent behaviors and responsibilities:

#### Core Agent Roles

- **Supervisor ([`src/prompts/supervisor.md`](src/prompts/supervisor.md))**: Coordinates the team and delegates tasks by analyzing requests and determining which specialist should handle them. Makes decisions about task completion and workflow transitions.

- **Researcher ([`src/prompts/researcher.md`](src/prompts/researcher.md))**: Specializes in information gathering through web searches and data collection. Uses Tavily search and web crawling capabilities while avoiding mathematical computations or file operations.

- **Coder ([`src/prompts/coder.md`](src/prompts/coder.md))**: Professional software engineer role focused on Python and bash scripting. Handles:

    - Python code execution and analysis
    - Shell command execution
    - Technical problem-solving and implementation

- **File Manager ([`src/prompts/file_manager.md`](src/prompts/file_manager.md))**: Handles all file system operations with a focus on properly formatting and saving content in markdown format.

- **Browser ([`src/prompts/browser.md`](src/prompts/browser.md))**: Web interaction specialist that handles:
    - Website navigation
    - Page interaction (clicking, typing, scrolling)
    - Content extraction from web pages

#### Prompt System Architecture

The prompts system uses a template engine ([`src/prompts/template.py`](src/prompts/template.py)) that:

- Loads role-specific markdown templates
- Handles variable substitution (e.g., current time, team member information)
- Formats system prompts for each agent

Each agent's prompt is defined in a separate markdown file, making it easy to modify behavior and responsibilities without changing the underlying code.

## Docker

Ant can be run in a Docker container. default serve api on port 8000.

Before run docker, you need to prepare environment variables in `.env` file.

```bash
docker build -t ant .
docker run --name ant -d --env-file .env -e CHROME_HEADLESS=True -p 8000:8000 ant
```

You can also just run the cli with docker.

```bash
docker build -t ant .
docker run --rm -it --env-file .env -e CHROME_HEADLESS=True ant uv run python main.py
```

## Web UI

Ant provides a default web UI.

Please refer to the [CoolKidsLabs/ant-web](https://github.com/CoolKidsLabs/ant-web) project for more details.

## Docker Compose (include both backend and frontend)

Ant provides a docker-compose setup to easily run both the backend and frontend together:

```bash
# Start both backend and frontend
docker compose -f docker-compose.dev.yml up -d

# The backend will be available at http://localhost:8000
# The frontend will be available at http://localhost:3000, which could be accessed through web browser
```

This will:
1. Build and start the Ant backend container
2. Build and start the Ant web UI container
3. Connect them using a shared network

** Make sure you have your `.env` file prepared with the necessary API keys before starting the services. **

## Development

### Testing

Run the test suite:

```bash
# Run all tests
make test

# Run specific test file
pytest tests/integration/test_workflow.py

# Run with coverage
make coverage
```

### Code Quality

```bash
# Run linting
make lint

# Format code
make format
```

## FAQ

Please refer to the [FAQ.md](docs/FAQ.md) for more details.

## Contributing

We welcome contributions of all kinds! Whether you're fixing a typo, improving documentation, or adding a new feature, your help is appreciated. Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to get started.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

Special thanks to all the open source projects and contributors that make Ant possible. We stand on the shoulders of giants.

In particular, we want to express our deep appreciation for:
- [LangChain](https://github.com/langchain-ai/langchain) for their exceptional framework that powers our LLM interactions and chains
- [LangGraph](https://github.com/langchain-ai/langgraph) for enabling our sophisticated multi-agent orchestration
- [Browser-use](https://pypi.org/project/browser-use/) for control browser

These amazing projects form the foundation of Ant and demonstrate the power of open source collaboration.
