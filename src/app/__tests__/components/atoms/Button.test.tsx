import Button from "@/app/components/atoms/Button";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("[src/app/components/atoms/]", () => {
  describe("#Button", () => {
    const mockClick = jest.fn();

    it("renders a button with onClick prop", () => {
      render(<Button onClick={mockClick}>Click Me</Button>);
      const button = screen.getByRole("button", { name: /click me/i });
      expect(button).toBeInTheDocument();
      expect(button).not.toBeDisabled();
    });

    it("renders a Link when href prop is provided", () => {
      render(<Button href="/about">Go to About</Button>);
      const link = screen.getByRole("link", { name: /go to about/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/about");
    });

    it("adds disabled state correctly", () => {
      render(
        <Button onClick={mockClick} disabled={true}>
          Disabled
        </Button>
      );
      const button = screen.getByRole("button", { name: /disabled/i });
      expect(button).toBeDisabled();
      expect(button).toHaveClass("cursor-not-allowed");
    });

    it("triggers onClick function when clicked", () => {
      render(<Button onClick={mockClick}>Click Me</Button>);
      const button = screen.getByRole("button", { name: /click me/i });
      fireEvent.click(button);
      expect(mockClick).toHaveBeenCalledTimes(1);
    });

    it("applies custom className correctly", () => {
      render(
        <Button onClick={mockClick} className="custom-class">
          Custom
        </Button>
      );
      const button = screen.getByRole("button", { name: /custom/i });
      expect(button).toHaveClass("custom-class");
    });
  });
});
