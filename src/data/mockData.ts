export interface Task {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  estimatedHours: number;
  category: "Dev" | "Test" | "UI" | "DB";
  status: "New" | "Active" | "Closed";
}

export const mockTasks: Task[] = [
  {
    id: 1,
    title: "Implement Login Page",
    description: "Design and build login flow with OIDC",
    assignedTo: "Menna",
    dueDate: "2025-10-28",
    estimatedHours: 8,
    category: "UI",
    status: "Active",
  },
  {
    id: 2,
    title: "Setup Database Schema",
    description: "Create base schema for projects and tasks",
    assignedTo: "Omar",
    dueDate: "2025-10-30",
    estimatedHours: 10,
    category: "DB",
    status: "New",
  },
  {
    id: 3,
    title: "Write Unit Tests",
    description: "Add comprehensive test coverage for components",
    assignedTo: "Sarah",
    dueDate: "2025-11-01",
    estimatedHours: 6,
    category: "Test",
    status: "New",
  },
  {
    id: 4,
    title: "API Integration",
    description: "Connect frontend with backend APIs",
    assignedTo: "Ahmed",
    dueDate: "2025-11-05",
    estimatedHours: 12,
    category: "Dev",
    status: "Active",
  },
  {
    id: 5,
    title: "User Interface Design",
    description: "Create responsive UI components",
    assignedTo: "Fatma",
    dueDate: "2025-10-25",
    estimatedHours: 16,
    category: "UI",
    status: "Closed",
  },
  {
    id: 6,
    title: "Performance Optimization",
    description: "Optimize database queries and frontend rendering",
    assignedTo: "Omar",
    dueDate: "2025-11-10",
    estimatedHours: 14,
    category: "Dev",
    status: "New",
  },
  {
    id: 7,
    title: "Documentation Update",
    description: "Update API documentation and user guides",
    assignedTo: "Sarah",
    dueDate: "2025-11-08",
    estimatedHours: 5,
    category: "Dev",
    status: "Active",
  },
  {
    id: 8,
    title: "Security Audit",
    description: "Conduct security review and vulnerability assessment",
    assignedTo: "Ahmed",
    dueDate: "2025-11-15",
    estimatedHours: 20,
    category: "Test",
    status: "New",
  },
  {
    id: 9,
    title: "Mobile Responsive Fixes",
    description: "Fix layout issues on mobile devices",
    assignedTo: "Menna",
    dueDate: "2025-11-03",
    estimatedHours: 7,
    category: "UI",
    status: "Active",
  },
  {
    id: 10,
    title: "Deployment Pipeline",
    description: "Set up CI/CD pipeline for automated deployments",
    assignedTo: "Omar",
    dueDate: "2025-11-12",
    estimatedHours: 18,
    category: "Dev",
    status: "New",
  },
];
