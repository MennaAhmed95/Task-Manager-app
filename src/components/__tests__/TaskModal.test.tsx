import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import TaskModal from "../TaskModal";
import type { Task } from "../../data/mockData";

const mockTask: Task = {
  id: 1,
  title: "Test Task",
  description: "Task description",
  assignedTo: "Alice",
  dueDate: "2025-10-30",
  estimatedHours: 5,
  category: "Dev",
  status: "New",
};

describe("TaskModal", () => {
  it("renders correctly for creating a new task", () => {
    const onSave = vi.fn();
    const onClose = vi.fn();

    const { getByText, getByLabelText } = render(
      <TaskModal task={null} onSave={onSave} onClose={onClose} />
    );

    getByText("Add New Task");
    expect(getByLabelText("Title *")).toHaveValue("");
    expect(getByLabelText("Assigned To *")).toHaveValue("");
    expect(getByLabelText("Description")).toHaveValue("");
    expect(getByLabelText("Hours")).toHaveValue(0);
    expect(getByLabelText("Category")).toHaveValue("Dev");
    expect(getByLabelText("Status")).toHaveValue("New");
  });

  it("renders correctly for editing an existing task", () => {
    const onSave = vi.fn();
    const onClose = vi.fn();

    const { getByText, getByLabelText } = render(
      <TaskModal task={mockTask} onSave={onSave} onClose={onClose} />
    );

    getByText("Edit Task");
    expect(getByLabelText("Title *")).toHaveValue("Test Task");
    expect(getByLabelText("Assigned To *")).toHaveValue("Alice");
    expect(getByLabelText("Description")).toHaveValue("Task description");
    expect(getByLabelText("Hours")).toHaveValue(5);
    expect(getByLabelText("Category")).toHaveValue("Dev");
    expect(getByLabelText("Status")).toHaveValue("New");
  });

  it("calls onClose when cancel button is clicked", async () => {
    const onSave = vi.fn();
    const onClose = vi.fn();

    const { getByText } = render(
      <TaskModal task={mockTask} onSave={onSave} onClose={onClose} />
    );

    const cancelBtn = getByText("Cancel");
    await userEvent.click(cancelBtn);

    expect(onClose).toHaveBeenCalledOnce();
  });

  it("calls onSave with correct data when form is submitted", async () => {
    const onSave = vi.fn();
    const onClose = vi.fn();

    const { getByText, getByLabelText } = render(
      <TaskModal task={null} onSave={onSave} onClose={onClose} />
    );

    const titleInput = getByLabelText("Title *");
    const assignedToInput = getByLabelText("Assigned To *");
    const descriptionInput = getByLabelText("Description");
    const hoursInput = getByLabelText("Hours");
    const categorySelect = getByLabelText("Category");
    const statusSelect = getByLabelText("Status");
    const submitBtn = getByText("Create Task");

    await userEvent.type(titleInput, "New Task");
    await userEvent.type(assignedToInput, "Bob");
    await userEvent.type(descriptionInput, "Description here");
    await userEvent.clear(hoursInput);
    await userEvent.type(hoursInput, "4");
    await userEvent.selectOptions(categorySelect, "UI");
    await userEvent.selectOptions(statusSelect, "Active");

    await userEvent.click(submitBtn);

    expect(onSave).toHaveBeenCalledOnce();
    expect(onSave).toHaveBeenCalledWith({
      title: "New Task",
      assignedTo: "Bob",
      description: "Description here",
      dueDate: "",
      estimatedHours: 4,
      category: "UI",
      status: "Active",
    });
  });
});
