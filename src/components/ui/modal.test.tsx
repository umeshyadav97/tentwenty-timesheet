import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Modal } from "@/components/ui/modal";

describe("Modal", () => {
  it("renders dialog content and closes from the close button", async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(
      <Modal title="Add New Entry" onClose={handleClose}>
        <p>Modal body</p>
      </Modal>,
    );

    expect(screen.getByRole("dialog", { name: "Add New Entry" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Close modal" }));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("closes when Escape is pressed", async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(
      <Modal title="Add New Entry" onClose={handleClose}>
        <p>Modal body</p>
      </Modal>,
    );

    await user.keyboard("{Escape}");

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
