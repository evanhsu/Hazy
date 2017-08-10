# Hazy Shade

## Prerequisites

* This project uses Node.js version 7.9.0.  If you use NVM:

        nvm install 7.9.0

* Global dependencies:
    * `node-gyp` (https://www.npmjs.com/package/node-gyp)
    
            npm install -g node-gyp
    
    * PostgreSQL Server (required in order to build the native Node bindings)
    
            sudo apt update && sudo apt install postgresql-server-dev-9.5

## Getting Started

1. Clone this repo

        git clone git@github.com:evanhsu/Hazy.git && cd Hazy
        
1. Create a `.env` file. Copy the `.env.example` file to get started with defaults for the development environment.

        cp .env.example .env
    
1. Install dependencies

        npm install
        
1. Build the project and watch for changes (for development)

        npm run build:watch
