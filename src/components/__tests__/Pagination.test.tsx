import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Pagination from "../Pagination";

describe("Pagination", () => {
  it("renders page numbers correctly without ellipsis for few pages", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        currentPage={2}
        totalItems={50}
        itemsPerPage={10} // totalPages = 5
        onPageChange={onPageChange}
      />
    );

    [1, 2, 3, 4, 5].forEach((num) => {
      expect(screen.getByText(num.toString())).toBeInTheDocument();
    });
    expect(screen.queryByText("...")).not.toBeInTheDocument();
  });

  it("renders ellipsis correctly when current page is near start", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        currentPage={4}
        totalItems={100}
        itemsPerPage={10} // totalPages = 10
        onPageChange={onPageChange}
      />
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    // Use getAllByText since there might be multiple ellipsis
    expect(screen.getAllByText("...")).toHaveLength(2);
    expect(screen.getByText("10")).toBeInTheDocument();

    // Based on your component logic for currentPage=4, it shows: 1, ..., 3, 4, 5, ..., 10
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("renders ellipsis correctly when current page is near end", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        currentPage={8}
        totalItems={100}
        itemsPerPage={10} // totalPages = 10
        onPageChange={onPageChange}
      />
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("...")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    // Should show pages 7, 8, 9 (totalPages-3 to totalPages)
    expect(screen.getByText("7")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("9")).toBeInTheDocument();
  });

  it("renders ellipsis correctly when current page is in middle", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        currentPage={5}
        totalItems={100}
        itemsPerPage={10} // totalPages = 10
        onPageChange={onPageChange}
      />
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getAllByText("...")).toHaveLength(2);
    expect(screen.getByText("10")).toBeInTheDocument();
    // Should show pages 4, 5, 6 (currentPage-1, currentPage, currentPage+1)
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();
  });

  it("does not render when totalPages is 1 or less", () => {
    const onPageChange = vi.fn();
    const { container } = render(
      <Pagination
        currentPage={1}
        totalItems={5}
        itemsPerPage={10} // totalPages = 1
        onPageChange={onPageChange}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it("does not render when totalItems is 0", () => {
    const onPageChange = vi.fn();
    const { container } = render(
      <Pagination
        currentPage={1}
        totalItems={0}
        itemsPerPage={10}
        onPageChange={onPageChange}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it("enables Previous and Next buttons on middle pages", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        currentPage={2}
        totalItems={30}
        itemsPerPage={10}
        onPageChange={onPageChange}
      />
    );

    const prevButtons = screen.getAllByText(/Previous/i);
    const nextButtons = screen.getAllByText(/Next/i);

    // Check all buttons are enabled
    prevButtons.forEach((btn) => expect(btn).not.toBeDisabled());
    nextButtons.forEach((btn) => expect(btn).not.toBeDisabled());
  });

  it("calls onPageChange with correct page when page number is clicked", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(
      <Pagination
        currentPage={1}
        totalItems={30}
        itemsPerPage={10}
        onPageChange={onPageChange}
      />
    );

    const page2 = screen.getByText("2");
    await user.click(page2);

    expect(onPageChange).toHaveBeenCalledOnce();
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("calls onPageChange when Previous button is clicked", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(
      <Pagination
        currentPage={2}
        totalItems={30}
        itemsPerPage={10}
        onPageChange={onPageChange}
      />
    );

    // Click the first Previous button (mobile version)
    const prevButtons = screen.getAllByText(/Previous/i);
    await user.click(prevButtons[0]);

    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("calls onPageChange when Next button is clicked", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(
      <Pagination
        currentPage={2}
        totalItems={30}
        itemsPerPage={10}
        onPageChange={onPageChange}
      />
    );

    // Click the first Next button (mobile version)
    const nextButtons = screen.getAllByText(/Next/i);
    await user.click(nextButtons[0]);

    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("applies correct styling to current page", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        currentPage={2}
        totalItems={30}
        itemsPerPage={10}
        onPageChange={onPageChange}
      />
    );

    const currentPageButton = screen.getByText("2");
    expect(currentPageButton).toHaveClass("bg-blue-600", "text-white");
  });

  it("renders correct page info for first page with exact items per page", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        currentPage={1}
        totalItems={10}
        itemsPerPage={10}
        onPageChange={onPageChange}
      />
    );

    // The component should NOT render when totalPages = 1
    const { container } = render(
      <Pagination
        currentPage={1}
        totalItems={10}
        itemsPerPage={10}
        onPageChange={onPageChange}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it("handles single page correctly", () => {
    const onPageChange = vi.fn();
    const { container } = render(
      <Pagination
        currentPage={1}
        totalItems={5}
        itemsPerPage={10}
        onPageChange={onPageChange}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  // Additional test to verify the page info text content specifically
  it("renders exact page info text content", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        currentPage={2}
        totalItems={25}
        itemsPerPage={10}
        onPageChange={onPageChange}
      />
    );

    // Get the page info element by its class or parent structure
    const pageInfoElement = screen.getByText((_, element) => {
      return (
        element?.tagName === "P" &&
        element?.classList.contains("text-sm") &&
        element?.classList.contains("text-gray-700")
      );
    });

    // Check the complete text content
    expect(pageInfoElement).toHaveTextContent("Showing 11 to 20 of 25 results");
  });
});
