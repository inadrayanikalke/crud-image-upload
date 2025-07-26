# User CRUD API with Profile Picture Upload

This project is a secure, modular REST API built with Express.js, supporting user CRUD operations, JWT authentication, profile picture upload, and more.

## Features

- User CRUD (Create, Read, Update, Delete)
- JWT authentication & protected routes
- Profile picture upload (JPG/PNG) with Multer
- MongoDB with Mongoose
- Input validation (Joi/Zod)
- Centralized error handling
- Input sanitization & security (helmet, cors)
- Swagger API documentation
- Environment management with dotenv
- Unit tests with Jest

## Endpoints

- `POST   /users` — Create user (name, email, phone, role, password)
- `GET    /users` — List users (pagination/filtering)
- `GET    /users/:id` — Get user by ID
- `PUT    /users/:id` — Update user
- `DELETE /users/:id` — Delete user
- `POST   /users/:id/profile-pic` — Upload profile picture
- `GET    /users/:id/profile-pic` — Serve profile picture

## Setup

1. Clone the repo and install dependencies:
   ```sh
   git clone <repo-url>
   cd <project-folder>
   npm install
   ```
2. Create a `.env` file (see `.env.example`).
3. Start MongoDB locally or use a cloud provider.
4. Run the server:
   ```sh
   npm run dev
   ```
5. Access Swagger docs at `/api-docs`.

## Testing

```sh
npm test
```

---

> Built with Express, Mongoose, Multer, JWT, Joi/Zod, Jest, Swagger, Helmet, and CORS.
