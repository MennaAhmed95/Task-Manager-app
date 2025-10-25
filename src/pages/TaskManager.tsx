import { useAppDispatch, useAppSelector } from "../store";
import {
  deleteTask,
  updateTask,
  setFilter,
  setSearchQuery,
  setSelectedCategory,
} from "../store/slices/taskSlice";
import TaskItem from "../components/TaskItem";

const TaskManager: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tasks, filter, searchQuery, selectedCategory } = useAppSelector(
    (state) => state.tasks
  );

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = filter === "all" || task.status === filter;

    const matchesCategory =
      selectedCategory === "all" || task.category === selectedCategory;

    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch && matchesCategory;
  });

  const newCount = tasks.filter((task) => task.status === "New").length;
  const activeCount = tasks.filter((task) => task.status === "Active").length;
  const closedCount = tasks.filter((task) => task.status === "Closed").length;

  const clearClosed = () => {
    const closedTaskIds = tasks
      .filter((task) => task.status === "Closed")
      .map((task) => task.id);
    closedTaskIds.forEach((id) => dispatch(deleteTask(id)));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Task Manager
          </h1>
          <p className="text-gray-600">Organize your tasks efficiently</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Task List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Filters and Search */}
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Search tasks..."
                      value={searchQuery}
                      onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Status Filters */}
                <div className="flex gap-2 mb-4">
                  {(["all", "New", "Active", "Closed"] as const).map(
                    (filterType) => (
                      <button
                        key={filterType}
                        onClick={() => dispatch(setFilter(filterType))}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          filter === filterType
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {filterType.charAt(0).toUpperCase() +
                          filterType.slice(1)}
                      </button>
                    )
                  )}
                </div>

                {/* Category Filters */}
                <div className="flex gap-2 mb-4">
                  {(["all", "Dev", "Test", "UI", "DB"] as const).map(
                    (category) => (
                      <button
                        key={category}
                        onClick={() => dispatch(setSelectedCategory(category))}
                        className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                          selectedCategory === category
                            ? "bg-green-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {category}
                      </button>
                    )
                  )}
                </div>

                {/* Stats */}
                <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                  <span>Total: {tasks.length}</span>
                  <span>New: {newCount}</span>
                  <span>Active: {activeCount}</span>
                  <span>Closed: {closedCount}</span>
                  {closedCount > 0 && (
                    <button
                      onClick={clearClosed}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Clear Closed
                    </button>
                  )}
                </div>
              </div>

              {/* Task List */}
              <div className="space-y-4">
                {filteredTasks.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    {searchQuery
                      ? "No tasks match your search."
                      : "No tasks yet. Add one above!"}
                  </div>
                ) : (
                  filteredTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onDelete={(id) => dispatch(deleteTask(id))}
                      onUpdate={(id, updates) =>
                        dispatch(updateTask({ id, updates }))
                      }
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
