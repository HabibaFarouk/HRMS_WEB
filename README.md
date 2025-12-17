# HR Management System (HRMS)

A full-stack Human Resource Management System built with **Node.js**, **Express**, **MySQL**, and **Sequelize**. This application provides a comprehensive interface for managing an organization's structure, workforce data, and employee performance lifecycles.

## 📋 Table of Contents
1. [Project Overview](#-project-overview)
2. [Application Modules & Pages](#-application-modules--pages)
3. [Tech Stack](#-tech-stack)
4. [Prerequisites](#-prerequisites)
5. [Installation & Setup](#-installation--setup)
6. [Database Configuration](#-database-configuration)
7. [Running the Application](#-running-the-application)
8. [Project Structure](#-project-structure)
9. [Dependencies](#-dependencies)

---

## 🚀 Project Overview
This HRMS is designed to streamline human resource operations by dividing functionality into three core pillars: **Organization Structure**, **Workforce Management**, and **Performance Tracking**. It features a dynamic frontend served via EJS templates and a robust MySQL backend managed by Sequelize ORM.

---

## 📖 Application Modules & Pages

### A. Dashboard (`/`)
* **Purpose:** The central landing page providing a high-level overview.
* **Features:** Displays summary cards (e.g., Total Employees, Active Jobs, Pending Appraisals) and a sidebar for navigation.

### B. Organization Module
Manages the structural hierarchy of the institution.
* **Universities (`/universities`):** List, add, edit, and delete university records (Name, Acronym, Address).
* **Faculties (`/faculties`):** Manage faculty records and their physical locations.
* **Departments (`/departments`):** Categorize departments by Type (Academic vs. Administrative) and Location.

### C. Workforce Module
Manages people, roles, and contracts.
* **Employees (`/employees`):** A directory of all staff. Tracks personal info, emergency contacts, and employment status (Active/Probation/Leave).
* **Jobs (`/jobs`):** Catalog of job titles including salary ranges (Min/Max) and seniority levels.
* **Contracts (`/contracts`):** Define employment templates (e.g., Permanent vs. Temporary, Remote vs. On-site).
* **Job Assignments (`/assignments`):** The link between an Employee and a Job. Tracks the active status of an employee's current role.

### D. Performance Module
Handles evaluations and feedback loops.
* **Performance Cycles (`/cycles`):** Define review periods (e.g., "Q1 2025") with start and end dates.
* **KPIs (`/kpi`):** Manage Key Performance Indicators with specific measurement units and target values.
* **Appraisals (`/appraisals`):** The core evaluation page.
    * Displays `Overall_Score`.
    * Links Appraisals to specific Performance Cycles.
    * **Appeals System:** Includes an integrated workflow for employees to appeal scores. Managers can View, Edit (Approve/Reject), and Delete appeals directly from this page.

---

## 🛠 Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MySQL
* **ORM:** Sequelize (for schema syncing and querying)
* **Templating:** EJS (Embedded JavaScript)
* **Styling:** Custom CSS with responsive Sidebar layout

---

## 📝 Prerequisites

Ensure you have the following installed before running the project:
1.  **Node.js** (v14.x or higher)
2.  **MySQL Server** (via MySQL Workbench, XAMPP, or standalone)

---

## ⚙️ Installation & Setup

1.  **Clone the Repository**
    Extract the project files to your local machine.

2.  **Install Dependencies**
    Open your terminal in the project root folder and run:
    ```bash
    npm install
    ```

---

## 🗄 Database Configuration

1.  **Create Database**
    Open MySQL Workbench and create an empty database named `HRMS_DB`.

2.  **Configure Credentials**
    Open `config/db.js` and update the settings:
    ```javascript
    const sequelize = new Sequelize('HRMS_DB', 'YOUR_USERNAME', 'YOUR_PASSWORD', {
        host: 'localhost',
        dialect: 'mysql'
    });
    ```
    * Replace `'YOUR_USERNAME'` (default is usually `root`).
    * Replace `'YOUR_PASSWORD'` with your local MySQL password.

3.  **Auto-Schema Sync**
    You do **not** need to create tables manually. On the first run, `sequelize.sync()` will automatically generate all tables and relationships.

---

## ▶️ Running the Application

1.  **Start the Server**
    * **Development Mode** (Auto-restarts on file save):
        ```bash
        npm run dev
        ```
    * **Standard Mode:**
        ```bash
        node index.js
        ```

2.  **Access in Browser**
    Go to: `http://localhost:3000`

---

## 📂 Project Structure

```text
HRMS_WEB/
├── config/             # DB Connection (db.js)
├── controllers/        # Route Logic (mainController.js)
├── models/             # Database Models (Employee.js, Job.js, etc.)
├── public/             # Static Assets (CSS, Images)
├── routes/             # URL Routing (index.js)
├── views/              # Frontend Templates
│   ├── partials/       # Reusable components (sidebar.ejs)
│   ├── layouts/        # (Optional) Layout files
│   └── *.ejs           # Individual pages (dashboard, employees, etc.)
├── index.js            # Main Application Entry Point
└── package.json        # Dependencies & Scripts
