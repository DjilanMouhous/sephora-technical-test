import Loader from "@/app/components/atoms/Loader";
import { render, screen } from "@testing-library/react";

describe("[src/app/components/atoms/]", () => {
  describe("#Loader", () => {
    it("renders correctly with default props", () => {
      render(<Loader />);
      const loader = screen.getByRole("status");
      expect(loader).toBeInTheDocument();
      expect(loader).toHaveAttribute("aria-label", "Loading...");
    });

    it("applies custom size and color props", () => {
      render(<Loader size={8} color="border-red-500" />);
      const spinner = screen.getByRole("status").firstChild as HTMLElement;
      expect(spinner).toHaveClass("w-8 h-8 border-red-500");
    });

    it("has animation class for spinning", () => {
      render(<Loader />);
      const spinner = screen.getByRole("status").firstChild as HTMLElement;
      expect(spinner).toHaveClass("animate-spin");
    });
  });
});
