import Sidebar from "@/app/components/globals/Sidebar";
import { render, screen } from "@testing-library/react";

describe("[src/app/components/global/]", () => {
  describe("#Sidebar", () => {
    it("renders correctly", () => {
      render(<Sidebar />);
      // Get aside
      const aside = screen.getByRole("complementary");
      expect(aside).toBeInTheDocument();
    });
  });
});
