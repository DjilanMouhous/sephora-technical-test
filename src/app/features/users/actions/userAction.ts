import { Result, ok, err } from "neverthrow";
import { SimplifiedUserType } from "../types/simplifiedUserTypes";
import { ApiUserArrayType, ApiUserType } from "../types/apiUserTypes";
import { UserTypeAdapter } from "../adapters/userTypeAdapter";

export class UserAction {
  private readonly baseUrl = "https://api.github.com/";

  private readonly headers = {
    Accept: "application/vnd.github+json",
  };

  public async list(
    search: string
  ): Promise<Result<SimplifiedUserType[], Error>> {
    const response = await fetch(
      `${this.baseUrl}search/users?q=${search}&per_page=10`,
      {
        headers: this.headers,
      }
    );

    if (!response.ok) {
      return err(new Error("Failed to fetch users"));
    }

    const users = (await response.json()) as unknown as ApiUserArrayType;
    return ok(users.items.map(UserTypeAdapter.simplifyUserAdapter));
  }

  public async getUserByName(
    userName: string
  ): Promise<Result<SimplifiedUserType, Error>> {
    const response = await fetch(`${this.baseUrl}users/${userName}`, {
      headers: this.headers,
    });

    if (!response.ok) {
      return err(new Error("Failed to fetch user"));
    }

    const user = (await response.json()) as unknown as ApiUserType;
    return ok(UserTypeAdapter.simplifyUserAdapter(user));
  }
}
