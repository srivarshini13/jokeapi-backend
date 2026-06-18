# Joke API Backend

This is a backend-only project for managing jokes using Node.js, Express, MongoDB, and JWT authentication.

You can register users, log in, create jokes, edit them, delete them, and fetch jokes from the database. The frontend is not included, so the API is tested with tools like Thunder Client, Postman, or curl.

## Quick setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

3. Update `.env` with your MongoDB connection and a secret value for `JWT_SECRET`.

4. Start the app:
   ```bash
   npm run dev
   ```

## Main endpoints

### Authentication

- `POST /api/auth/register` — create a new user
- `POST /api/auth/login` — log in and get a JWT token
- `GET /api/auth/profile` — get the current user (requires token)

### Jokes

- `GET /api/jokes` — list all jokes
- `GET /api/jokes/:id` — get one joke by ID
- `POST /api/jokes` — add a joke (requires token)
- `PUT /api/jokes/:id` — update a joke (requires token)
- `DELETE /api/jokes/:id` — remove a joke (requires token)

## Notes

- Use the `Authorization: Bearer <token>` header for protected routes.
- Keep `.env` private and do not push it to GitHub.
- A database name is already set to `jokeapi` in `.env.example`.

## Testing

Use Thunder Client or Postman to call the API routes.
First register a user, then log in, copy the JWT token, and use it for protected joke requests.
