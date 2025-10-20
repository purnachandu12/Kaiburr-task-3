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

![Home Dashboard](https://github.com/purnachandu12/Kaiburr-task-3/blob/main/Home.png)
*Displays all tasks with options to search, delete, and execute commands.*

### Add Task Form

![Add Task Form](https://github.com/purnachandu12/Kaiburr-task-3/blob/main/add%20task.png)
*Form to create a new task by providing task ID, name, owner, and command.*

### Execute Task

![Execute Task](https://github.com/purnachandu12/Kaiburr-task-3/blob/main/Execution.png)
*Execute a task’s shell command and view output immediately.*

### Search Tasks

![Search Tasks](https://github.com/purnachandu12/Kaiburr-task-3/blob/main/Search.png)
*Search for tasks by name or ID and see matching results.*

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
