import { UserAction } from "@/app/features/users/actions/userAction";
import { apiUserFixture } from "@/app/features/users/types/__fixtures__/apiUserTypes.fixture";
import { simplifiedUserFixture } from "@/app/features/users/types/__fixtures__/simplifiedUserTypes.fixture";
import { err, ok } from "neverthrow";

describe("[src/app/features/users/actions]", () => {
  describe("UserAction", () => {
    const userAction = new UserAction();

    describe("#list", () => {
      it("should return users when the service call is successful", async () => {
        global.fetch = jest.fn().mockResolvedValue({
          ok: true,
          json: jest.fn().mockResolvedValue({ items: [] }),
        });

        const result = await userAction.list("facebook");
        expect(result).toEqual(ok([]));
      });
      it("should return error when the service call fails", async () => {
        global.fetch = jest.fn().mockResolvedValue({
          ok: false,
          statusText: "Failed to fetch",
        });

        const result = await userAction.list("react");
        expect(result.isErr()).toBe(true);
        expect(result).toEqual(err(new Error("Failed to fetch users")));
      });
    });

    describe("#getUserByName", () => {
      it("should return a user when the service call is successful", async () => {
        global.fetch = jest.fn().mockResolvedValue({
          ok: true,
          json: jest.fn().mockResolvedValue(apiUserFixture),
        });

        const result = await userAction.getUserByName("facebook");
        expect(result).toEqual(ok(simplifiedUserFixture));
      });
      it("should return error when the service call fails", async () => {
        global.fetch = jest.fn().mockResolvedValue({
          ok: false,
          statusText: "Failed to fetch",
        });

        const result = await userAction.getUserByName("react");
        expect(result.isErr()).toBe(true);
        expect(result).toEqual(err(new Error("Failed to fetch user")));
      });
    });
  });
});
