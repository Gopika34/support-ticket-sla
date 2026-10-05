# 🎫 Support Ticket SLA Management System

A full-stack support ticket management application focused on SLA tracking, ticket assignment, comments, and first-response monitoring.

The project was developed as a product-engineering style application to explore how support teams can manage tickets while monitoring service-level expectations.

## ✨ Features

* 🎫 Support ticket management
* 👥 Ticket assignment
* ⏱️ SLA tracking
* 💬 Ticket comments
* ⚡ First-response tracking
* 📊 Ticket status management
* 🔎 Structured GraphQL API
* 🗄️ PostgreSQL database
* 🔐 Backend data access through Prisma
* ⚛️ React frontend

## 🛠️ Tech Stack

### Frontend

* React
* TypeScript

### Backend

* Bun
* TypeScript
* GraphQL Yoga
* GraphQL

### Database

* PostgreSQL
* Prisma

### Development

* Docker
* Docker Compose
* Git
* GitHub

## 🏗️ Architecture

```text
React Frontend
       │
       │ GraphQL
       ▼
GraphQL Yoga API
       │
       ▼
Prisma ORM
       │
       ▼
PostgreSQL
```

The application separates the frontend, API layer, database access layer, and persistence layer to keep the system modular.

## 🎯 SLA Workflow

The core idea is to track support tickets against defined service-level expectations.

A typical workflow is:

```text
Ticket Created
      │
      ▼
Ticket Assigned
      │
      ▼
First Response
      │
      ▼
Ticket In Progress
      │
      ▼
Ticket Resolved
```

The system focuses on tracking important timestamps and ticket states so that SLA-related information can be monitored.

## 📦 Core Concepts

### Tickets

Tickets represent customer support issues and contain information required for tracking and assignment.

### Assignment

Tickets can be assigned to support team members so that responsibility is clearly defined.

### Comments

Comments provide a communication history associated with a ticket.

### First Response

The system tracks the first response to help measure support responsiveness.

### SLA

SLA-related information is used to determine whether support expectations are being met.

## 🐳 Local Development

The project uses Docker Compose for the PostgreSQL development environment.

### Start the database

```bash
docker compose up -d
```

### Install dependencies

```bash
bun install
```

### Configure environment variables

Create the required environment file and configure the PostgreSQL connection and application settings.

### Run the application

Start the backend and frontend according to the project's development scripts.

## 🎯 Learning Goals

This project helped explore technologies and concepts beyond the MERN stack, including:

* GraphQL API design
* Schema-first development
* PostgreSQL
* Prisma ORM
* TypeScript
* Docker-based development
* SLA-oriented business logic
* Support-ticket workflows

## 👩‍💻 Author

**Gopika S**

GitHub: https://github.com/Gopika34
