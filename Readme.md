# Hazy Shade

# Building the Project

The scripted setup process will create a virtual machine using Vagrant that will run the app locally for development.
Ansible is used to provision the virtual machine.

## Prerequisites

> ### Ansible:
> 
> You will need Ansible >= v2.2.0 to provision the vagrant machine.
>
>       sudo apt install ansible
>
> ### Vagrant
>
>       sudo apt install vagrant
> ### Vagrant Plugins
>
> 1) vagrant-hostmanager: `$ vagrant plugin install vagrant-hostmanager`
>
> 2) vagrant-vbguest: `$ vagrant plugin install vagrant-vbguest`



# Building the Project Manually

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
        
1. Create database tables and insert seed data: 

   From inside the virtual machine, run this command on each file in the `sql/schema` folder,
   
   THEN run it on each `.sql` file in the `sql/bootstrap` folder: 

        psql -U hazyshade -d hazyshade -a -f [filename].sql
        
1. Build the project and watch for changes (for development)

        npm run build:watch

