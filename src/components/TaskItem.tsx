import type { Task } from "../data/mockData";

interface TaskItemProps {
  task: Task;
  onUpdate: (id: number, updates: Partial<Task>) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdate, onDelete }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Dev":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Test":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "UI":
        return "bg-pink-100 text-pink-800 border-pink-200";
      case "DB":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Active":
        return "bg-green-100 text-green-800 border-green-200";
      case "Closed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusBorderColor = (status: string) => {
    switch (status) {
      case "New":
        return "border-yellow-500";
      case "Active":
        return "border-blue-500";
      case "Closed":
        return "border-gray-300";
      default:
        return "border-gray-300";
    }
  };

  const isOverdue =
    new Date(task.dueDate) < new Date() && task.status !== "Closed";

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${getStatusBorderColor(
        task.status
      )} ${task.status === "Closed" ? "opacity-75" : ""}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <h3
              className={`text-lg font-medium ${
                task.status === "Closed"
                  ? "line-through text-gray-500"
                  : "text-gray-900"
              }`}
            >
              {task.title}
            </h3>
            <button
              onClick={() => onDelete(task.id)}
              className="ml-4 text-red-600 hover:text-red-800 transition-colors"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>

          {task.description && (
            <p
              className={`mt-1 text-sm ${
                task.status === "Closed" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {task.description}
            </p>
          )}

          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-500">Assigned to:</span>
              <span className="ml-1 font-medium text-gray-700">
                {task.assignedTo}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Estimated:</span>
              <span className="ml-1 font-medium text-gray-700">
                {task.estimatedHours}h
              </span>
            </div>
            <div>
              <span className="text-gray-500">Due:</span>
              <span
                className={`ml-1 font-medium ${
                  isOverdue ? "text-red-600" : "text-gray-700"
                }`}
              >
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
              {isOverdue && (
                <span className="ml-1 text-xs text-red-600 font-semibold">
                  OVERDUE
                </span>
              )}
            </div>
          </div>

          <div className="mt-3 flex items-center space-x-2">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCategoryColor(
                task.category
              )}`}
            >
              {task.category}
            </span>
            <select
              value={task.status}
              onChange={(e) =>
                onUpdate(task.id, {
                  status: e.target.value as "New" | "Active" | "Closed",
                })
              }
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                task.status
              )} cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="New">New</option>
              <option value="Active">Active</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
