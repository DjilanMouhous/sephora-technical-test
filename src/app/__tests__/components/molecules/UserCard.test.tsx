import { render, screen } from "@testing-library/react";
import { UserCard } from "@/app/components/molecules/UserCard";
import { simplifiedUserFixture } from "@/app/features/users/types/__fixtures__/simplifiedUserTypes.fixture";

describe("[src/app/components/molecules/]", () => {
  describe("#UserCard", () => {
    it("renders the user's avatar and login", () => {
      render(<UserCard user={simplifiedUserFixture} />);
      const image = screen.getByRole("img");
      const username = screen.getByText("octocat");

      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("alt", "octocat");
      expect(image).toHaveAttribute("loading", "lazy");
      expect(username).toBeInTheDocument();
    });

    it("has the correct styling classes", () => {
      const { container } = render(<UserCard user={simplifiedUserFixture} />);
      expect(container.firstChild).toHaveClass(
        "flex items-center p-4 bg-neutral-700 shadow rounded-md"
      );
    });
  });
});
