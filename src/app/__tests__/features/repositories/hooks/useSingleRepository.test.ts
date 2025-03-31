import { getSSRSingleRepositories } from "@/app/features/repositories/hooks/useSingleRepository";
import { RepositoryService } from "@/app/features/repositories/services/repositoryService";
import { simplifiedRepositoryFixture } from "@/app/features/repositories/types/__fixtures__/simplifiedRepositoryTypes.fixture";
import { err, ok } from "neverthrow";

describe("[src/app/features/repositories/hooks]", () => {
  describe("#useSSRSingleRepositories", () => {
    let repositoryGetByRepositorySlugMock: jest.SpyInstance;

    beforeEach(() => {
      repositoryGetByRepositorySlugMock = jest
        .spyOn(RepositoryService.prototype, "getByRepositorySlug")
        .mockResolvedValue(ok(simplifiedRepositoryFixture));
    });

    it("should return undefined if slug is undefined", async () => {
      const result = await getSSRSingleRepositories("");
      expect(result.repository).toEqual(undefined);
      expect(result.error).toBeNull();
    });

    it("should return a repository if slug is provided", async () => {
      const result = await getSSRSingleRepositories("testuser/repo1");
      expect(result.repository).toEqual(simplifiedRepositoryFixture);
      expect(result.error).toBeNull();
    });

    it("should return an error if the service call fails", async () => {
      const errorMessage = "API Error";
      repositoryGetByRepositorySlugMock.mockResolvedValue(
        err(new Error(errorMessage))
      );

      const result = await getSSRSingleRepositories("testuser/repo1");
      expect(result.repository).toEqual(undefined);
      expect(result.error).toEqual(errorMessage);
    });
  });
});
