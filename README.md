# HR Management System (HRMS)

A full-stack Human Resource Management System built with **Node.js**, **Express**, **MySQL**, and **Sequelize**. This application provides a comprehensive interface for managing an organization's structure, workforce data, and employee performance lifecycles.

## 📋 Table of Contents
1. [Project Overview](#-project-overview)
2. [Application Modules & Pages](#-application-modules--pages)
3. [Tech Stack](#-tech-stack)
4. [Prerequisites](#-prerequisites)
5. [Installation & Setup](#-installation--setup)
6. [Database Configuration](#-database-configuration)
## HR Management System (HRMS)

A full-stack Human Resource Management System built with Node.js, Express, MySQL and Sequelize. This repo contains the server-side app, EJS views and Sequelize models for a simple HR portal.

## Table of Contents
- Project overview
- Installation
- Configuration
- Run
- Project structure
- Dependencies

---

## Project overview

This application provides pages to manage organizations (universities, faculties, departments), workforce (employees, jobs, assignments) and performance (cycles, KPIs, appraisals). The UI is server-rendered with EJS templates and routes are defined in `routes/index.js` with controller logic in `controllers/mainController.js`.

---

## Installation

Requirements:
- Node.js (v14+ recommended)
- MySQL server

Install project dependencies:

```bash
npm install
```

---

## Configuration

1. Edit database connection: `config/db.js` — update database name, username and password. Example:

```js
// config/db.js
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('HRMS_DB', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});
module.exports = sequelize;
```

2. Port: the app runs on port `3000` by default (see `index.js`).

3. Environment variables: this project uses `dotenv` if you want to load credentials from a `.env` file — create one and load values in `config/db.js` if needed.

---

## Run

Development (auto-restart):

```bash
npm run dev
```

Production / normal: 

```bash
node index.js
```

Open http://localhost:3000 in your browser.

---

## Project structure (key files)

```
HRMS_WEB/
├─ index.js                      # App entry (Express + Sequelize sync + routes)
├─ package.json                  # npm scripts + dependencies
├─ config/
│  └─ db.js                      # Sequelize connection
├─ controllers/
│  └─ mainController.js          # Route handlers for pages and form posts
├─ models/
│  ├─ Employee.js
│  ├─ University.js
│  ├─ Faculty.js
│  ├─ Department.js
│  ├─ Job.js
│  ├─ JobAssignment.js
│  ├─ Contract.js
│  ├─ PerformanceCycle.js
│  ├─ ObjectiveKPI.js
│  ├─ Appraisal.js
│  └─ Appeal.js
├─ routes/
│  └─ index.js                   # All route definitions
├─ views/
│  ├─ partials/                  # sidebar.ejs etc.
│  └─ *.ejs                      # pages: dashboard, employees, addEmployee, universities, faculties, departments, jobs, assignments, cycles, kpi, appraisals, etc.
├─ public/                       # static CSS / images (if present)
```

---

## Dependencies

Main runtime dependencies are listed in `package.json`. At time of writing the project uses:

- `express` (web framework)
- `ejs` (templating)
- `sequelize` (ORM)
- `mysql2` (MySQL driver)
- `body-parser` (request parsing)
- `dotenv` (env variables)

Dev dependency:

- `nodemon` (dev server auto-restart)

Exact versions are in `package.json` — to install the same versions run `npm install` in the project root.

---

## Notes & Tips

- The app calls `sequelize.sync()` on startup to create tables based on models if they don't exist — ensure your DB user has permissions to create tables.
- Routes and views follow a simple convention — edit `controllers/mainController.js` if you need to change behavior of forms or data handling.
- I removed the Contracts listing from the main sidebar during recent UI tweaks; routes for contracts were also removed from `routes/index.js`.

If you'd like, I can also add a short `.env.example` and update `config/db.js` to read from environment variables.
