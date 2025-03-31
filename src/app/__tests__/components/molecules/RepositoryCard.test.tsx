import { render, screen } from "@testing-library/react";
import RepositoryCard from "@/app/components/molecules/RepositoryCard";
import { simplifiedRepositoryFixture } from "@/app/features/repositories/types/__fixtures__/simplifiedRepositoryTypes.fixture";

describe("[src/app/components/molecules/]", () => {
  describe("#RepositoryCard", () => {
    it("renders correctly with all props", () => {
      render(
        <RepositoryCard
          repository={simplifiedRepositoryFixture}
          user="testuser"
        />
      );
      expect(screen.getByText("Hello-World")).toBeInTheDocument();
      expect(screen.getByText("This your first repo!")).toBeInTheDocument();
      expect(screen.getByText("80")).toBeInTheDocument();
      expect(screen.getByText("9")).toBeInTheDocument();
      expect(screen.getByText("0")).toBeInTheDocument();
    });

    it("renders correct link", () => {
      render(
        <RepositoryCard
          repository={simplifiedRepositoryFixture}
          user="octocat"
        />
      );
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/users/octocat/Hello-World");
    });

    it("does not render if repository name is missing", () => {
      const incompleteRepo = { ...simplifiedRepositoryFixture, name: "" };
      const { container } = render(
        <RepositoryCard repository={incompleteRepo} user="testuser" />
      );
      expect(container.firstChild).toBeNull();
    });

    it("shows fallback description if none is provided", () => {
      const repoWithoutDescription = {
        ...simplifiedRepositoryFixture,
        description: "",
      };
      render(
        <RepositoryCard repository={repoWithoutDescription} user="testuser" />
      );
      expect(screen.getByText("No description available")).toBeInTheDocument();
    });
  });
});
