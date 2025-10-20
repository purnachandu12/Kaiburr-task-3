# Task 3 – Web UI Frontend for Task Management Application

This repository contains the **React frontend** for the Task Management Application built in **Task 1** (Java backend with REST API). The frontend allows users to **create, search, delete tasks, run commands, and view execution outputs** via a user-friendly interface using **Ant Design** components.


---

## Technologies Used

* **React 19**
* **TypeScript**
* **Ant Design** (UI components)
* **Axios** (HTTP requests to backend)
* **React Router v6** (Page routing)

---

## Features

* **Home Dashboard**: Displays a list of all tasks from the backend.
* **Add Task Form**: Allows users to create a new task with `id`, `name`, `owner`, and `command`.
* **Search Tasks**: Search tasks by name or ID.
* **Delete Task**: Remove tasks from the database.
* **Execute Task Command**: Run shell commands for a task and view the output.
* **Task Execution History**: View all previous executions for a task.

---

## Screenshots

### Home Dashboard

![Home Dashboard](screenshots/home.png)
*Displays all tasks with options to search, delete, and execute commands.*

### Add Task Form

![Add Task Form](screenshots/add-task.png)
*Form to create a new task by providing task ID, name, owner, and command.*

### Execute Task

![Execute Task](screenshots/execution.png)
*Execute a task’s shell command and view output immediately.*

### Search Tasks

![Search Tasks](screenshots/search.png)
*Search for tasks by name or ID and see matching results.*

> **Note:** Save your screenshots in a `screenshots/` folder and update the paths if needed.

---

## Getting Started

### Prerequisites

* Node.js (v20+)
* npm or yarn
* Backend API from Task 1 running locally (default port: 8080)

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd task-frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Configure backend API URL (if different from default):
   Create a `.env` file at project root:

```
REACT_APP_API_URL=http://localhost:8080
```

4. Start the frontend server:

```bash
npm start
# or
yarn start
```

The application will run at `http://localhost:3000`.

---

## Folder Structure

```
task-frontend/
├─ public/
├─ src/
│  ├─ components/      # Reusable UI components
│  ├─ pages/           # Home, AddTask, SearchTask, TaskExecution pages
│  ├─ services/        # Axios API calls
│  ├─ App.tsx
│  ├─ index.tsx
│  └─ types.ts         # TypeScript interfaces
├─ screenshots/         # Store your screenshots here
├─ package.json
├─ tsconfig.json
└─ README.md
```

---

## Usage

* **View Tasks**: Navigate to the Home page to see all tasks.
* **Add a Task**: Click on `Add Task`, fill in the details, and submit.
* **Search Task**: Use the search bar to find tasks by name or ID.
* **Delete Task**: Click the delete icon on a task row to remove it.
* **Run Command**: Click the execute button for a task to run its shell command.
* **View Execution Output**: The output is displayed immediately after execution and stored in the task’s execution history.

---

## License

© 2025 Kaiburr LLC. All rights reserved.

---

If you want, I can **also generate a GitHub-ready folder structure with placeholder screenshots** so you can just drop your real images and push it—it’ll be fully ready for your repo.

Do you want me to do that?
