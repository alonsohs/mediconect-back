
# Mediconect-back

API REST del sistema Mediconect contruido con Express.js y Postgres

Sistema de acceso a historiales medicos de pacientes online





## Requisites

The following programs are required to run the project

```bash
  - Docker
  - Node
  - npm
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/alonsohs/mediconect-back.git
```

Go to the project directory

```bash
  cd mediconect-back
```

Create postgres data folder

```bash
  mkdir "postgres_data"
```

Compose docker container for postgres

```bash
  docker-compose up -d postgres
```

Compose docker container for pgadmin

```bash
  docker-compose up -d pgadmin
```

Run database migrations

```bash
  npm run migrations:run
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

