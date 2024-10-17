# FrontEnd - React
# BackEnd - NodeJs & Express
# Database - Postgres

# Initial Steps
# FrontEnd Installation
Create a env file if not existed 
    -Add the APP URL as per your convenient of backend
    VITE_APP_URL = 'http://localhost:8080'
    VITE_SOCKET_SERVER_URL = 'http://localhost:8080'

-- For Installing the dependencies
```bash
npm install 
```
-- For Running the Static files
```bash
npm install -g serve  
```

-- For create the build
```bash
npm run dev 
```

-- to run the build
```bash
serve -s dist -l 5173 
```
I have configured the 5173 port no for cors. So make sure the front end port is running in a port and port is 5173.

Default Port is http://localhost:5173/ -- In development mode 


# Backend

## For Database

- navigate to the backend directory

create database traffic_signal;

-- Run this both commands for initial table and data
```bash
psql -U postgres -d matex_coc -h localhost -f initial-table.sql    
psql -U postgres -d matex_coc -h localhost -f initial-data.sql    
```

-- For Installing the dependencies
```bash
npm install 
```

-- Before start the backend kindly check the .env files of backend if not kindly add the following env variables
PORT=8080
DB_PASSWORD=
DB_USERNAME=postgres
DB_HOST=localhost

--To start the back end
```bash
node index.js
```



