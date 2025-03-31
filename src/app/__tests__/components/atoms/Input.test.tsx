import Input from "@/app/components/atoms/Input";
import { render, screen, fireEvent } from "@testing-library/react";

describe("[src/app/components/atoms/]", () => {
  describe("#Input", () => {
    const mockOnChange = jest.fn();

    afterEach(() => {
      mockOnChange.mockClear();
    });

    it("renders with correct props", () => {
      render(
        <Input value="test" onChange={mockOnChange} placeholder="Enter text" />
      );
      const input = screen.getByPlaceholderText("Enter text");
      expect(input).toBeInTheDocument();
      expect(input).toHaveValue("test");
    });

    it("calls onChange when typing", () => {
      render(<Input value="" onChange={mockOnChange} />);
      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "Hello" } });
      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith("Hello");
    });

    it("supports password type", () => {
      render(<Input type="password" value="" onChange={mockOnChange} />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("type", "password");
    });

    it("disables the input when disabled prop is true", () => {
      render(<Input value="" onChange={mockOnChange} disabled />);
      const input = screen.getByRole("textbox");
      expect(input).toBeDisabled();
      expect(input).toHaveClass("cursor-not-allowed");
    });

    it("does not disable the input when disabled prop is false", () => {
      render(<Input value="" onChange={mockOnChange} disabled={false} />);
      const input = screen.getByRole("textbox");
      expect(input).not.toBeDisabled();
      expect(input).not.toHaveClass("cursor-not-allowed");
    });

    it("applies custom className correctly", () => {
      render(
        <Input value="" onChange={mockOnChange} className="custom-class" />
      );
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("custom-class");
    });
  });
});
