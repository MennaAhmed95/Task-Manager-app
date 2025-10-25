import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import TaskTable from "../TaskTable";
import type { Task } from "../../data/mockData";

const mockTasks: Task[] = [
  {
    id: 1,
    title: "Task 1",
    description: "Description 1",
    assignedTo: "Alice",
    dueDate: "2025-10-30",
    estimatedHours: 5,
    category: "Dev",
    status: "New",
  },
  {
    id: 2,
    title: "Task 2",
    description: "Description 2",
    assignedTo: "Bob",
    dueDate: "2025-11-01",
    estimatedHours: 3,
    category: "Test",
    status: "Active",
  },
];

describe("TaskTable", () => {
  it('renders "No tasks found" when tasks array is empty', () => {
    const { getByText } = render(
      <TaskTable tasks={[]} onEdit={() => {}} onDelete={() => {}} />
    );

    getByText(/No tasks found/i);
    getByText(/Try adjusting your filters/i);
  });

  it("renders tasks correctly", () => {
    const { getByText } = render(
      <TaskTable tasks={mockTasks} onEdit={() => {}} onDelete={() => {}} />
    );

    getByText("Task 1");
    getByText("Task 2");
    getByText("Alice");
    getByText("Bob");
    getByText("5h");
    getByText("3h");
    getByText("Dev");
    getByText("Test");
    getByText("New");
    getByText("Active");
  });

  it("calls onEdit when edit button is clicked", async () => {
    const onEdit = vi.fn();
    const { getAllByLabelText } = render(
      <TaskTable tasks={mockTasks} onEdit={onEdit} onDelete={() => {}} />
    );

    const editButtons = getAllByLabelText("Edit task");
    await userEvent.click(editButtons[0]);

    expect(onEdit).toHaveBeenCalledOnce();
    expect(onEdit).toHaveBeenCalledWith(mockTasks[0]);
  });

  it("calls onDelete when delete button is clicked", async () => {
    const onDelete = vi.fn();
    const { getAllByLabelText } = render(
      <TaskTable tasks={mockTasks} onEdit={() => {}} onDelete={onDelete} />
    );

    const deleteButtons = getAllByLabelText("Delete task");
    await userEvent.click(deleteButtons[1]);

    expect(onDelete).toHaveBeenCalledOnce();
    expect(onDelete).toHaveBeenCalledWith(mockTasks[1].id);
  });
});
