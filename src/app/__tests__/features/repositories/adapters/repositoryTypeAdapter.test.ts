import { RepositoryTypeAdapter } from "@/app/features/repositories/adapters/repositoryTypeAdapter";
import { apiRepositoryFixture } from "../../../../features/repositories/types/__fixtures__/apiRepositoryTypes.fixture";
import { simplifiedRepositoryFixture } from "../../../../features/repositories/types/__fixtures__/simplifiedRepositoryTypes.fixture";
import { ApiRepositoryType } from "@/app/features/repositories/types/apiRepositoryTypes";

describe("[src/app/features/repositories/adapters]", () => {
  describe("#RepositoryTypeAdapter", () => {
    it("should simplify repository data correctly", () => {
      const simplifiedRepository =
        RepositoryTypeAdapter.simplifyRepositoryAdapter(apiRepositoryFixture);

      expect(simplifiedRepository).toEqual(simplifiedRepositoryFixture);
    });
    it("should simplify repository data correctly with empty values", () => {
      const apiRepositoryWithEmptyValues: ApiRepositoryType = {
        ...apiRepositoryFixture,
        description: null,
        stargazers_count: undefined,
        forks_count: undefined,
        open_issues_count: undefined,
        watchers_count: undefined,
        updated_at: null,
        created_at: null,
        license: null,
      };

      const simplifiedRepository =
        RepositoryTypeAdapter.simplifyRepositoryAdapter(
          apiRepositoryWithEmptyValues
        );

      expect(simplifiedRepository).toEqual({
        ...simplifiedRepositoryFixture,
        description: "",
        stargazersCount: 0,
        forksCount: 0,
        openIssuesCount: 0,
        watchersCount: 0,
        updatedAt: undefined,
        createdAt: undefined,
        license: {
          name: "No license",
        },
      });
    });
  });
});
