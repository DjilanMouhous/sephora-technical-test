import { UserService } from "@/app/features/users/services/userService";
import { simplifiedUserFixture } from "@/app/features/users/types/__fixtures__/simplifiedUserTypes.fixture";
import { err, ok } from "neverthrow";

describe("[src/app/features/users/actions]", () => {
  describe("UserAction", () => {
    const userService = new UserService();

    describe("#list", () => {
      it("should return users when the service call is successful", async () => {
        global.fetch = jest.fn().mockResolvedValue({
          ok: true,
          json: jest.fn().mockResolvedValue([]),
        });

        const result = await userService.list("facebook");
        expect(result).toEqual(ok([]));
      });
      it("should return error when the service call fails", async () => {
        global.fetch = jest.fn().mockResolvedValue({
          ok: false,
          statusText: "Failed to fetch",
        });

        const result = await userService.list("react");
        expect(result.isErr()).toBe(true);
        expect(result).toEqual(err(new Error("Failed to fetch users")));
      });
    });

    describe("#getUserByName", () => {
      it("should return a user when the service call is successful", async () => {
        global.fetch = jest.fn().mockResolvedValue({
          ok: true,
          json: jest.fn().mockResolvedValue(simplifiedUserFixture),
        });

        const result = await userService.getUserByName("facebook");
        expect(result).toEqual(ok(simplifiedUserFixture));
      });
      it("should return error when the service call fails", async () => {
        global.fetch = jest.fn().mockResolvedValue({
          ok: false,
          statusText: "Failed to fetch",
        });

        const result = await userService.getUserByName("react");
        expect(result.isErr()).toBe(true);
        expect(result).toEqual(err(new Error("Failed to fetch user")));
      });
    });
  });
});
