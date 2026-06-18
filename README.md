# Joke Management System Backend

A backend-only Joke Management System built with Node.js, Express, MongoDB, JWT authentication, and CRUD operations.

## Features

- User registration and login
- Password hashing with bcrypt
- JWT authentication and protected routes
- Full CRUD for jokes
- MongoDB storage via Mongoose
- Clean project structure and readable code

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and update values:
   ```bash
   cp .env.example .env
   ```

3. Start MongoDB locally (for example, `mongod` if installed).

4. Run the server in development mode:
   ```bash
   npm run dev
   ```

5. Or run normally:
   ```bash
   npm start
   ```

## API Endpoints

### Auth

- `POST /api/auth/register` — register a new user
- `POST /api/auth/login` — login and receive a JWT
- `GET /api/auth/profile` — get current user profile (protected)

### Jokes

- `GET /api/jokes` — list all jokes
- `GET /api/jokes/:id` — get a joke by id
- `POST /api/jokes` — create a joke (protected)
- `POST /api/jokes/fetch-external` — fetch and store a joke from an external Joke API (protected, optional)
- `PUT /api/jokes/:id` — update a joke (protected)
- `DELETE /api/jokes/:id` — delete a joke (protected)

## Notes

- No frontend is required. You can test endpoints with Postman, Insomnia, or curl.
- Keep API keys and secrets in `.env`; do not commit them.
- Image upload is optional and not implemented here per requirements.
