# TaskMaster - React Task Management Application

A responsive, front-end task management dashboard built with React. This assessment project demonstrates core React fundamentals, state management, complex filtering/sorting logic, and UI-based authentication without relying on a backend server. All data is persisted entirely in the browser.

## 🚀 Quick Start / Demo Credentials

To save you time during the review process, you do not need to manually register an account. You can log in immediately using the following pre-configured demo credentials to view the dashboard and sample tasks:

* **Email:** `user@gmail.com`
* **Password:** `password123` 

*(Alternatively, you are fully welcome to test the registration flow by creating a new account on the Sign Up page with any username and password).*

## ✨ Key Features

* **Authentication (UI Only):** Simulated user login and registration utilizing the browser's Web Crypto API for secure password hashing.
* **Dashboard Analytics:** A quick-glance visual summary of total, pending, completed, and high-priority tasks.
* **Full Task Management (CRUD):** Create, view, edit, and delete tasks. Includes strict form validation for all mandatory fields.
* **Advanced Search & Filter:** Filter tasks by Status, Priority, or Due Date, and search dynamically by task title.
* **Persistent Local Storage:** All tasks, user data, and simulated auth sessions are securely saved using the `window.localStorage` API, ensuring data remains after page refreshes.
* **Responsive UI:** Fluid layouts optimized for Desktop, Tablet, and Mobile viewing experiences.

## 🛠️ Technologies Used

* **Frontend Framework:** React.js
* **Routing:** React Router v6
* **Styling:** Custom CSS (Flexbox / CSS Grid)
* **Storage:** Web Storage API (Local Storage)
* **Build Tool:** Vite

## 💻 Installation & Setup Instructions

Follow these steps to get the project running locally on your machine:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your system.

### 2. Extract the Project
If you downloaded this project as a `.zip` file, extract the folder to your desired directory and open it inside your terminal or code editor (like VS Code).

### 3. Install Dependencies
In your terminal, ensure you are in the root directory of the project, then run:
```bash
npm install

```

### 4. Start the Development Server

Once the installation is complete, start the local server by running:

```bash
npm run dev

```

*(Note: If the project was initialized with Create React App rather than Vite, use `npm start` instead).*

### 5. View the Application

The terminal will output a local server URL (typically `http://localhost:5173` or `http://localhost:3000`). Ctrl+Click the link or paste it into your browser to view the application.

---

*Developed by Dinesh E*

```

```