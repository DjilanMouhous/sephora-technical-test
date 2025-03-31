import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { UserLine } from "@/app/components/molecules/UserLine";
import { simplifiedUserFixture } from "@/app/features/users/types/__fixtures__/simplifiedUserTypes.fixture";

describe("[src/app/components/molecules/]", () => {
  describe("#UserLine", () => {
    it("renders the user's avatar and login", () => {
      render(<UserLine user={simplifiedUserFixture} />);
      const image = screen.getByRole("img", { name: /octocat/i });
      const username = screen.getByText("octocat");

      expect(image).toBeInTheDocument();

      expect(image).toHaveAttribute("alt", "octocat");
      expect(image).toHaveAttribute("loading", "lazy");
      expect(username).toBeInTheDocument();
    });

    it("renders the correct link", () => {
      render(<UserLine user={simplifiedUserFixture} />);
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/users/octocat");
    });

    it("has the correct styling classes", () => {
      const { container } = render(<UserLine user={simplifiedUserFixture} />);
      expect(container.firstChild).toHaveClass(
        "user-line gap-3 flex items-center p-3 rounded-xl border border-neutral-600 transition-colors bg-neutral-900 hover:bg-neutral-800"
      );
    });
  });
});
