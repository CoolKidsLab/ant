# Ant Web UI

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**The default Web UI for [Ant](https://github.com/CoolKidsLabs/ant).**

Ant is a community-driven AI automation framework that combines large language models with specialized tools for tasks like web search, crawling, and Python code execution.

## Table of Contents

- [Quick Start](#quick-start)
- [Docker](#docker)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Quick Start

### Prerequisites

- [Ant](https://github.com/CoolKidsLabs/ant)
- Node.js (v22.14.0+)
- pnpm (v10.6.2+) as package manager

### Configuration

Create a `.env` file in the project root and configure the following environment variables:

- `NEXT_PUBLIC_API_URL`: The URL of the Ant API.

It's always a good idea to start with the given example file, and edit the `.env` file with your own values:

```bash
cp .env.example .env
```

### Installation

**IMPORTANT: First, **start the Python server**, see [Ant](https://github.com/CoolKidsLabs/ant) for more details.**

```bash
# Clone the repository
git clone https://github.com/CoolKidsLabs/ant-web.git
cd ant-web

# Install dependencies
pnpm install

# Run the project in development mode
pnpm dev
```

Then open your browser and navigate to http://localhost:3000

Have fun!

## Docker

You can also run this project with Docker.

First, you need read the [configuration](#configuration) below. Make sure `.env` file is ready.

Second, to build a Docker image of your own web server:

```bash
docker build --build-arg NEXT_PUBLIC_API_URL=YOUR_ANT_API -t ant-web .
```

Final, start up a docker container running the web server:

```bash
# Replace ant-web with your preferred container name
docker run -d -t -p 3000:3000 --env-file .env --name ant-web ant-web

# stop the server
docker stop ant-web
```

### Docker Compose

You can also setup this project with the docker compose:

```bash
# building docker image
docker compose build

# start the server
docker compose up
```

## Contributing

We welcome contributions of all kinds! Whether you're fixing a typo, improving documentation, or adding a new feature, your help is appreciated. Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to get started.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

Special thanks to all the open source projects and contributors that make Ant possible. We stand on the shoulders of giants.
