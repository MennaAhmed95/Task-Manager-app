import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import {
  addTask,
  updateTask,
  deleteTask,
  setFilter,
  setSearchQuery,
  setSelectedCategory,
} from "../store/slices/taskSlice";
import { type Task } from "../data/mockData";
import TaskModal from "../components/TaskModal";
import TaskTable from "../components/TaskTable";
import Pagination from "../components/Pagination";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 4;

const TasksPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tasks, filter, searchQuery, selectedCategory } = useAppSelector(
    (state) => state.tasks
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = filter === "all" || task.status === filter;
    const matchesCategory =
      selectedCategory === "all" || task.category === selectedCategory;
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesCategory && matchesSearch;
  });

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchQuery, selectedCategory]);

  // Paginate filtered tasks
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (id: number) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(id));
      toast.success("Task deleted successfully");
    }
  };

  const handleSaveTask = (taskData: Omit<Task, "id">) => {
    if (editingTask) {
      dispatch(updateTask({ id: editingTask.id, updates: taskData }));
      toast.success("Task updated successfully");
    } else {
      dispatch(addTask(taskData));
      toast.success("Task created successfully");
    }
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
          <button
            onClick={handleAddTask}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add New Task
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              placeholder="Search tasks..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={filter}
              onChange={(e) => dispatch(setFilter(e.target.value as any))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="New">New</option>
              <option value="Active">Active</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) =>
                dispatch(setSelectedCategory(e.target.value as any))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="Dev">Dev</option>
              <option value="Test">Test</option>
              <option value="UI">UI</option>
              <option value="DB">DB</option>
            </select>
          </div>
        </div>
      </div>

      <TaskTable
        tasks={paginatedTasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />

      <Pagination
        currentPage={currentPage}
        totalItems={filteredTasks.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={handlePageChange}
      />

      {isModalOpen && (
        <TaskModal
          task={editingTask}
          onSave={handleSaveTask}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
};

export default TasksPage;
