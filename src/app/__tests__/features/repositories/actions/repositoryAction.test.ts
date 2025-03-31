import { RepositoryAcion } from "@/app/features/repositories/actions/repositoryAction";
import { apiRepositoryFixture } from "@/app/features/repositories/types/__fixtures__/apiRepositoryTypes.fixture";
import { err, ok } from "neverthrow";

describe("[src/app/features/repositories/actions/]", () => {
  describe("RepositoryAction", () => {
    const repositoryAction = new RepositoryAcion();

    describe("#list", () => {
      it("should return repositories when the service call is successful", async () => {
        global.fetch = jest.fn().mockResolvedValue({
          ok: true,
          json: jest.fn().mockResolvedValue([]),
        });

        const result = await repositoryAction.list("react");
        expect(result).toEqual(ok([]));
      });
      it("should return error when the service call fails", async () => {
        global.fetch = jest.fn().mockResolvedValue({
          ok: false,
          statusText: "Failed to fetch",
        });

        const result = await repositoryAction.list("react");
        expect(result.isErr()).toBe(true);
        expect(result).toEqual(err(new Error("Failed to fetch repositories")));
      });
    });

    describe("#getByRepositorySlug", () => {
      it("should return a repository when the service call is successful", async () => {
        global.fetch = jest.fn().mockResolvedValue({
          ok: true,
          json: jest.fn().mockResolvedValue(apiRepositoryFixture),
        });

        const result = await repositoryAction.getByRepositorySlug("user/repo");
        expect(result).toEqual(ok(apiRepositoryFixture));
      });
      it("should return error when the service call fails", async () => {
        global.fetch = jest.fn().mockResolvedValue({
          ok: false,
          statusText: "Failed to fetch",
        });

        const result = await repositoryAction.getByRepositorySlug("user/repo");
        expect(result.isErr()).toBe(true);
        expect(result).toEqual(
          err(new Error("Failed to fetch repository in action"))
        );
      });
    });

    describe("#getReadMeByRepositoryFullSlug", () => {
      it("should return readMe when the service call is successful", async () => {
        global.fetch = jest.fn().mockResolvedValue({
          ok: true,
          text: jest.fn().mockResolvedValue("Sample README content"),
        });

        const result = await repositoryAction.getReadMeByRepositoryFullSlug({
          repositorySlug: "user/repo",
          defaultBranch: "main",
        });
        expect(result).toEqual(ok("Sample README content"));
      });
      it("should return error when the service call fails", async () => {
        global.fetch = jest.fn().mockResolvedValue({
          ok: false,
          statusText: "Failed to fetch",
        });

        const result = await repositoryAction.getReadMeByRepositoryFullSlug({
          repositorySlug: "user/repo",
          defaultBranch: "main",
        });
        expect(result.isErr()).toBe(true);
        expect(result).toEqual(
          err(new Error("Failed to fetch repository readme"))
        );
      });
    });
  });
});
