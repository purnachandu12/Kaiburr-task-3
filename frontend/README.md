# Task Management System - Frontend

A modern React 19 application with TypeScript and Ant Design for managing shell command tasks.

## Features

- ✅ **Create, Read, Update, Delete** tasks
- ✅ **Execute shell commands** safely with validation
- ✅ **View execution history** and output
- ✅ **Search tasks** by name
- ✅ **Responsive design** for all devices
- ✅ **Accessibility features** (WCAG compliant)
- ✅ **Command validation** for security
- ✅ **Real-time updates** after operations

## Technology Stack

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type safety and better development experience
- **Ant Design 5** - Modern UI component library
- **Vite** - Fast build tool and development server
- **Axios** - HTTP client for API communication

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Java backend running on port 8080

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## API Integration

The frontend connects to your Java backend with the following endpoints:

- `GET /api/` - Get all tasks
- `GET /api/{id}` - Get task by ID
- `POST /api/add` - Create/Update task
- `DELETE /api/Delete/{id}` - Delete task
- `GET /api/Search/{name}` - Search tasks by name
- `PUT /api/Execute/{id}` - Execute task

## Security Features

- **Command Validation**: Prevents execution of dangerous commands
- **Input Sanitization**: Validates all user inputs
- **XSS Protection**: Safe rendering of user content
- **CSRF Protection**: Secure API communication

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: ARIA labels and descriptions
- **High Contrast Mode**: Support for high contrast displays
- **Reduced Motion**: Respects user motion preferences
- **Focus Management**: Clear focus indicators

## Usage

### Creating a Task

1. Click the "New Task" button
2. Fill in the task details:
   - **ID**: Unique identifier
   - **Name**: Descriptive name
   - **Owner**: Task owner name
   - **Command**: Shell command to execute
3. Click "Create Task"

### Executing a Task

1. Find the task in the list
2. Click the "Execute" button (play icon)
3. View the execution results in the "View Executions" modal

### Searching Tasks

1. Use the search bar to find tasks by name
2. Click "Clear" to reset the search

### Managing Tasks

- **Edit**: Click the edit icon to modify a task
- **Delete**: Click the delete icon and confirm
- **View Executions**: Click the eye icon to see execution history

## Development

### Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Application header
│   ├── TaskForm.tsx    # Task creation/editing form
│   ├── TaskList.tsx    # Task list with actions
│   ├── TaskExecutionModal.tsx  # Execution history modal
│   └── SearchBar.tsx   # Search functionality
├── services/           # API services
│   └── api.ts          # API client
├── types/              # TypeScript definitions
│   └── Task.ts         # Task and TaskExecution interfaces
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

