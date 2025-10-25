import { useActionState, useOptimistic } from "react";
import type { Task } from "../data/mockData";

interface TaskModalProps {
  task: Task | null;
  onSave: (taskData: Omit<Task, "id">) => void;
  onClose: () => void;
}

interface FormState {
  error?: string;
  success?: boolean;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, onSave, onClose }) => {
  const initialFormData = {
    title: task?.title || "",
    description: task?.description || "",
    assignedTo: task?.assignedTo || "",
    dueDate: task?.dueDate || "",
    estimatedHours: task?.estimatedHours || 0,
    category: task?.category || "Dev",
    status: task?.status || "New",
  };

  // React 19: useActionState for form handling
  const submitAction = async (
    _: FormState,
    formData: FormData
  ): Promise<FormState> => {
    const title = formData.get("title") as string;
    const assignedTo = formData.get("assignedTo") as string;

    if (!title?.trim() || !assignedTo?.trim()) {
      return { error: "Title and Assigned To are required" };
    }

    const taskData = {
      title,
      description: formData.get("description") as string,
      assignedTo,
      dueDate: formData.get("dueDate") as string,
      estimatedHours: parseInt(formData.get("estimatedHours") as string) || 0,
      category: formData.get("category") as "Dev" | "Test" | "UI" | "DB",
      status: formData.get("status") as "New" | "Active" | "Closed",
    };

    onSave(taskData);
    return { success: true };
  };

  const [state, formAction, isPending] = useActionState(submitAction, {});

  // React 19: useOptimistic for optimistic UI updates
  const [optimisticTask] = useOptimistic(
    initialFormData,
    (state, newValue: Partial<typeof initialFormData>) => ({
      ...state,
      ...newValue,
    })
  );

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {task ? "Edit Task" : "Add New Task"}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close modal"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* React 19: Form with action prop */}
          <form action={formAction} className="space-y-4">
            {state.error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                {state.error}
              </div>
            )}

            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                defaultValue={optimisticTask.title}
                required
                disabled={isPending}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                defaultValue={optimisticTask.description}
                rows={3}
                disabled={isPending}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label
                htmlFor="assignedTo"
                className="block text-sm font-medium text-gray-700"
              >
                Assigned To *
              </label>
              <input
                type="text"
                id="assignedTo"
                name="assignedTo"
                defaultValue={optimisticTask.assignedTo}
                required
                disabled={isPending}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="dueDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Due Date
                </label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  defaultValue={optimisticTask.dueDate}
                  disabled={isPending}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label
                  htmlFor="estimatedHours"
                  className="block text-sm font-medium text-gray-700"
                >
                  Hours
                </label>
                <input
                  type="number"
                  id="estimatedHours"
                  name="estimatedHours"
                  defaultValue={optimisticTask.estimatedHours}
                  min="0"
                  disabled={isPending}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  defaultValue={optimisticTask.category}
                  disabled={isPending}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="Dev">Dev</option>
                  <option value="Test">Test</option>
                  <option value="UI">UI</option>
                  <option value="DB">DB</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  defaultValue={optimisticTask.status}
                  disabled={isPending}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="New">New</option>
                  <option value="Active">Active</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={isPending}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isPending ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Saving...
                  </>
                ) : task ? (
                  "Update Task"
                ) : (
                  "Create Task"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
