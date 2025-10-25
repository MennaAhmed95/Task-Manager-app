# Task Manager App

A modern React application built with the latest technologies for efficient task management with powerful features and analytics.

## 📸 App Preview

### 🗂️ Task Management Interface

![Tasks Page](./public/screenshots/tasks-page.png)
_Complete task management with advanced filtering, search, and bulk operations_

---

### 📊 Analytics Dashboard

![Dashboard](./public/screenshots/dashboard.png)
_Comprehensive dashboard with visual metrics, charts, and task insights_

---

### ✨ Task Creation Modal

![Add New Task Modal](./public/screenshots/add-task-modal.png)
_Intuitive modal for creating and editing tasks with form validation_

## ✨ Key Features

- **Complete Task Lifecycle** - Create, view, update, and delete tasks with full CRUD operations
- **Smart Organization** - Categorize tasks (Development, Testing, UI/UX, Database) with status tracking (New, In Progress, Completed)
- **Team Collaboration** - Assign tasks to team members with time estimates and due dates
- **Advanced Analytics** - Interactive dashboard with charts and performance metrics using Recharts
- **Intelligent Filtering** - Multi-criteria filtering by status, category, and real-time search
- **Modern UI/UX** - Clean modal interfaces, toast notifications, and responsive mobile-first design
- **Robust State Management** - Redux Toolkit for predictable state handling
- **Type Safety** - Full TypeScript implementation for better development experience
- **Comprehensive Testing** - Unit tests with Vitest and Testing Library

## 🛠️ Technology Stack

- **React 19** - Latest React with concurrent features and TypeScript
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Redux Toolkit** - Modern Redux with simplified state management
- **React Router v7** - Declarative routing for single-page applications
- **Recharts** - Composable charting library for data visualization
- **React Hot Toast** - Elegant notifications for user feedback
- **Vitest** - Blazing fast unit test framework
- **TypeScript** - Type-safe JavaScript development

## 📁 Project Architecture

```
src/
├── components/                 # Reusable UI components
│   ├── TaskTable.tsx          # Main task table with sorting and actions
│   ├── TaskModal.tsx          # Create/edit task modal dialog
│   ├── TaskItem.tsx           # Individual task display component
│   ├── Pagination.tsx         # Pagination controls for task lists
│   ├── FilterBar.tsx          # Advanced filtering and search interface
│   └── __tests__/             # Component test suites
│       ├── TaskTable.test.tsx
│       ├── TaskModal.test.tsx
│       ├── TaskItem.test.tsx
│       └── Pagination.test.tsx
├── pages/                     # Page-level components
│   ├── TasksPage.tsx          # Main task management interface
│   ├── DashboardPage.tsx      # Analytics and metrics dashboard
│   └── TaskManager.tsx        # Comprehensive task management
├── data/                      # Data models and mock data
│   └── mockData.ts            # Task interfaces and sample datasets
├── store/                     # State management
│   ├── index.ts               # Redux store configuration
│   └── slices/                # Redux state slices
│       └── taskSlice.ts       # Task state and actions
├── hooks/                     # Custom React hooks
│   ├── useTasks.ts            # Task management logic
│   └── useFilters.ts          # Filtering and search logic
├── types/                     # TypeScript definitions
│   └── task.ts                # Task-related type definitions
├── utils/                     # Utility functions
│   ├── formatters.ts          # Data formatting helpers
│   └── validators.ts          # Form validation utilities
├── test/                      # Test configuration
│   └── setup.ts               # Test environment setup
├── assets/                    # Static assets
│   └── react.svg
├── App.tsx                    # Root application component
├── App.css                    # Global application styles
├── index.css                  # Tailwind CSS imports and base styles
└── main.tsx                   # Application entry point
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v20.19+ or v22.12+ recommended)
- Yarn package manager

**Version Management Tip:** Use [Volta](https://volta.sh/) for seamless Node.js version management:

```bash
volta install node@20
```

### Installation & Setup

1. **Clone and setup the project:**

```bash
git clone <repository-url>
cd task-manager-app
```

2. **Install dependencies:**

```bash
yarn install
```

3. **Launch development server:**

```bash
yarn dev
```

4. **Open your browser to `http://localhost:5173`**

### Development Scripts

- `yarn dev` - Start development server with hot reload
- `yarn build` - Create production-optimized build
- `yarn preview` - Preview production build locally
- `yarn lint` - Run ESLint for code quality
- `yarn test` - Run test suite in watch mode
- `yarn test:run` - Execute tests once
- `yarn test:ui` - Run tests with visual interface

## 🎨 Feature Details

### Task Management System

- **Complete CRUD Operations** - Full create, read, update, delete functionality
- **Categorized Workflows** - Organize by Development, Testing, UI/UX, Database
- **Status Tracking** - Monitor progress through New, Active, Completed stages
- **Team Assignment** - Assign tasks with time estimates and deadlines
- **Time Management** - Track estimated vs. actual hours

### Analytics & Insights

- **Performance Metrics** - Total tasks, hours invested, completion rates
- **Visual Analytics** - Bar charts for category distribution, pie charts for status breakdown
- **Recent Activity** - Quick overview of latest task updates
- **Team Productivity** - Insights into assignment patterns and workload

### Advanced Filtering

- **Multi-dimensional Filtering** - Combine status, category, and search filters
- **Real-time Search** - Instant search across titles, descriptions, and assignees
- **Smart Results** - Context-aware filtering with combined criteria

### User Experience

- **Modal Interfaces** - Non-intrusive forms for task management
- **Instant Feedback** - Toast notifications for user actions
- **Mobile Optimized** - Responsive design that works on all devices
- **Accessibility First** - ARIA labels and keyboard navigation support

## 🔧 State Management

```typescript
interface Task {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  estimatedHours: number;
  category: "Dev" | "Test" | "UI" | "DB";
  status: "New" | "Active" | "Closed";
}

interface TaskState {
  tasks: Task[];
  filter: "all" | "New" | "Active" | "Closed";
  searchQuery: string;
  selectedCategory: "all" | "Dev" | "Test" | "UI" | "DB";
  isLoading: boolean;
}
```

## 🎯 Core Components

### TaskModal

- **Form Management** - Create and edit tasks with validation
- **Smart Defaults** - Pre-filled values and sensible defaults
- **Error Handling** - User-friendly validation messages
- **Accessibility** - Full keyboard navigation and screen reader support

### TaskTable

- **Data Presentation** - Clean, sortable task listing
- **Bulk Actions** - Multi-select and batch operations
- **Responsive Design** - Adapts to different screen sizes
- **Performance** - Virtual scrolling for large datasets

### Dashboard

- **Data Visualization** - Interactive charts and graphs
- **Key Metrics** - At-a-glance performance indicators
- **Trend Analysis** - Historical data and progress tracking
- **Export Capabilities** - Data export functionality

## 📄 License

Open source under the [MIT License](LICENSE).

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines and feel free to submit pull requests.
