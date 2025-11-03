# Zhaps Backend

This backend provides user authentication (JWT) and a Bonus Hunt management system using Node.js, Express, Sequelize and MySQL.

Quickstart

1. Copy `.env.example` to `.env` and set your DB credentials and `JWT_SECRET`.

2. Install dependencies (run in `backend`):

```powershell
cd "c:\programacion proyectos\zhaps-website\backend"
npm install
```

3. Create the database in MySQL (name matching `DB_NAME` in `.env`).

4. Sync models to database:

```powershell
npm run migrate
```

5. Start the server:

```powershell
npm run dev
```

API endpoints

- POST /auth/register { username, email, password }
- POST /auth/login { email, password } -> returns token
- GET /auth/me (Authorization: Bearer <token>)

- GET /bonus-hunts (authorized)
- GET /bonus-hunts/:id (authorized)
- POST /bonus-hunts { nombre, monto_inicial }
- PUT /bonus-hunts/:id
- DELETE /bonus-hunts/:id (marks as cancelled)

- POST /bonus-hunts/:id/bonos { juego, apuesta, proveedor?, ganancia?, abierto? }
- PUT /bonus-hunts/:id/bonos/:bonoId
- DELETE /bonus-hunts/:id/bonos/:bonoId

Notes

- This is a minimal, modular scaffold intended to be integrated with a React/Next frontend.
- Tokens are JWT signed with `JWT_SECRET` and should be stored by the frontend (e.g., localStorage) and sent in the Authorization header as `Bearer <token>`.
# Zhaps Backend

This backend provides user authentication (JWT) and a Bonus Hunt management system using Node.js, Express, Sequelize and MySQL.

Quickstart

1. Copy `.env.example` to `.env` and set your DB credentials and `JWT_SECRET`.

2. Install dependencies (run in `backend`):

```powershell
npm install
```

3. Create the database in MySQL (name matching `DB_NAME` in `.env`).

4. Sync models to database:

```powershell
npm run migrate
```

5. Start the server:

```powershell
npm run dev
```

API endpoints

- POST /auth/register { username, email, password }
- POST /auth/login { email, password } -> returns token
- GET /auth/me (Authorization: Bearer <token>)

- GET /bonus-hunts (authorized)
- GET /bonus-hunts/:id (authorized)
- POST /bonus-hunts { nombre, monto_inicial }
- PUT /bonus-hunts/:id
- DELETE /bonus-hunts/:id (marks as cancelled)

- POST /bonus-hunts/:id/bonos { juego, apuesta, proveedor?, ganancia?, abierto? }
- PUT /bonus-hunts/:id/bonos/:bonoId
- DELETE /bonus-hunts/:id/bonos/:bonoId

Notes

- This is a minimal, modular scaffold intended to be integrated with a React/Next frontend.
- Tokens are JWT signed with `JWT_SECRET` and should be stored by the frontend (e.g., localStorage) and sent in the Authorization header as `Bearer <token>`.
