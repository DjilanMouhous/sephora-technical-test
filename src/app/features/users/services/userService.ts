import { Result, ok, err } from "neverthrow";
import { SimplifiedUserType } from "../types/simplifiedUserTypes";

export class UserService {
  private readonly baseUrl = "http://localhost:3000/api/";

  private readonly headers = {
    "Content-Type": "application/json",
  };

  public async list(
    search: string
  ): Promise<Result<SimplifiedUserType[], Error>> {
    const response = await fetch(`${this.baseUrl}users/`, {
      headers: this.headers,
      body: JSON.stringify({ search }),
      method: "POST",
    });

    if (!response.ok) {
      return err(new Error("Failed to fetch users"));
    }

    const users = (await response.json()) as unknown as SimplifiedUserType[];
    return ok(users);
  }

  public async getUserByName(
    userName: string
  ): Promise<Result<SimplifiedUserType, Error>> {
    const response = await fetch(`${this.baseUrl}users/${userName}/`, {
      headers: this.headers,
    });

    if (!response.ok) {
      return err(new Error("Failed to fetch user"));
    }

    const user = (await response.json()) as unknown as SimplifiedUserType;
    return ok(user);
  }
}
