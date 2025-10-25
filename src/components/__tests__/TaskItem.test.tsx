import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import TaskItem from "../TaskItem";
import type { Task } from "../../data/mockData";

// Mock task data for testing
const mockTask: Task = {
  id: 1,
  title: "Test Task",
  description: "Test description",
  status: "New",
  category: "Dev",
  assignedTo: "John Doe",
  estimatedHours: 5,
  dueDate: "2024-12-31",
};

const mockOverdueTask: Task = {
  ...mockTask,
  id: 2,
  dueDate: "2020-01-01", // Past date
  status: "Active",
};

const mockClosedTask: Task = {
  ...mockTask,
  id: 3,
  status: "Closed",
};

describe("TaskItem", () => {
  const mockOnUpdate = vi.fn();
  const mockOnDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all task information correctly", () => {
    render(
      <TaskItem
        task={mockTask}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    // Title and description
    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();

    // Assigned to and estimated hours
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
    expect(screen.getByText(/5h/)).toBeInTheDocument();

    // Category and status
    expect(screen.getByText("Dev")).toBeInTheDocument();
    expect(screen.getByDisplayValue("New")).toBeInTheDocument();

    // Due date (formatted)
    expect(screen.getByText(/12\/31\/2024/)).toBeInTheDocument();
  });

  it("does not render description when empty", () => {
    const taskWithoutDescription: Task = {
      ...mockTask,
      description: "",
    };

    render(
      <TaskItem
        task={taskWithoutDescription}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.queryByText("Test description")).not.toBeInTheDocument();
  });

  it("applies strikethrough and opacity for closed tasks", () => {
    render(
      <TaskItem
        task={mockClosedTask}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    const title = screen.getByText("Test Task");
    expect(title).toHaveClass("line-through", "text-gray-500");

    const container = title.closest(".bg-white");
    expect(container).toHaveClass("opacity-75");
  });

  it("shows overdue warning for active tasks with past due date", () => {
    render(
      <TaskItem
        task={mockOverdueTask}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("OVERDUE")).toBeInTheDocument();
    expect(screen.getByText("OVERDUE")).toHaveClass("text-red-600");

    const dueDate = screen.getByText(/1\/1\/2020/);
    expect(dueDate).toHaveClass("text-red-600");
  });

  it("does not show overdue warning for closed tasks with past due date", () => {
    const overdueClosedTask: Task = {
      ...mockOverdueTask,
      status: "Closed",
    };

    render(
      <TaskItem
        task={overdueClosedTask}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.queryByText("OVERDUE")).not.toBeInTheDocument();
  });

  it("calls onDelete with correct task id when delete button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <TaskItem
        task={mockTask}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    const deleteButton = screen.getByRole("button");
    await user.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledOnce();
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  it("calls onUpdate with correct parameters when status is changed", async () => {
    const user = userEvent.setup();
    render(
      <TaskItem
        task={mockTask}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    const statusSelect = screen.getByDisplayValue("New");
    await user.selectOptions(statusSelect, "Active");

    expect(mockOnUpdate).toHaveBeenCalledOnce();
    expect(mockOnUpdate).toHaveBeenCalledWith(1, { status: "Active" });
  });

  describe("Category styling", () => {
    const categoryTestCases: {
      category: Task["category"];
      expectedClass: string;
    }[] = [
      { category: "Dev", expectedClass: "bg-blue-100" },
      { category: "Test", expectedClass: "bg-purple-100" },
      { category: "UI", expectedClass: "bg-pink-100" },
      { category: "DB", expectedClass: "bg-green-100" },
    ];

    categoryTestCases.forEach(({ category, expectedClass }) => {
      it(`applies ${expectedClass} for ${category} category`, () => {
        const taskWithCategory: Task = { ...mockTask, category };

        render(
          <TaskItem
            task={taskWithCategory}
            onUpdate={mockOnUpdate}
            onDelete={mockOnDelete}
          />
        );

        const categoryBadge = screen.getByText(category);
        expect(categoryBadge).toHaveClass(expectedClass);
      });
    });
  });

  describe("Status styling", () => {
    const statusTestCases: { status: Task["status"]; expectedClass: string }[] =
      [
        { status: "New", expectedClass: "bg-yellow-100" },
        { status: "Active", expectedClass: "bg-green-100" },
        { status: "Closed", expectedClass: "bg-gray-100" },
      ];

    statusTestCases.forEach(({ status, expectedClass }) => {
      it(`applies ${expectedClass} for ${status} status`, () => {
        const taskWithStatus: Task = { ...mockTask, status };

        render(
          <TaskItem
            task={taskWithStatus}
            onUpdate={mockOnUpdate}
            onDelete={mockOnDelete}
          />
        );

        const statusSelect = screen.getByDisplayValue(status);
        expect(statusSelect).toHaveClass(expectedClass);
      });
    });
  });

  describe("Status border styling", () => {
    const borderTestCases: { status: Task["status"]; expectedClass: string }[] =
      [
        { status: "New", expectedClass: "border-yellow-500" },
        { status: "Active", expectedClass: "border-blue-500" },
        { status: "Closed", expectedClass: "border-gray-300" },
      ];

    borderTestCases.forEach(({ status, expectedClass }) => {
      it(`applies ${expectedClass} for ${status} status border`, () => {
        const taskWithStatus: Task = { ...mockTask, status };
        const { container } = render(
          <TaskItem
            task={taskWithStatus}
            onUpdate={mockOnUpdate}
            onDelete={mockOnDelete}
          />
        );

        const taskContainer = container.querySelector(".bg-white");
        expect(taskContainer).toHaveClass(expectedClass);
      });
    });
  });

  it("renders all three status options in the select dropdown", () => {
    render(
      <TaskItem
        task={mockTask}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    const statusSelect = screen.getByDisplayValue("New");
    expect(statusSelect).toBeInTheDocument();

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(3);

    const optionValues = options.map(
      (option) => (option as HTMLOptionElement).value
    );
    expect(optionValues).toEqual(["New", "Active", "Closed"]);
  });

  it("formats due date using locale date format", () => {
    const taskWithSpecificDate: Task = {
      ...mockTask,
      dueDate: "2024-12-25",
    };

    render(
      <TaskItem
        task={taskWithSpecificDate}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    // This will match the formatted date based on the user's locale
    const dueDateText = screen.getByText(/Due:/).parentElement?.textContent;
    expect(dueDateText).toContain("12/25/2024");
  });

  it("handles all valid category types without errors", () => {
    const categories: Task["category"][] = ["Dev", "Test", "UI", "DB"];

    categories.forEach((category) => {
      const taskWithCategory: Task = { ...mockTask, category };

      expect(() =>
        render(
          <TaskItem
            task={taskWithCategory}
            onUpdate={mockOnUpdate}
            onDelete={mockOnDelete}
          />
        )
      ).not.toThrow();
    });
  });

  it("handles all valid status types without errors", () => {
    const statuses: Task["status"][] = ["New", "Active", "Closed"];

    statuses.forEach((status) => {
      const taskWithStatus: Task = { ...mockTask, status };

      expect(() =>
        render(
          <TaskItem
            task={taskWithStatus}
            onUpdate={mockOnUpdate}
            onDelete={mockOnDelete}
          />
        )
      ).not.toThrow();
    });
  });
});
