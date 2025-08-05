# 📋 Note Creation App

<div align="center">

![Estado del Proyecto](https://img.shields.io/badge/estado-activo-brightgreen)
![Licencia](https://img.shields.io/badge/licencia-MIT-blue)
![Versión](https://img.shields.io/badge/versión-1.0.0-orange)

</div>

Full-stack application for note creation and management built with React, NestJS and Prisma.

## ✨ Features

- ✅ CRUD: Create, read, update, and delete notes
- 🔄 Note status management (Pending, In Progress, Completed)
- 📱 Responsive design and modern style using Bootstrap
- 🎨 Modern interface with gradients and animations
- 🔒 Form validation
- 💾 Database: Persistence with SQLite and Prisma ORM

## 🛠️ Required Technologies

### Runtimes and Engines

- Node.js v18.17.0 or higher
- npm v9.6.7 or higher

### Frontend

- React v18.2.0
- React Router DOM v6.14.2
- Vite v4.4.5
- Bootstrap v5.3 - Framework CSS
- Bootstrap Icons - Iconography

### Backend

- NestJS v10.0.0
- Prisma v5.x - Modern ORM for TypeScript
- SQLite - Lightweight database
- class-validator v0.14.0
- class-transformer v0.5.1

### Development Tools

- TypeScript - Static typing
- ESLint - Code linting
- Prettier - Code formatting

## 🚀 Quick Start

### Prerequisites

- Node.js v18.17.0 or higher
- npm v9.6.7 or higher
- Git

### 📥 Clone the Repository

```bash
# Clone the project
git clone https://github.com/jacquelineroballo/ensolvers-challenge.git

# Enter the directory
cd ensolvers-challenge
```

### 🔧 Installation

```bash
# Install backend dependencies
cd backend
npm install

# Generate Prisma client and run migrations
npx prisma generate
npx prisma migrate deploy

# Install frontend dependencies
cd ../frontend
npm install
```

### 🚀 Execution

You can run the application using the provided script:

```bash
# Make sure the script has execution permissions
chmod +x run.sh

# Run the application
./run.sh
```

Or start the services manually:

```bash
# Terminal 1 - Backend
cd backend
npm run start:dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## 📝 Project Structure

```
📦 ensolvers-challenge
├── 📂 backend
├── 📂 backend/
│   ├── 📂 prisma/
│   │   ├── 📄 schema.prisma      # Database schema
│   │   ├── 📄 prisma.service.ts  # Prisma service
│   │   └── 📂 migrations/        # Database migrations
│   ├── 📂 src/
│   │   ├── 📄 main.ts            # Entry point
│   │   ├── 📄 app.module.ts      # Main module
│   │   └── 📂 tasks/
│   │       ├── 📄 tasks.controller.ts  # REST controller
│   │       ├── 📄 tasks.service.ts     # Business logic
│   │       ├── 📂 dto/                 # Data Transfer Objects
│   │       └── 📂 entities/            # TypeScript entities
│   ├── 📄 package.json
│   └── 📄 tsconfig.json
├── 📂 frontend/
│   ├── 📂 src/
│   │   ├── 📄 App.jsx            # Root component
│   │   ├── 📂 components/
│   │   │   ├── 📄 TaskList.jsx       # Active tasks list
│   │   │   ├── 📄 ArchivedTaskList.jsx  # Archived tasks list
│   │   │   ├── 📄 TaskItem.jsx       # Individual task component
│   │   │   └── 📄 TaskForm.jsx       # Task creation form
│   │   └── 📂 services/
│   │       └── 📄 api.js             # API client
│   ├── 📄 package.json
│   └── 📄 vite.config.js
├── 📄 run.sh                     # Automated startup script
└── 📄 README.md
```

🗄️ Database

The application uses **SQLite** with **Prisma ORM** for data persistence:

- **Schema**: Defined in `prisma/schema.prisma`
- **Migrations**: Managed automatically by Prisma
- **Client**: Generated automatically with TypeScript typing

### Data Model

```prisma
model Note {
  id          String   @id @default(cuid())
  title       String
  description String
  status      Status   @default(pending)
  archived    Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum Status {
  pending
  in_progress
  completed
}
```

## 🔧 API Endpoints

| Method   | Endpoint                        | Description        |
| -------- | ------------------------------- | ------------------ |
| `GET`    | `/api/tasks`                    | Get all tasks      |
| `GET`    | `/api/tasks?archived=true`      | Get archived tasks |
| `GET`    | `/api/tasks/:id`                | Get task by ID     |
| `POST`   | `/api/tasks`                    | Create new task    |
| `PUT`    | `/api/tasks/:id`                | Update task        |
| `PUT`    | `/api/tasks/:id/toggle-archive` | Archive/Unarchive  |
| `DELETE` | `/api/tasks/:id`                | Delete task        |

## 🌐 Access to the Application

Once the services are started:

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

## 🧪 Development

### Useful Commands

```bash
# Backend
cd backend
npm run start:dev          # Development mode with hot reload
npm run build              # Compile for production
npm run start:prod         # Run in production

# Prisma
npx prisma studio          # Visual DB interface
npx prisma generate        # Regenerate client
npx prisma migrate dev     # Create new migration

# Frontend
cd frontend
npm run dev                # Development server
npm run build              # Build for production
npm run preview            # Preview production build
```

## 🌐 Access

Once both servers are started, you can access:

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:5000](http://localhost:5000)

<div align="center">

**Developed by Jacqueline; with ❤️ using NestJS, Prisma, and React**

</div>
