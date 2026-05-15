# Nice Application

A premium full-stack application built with React, Express, and MySQL.

## Tech Stack
- **Frontend**: React (Vite), Vanilla CSS, Lucide Icons
- **Backend**: Node.js, Express, MySQL, JWT, Bcrypt
- **Infrastructure**: Docker, Docker Compose
- **CI/CD**: GitHub Actions

## Prerequisites
- Docker and Docker Compose installed.

## How to Run

1. **Clone the repository** (if not already done).
2. **Start the containers**:
   ```bash
   docker compose up --build -d
   ```
3. **Wait for MySQL to be healthy** (check `docker compose ps`).
4. **Run the Seeder** to input initial data (users and products):
   ```bash
   docker compose exec backend npm run seed
   ```
5. **Access the Application**:
   - Landing Page: `http://localhost`
   - Login Page: `http://localhost/login`
   - Dashboard: `http://localhost/dashboard` (after login)

## Default Credentials
- **Username**: `admin`
- **Password**: `admin123`

## Features
- **Modern Landing Page**: Premium design with animations and glassmorphism.
- **JWT Authentication**: Secure login flow.
- **Protected Dashboard**: Fetch and display Products and Users in a clean table format.
- **Responsive Design**: Works across different screen sizes.
- **Dockerized**: Easy setup with a single command.
