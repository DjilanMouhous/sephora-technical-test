import { Result, ok, err } from "neverthrow";
import { SimplifiedRepositoryType } from "../types/simplifiedRepositoryTypes";
import { RepositoryTypeAdapter } from "../adapters/repositoryTypeAdapter";
import { ApiRepositoryType } from "../types/apiRepositoryTypes";

export class RepositoryService {
  private readonly baseUrl = "http://localhost:3000/api/";

  private readonly headers = {
    "Content-Type": "application/json",
  };

  public async list(
    search: string
  ): Promise<Result<SimplifiedRepositoryType[], Error>> {
    const response = await fetch(`${this.baseUrl}repositories`, {
      body: JSON.stringify({ search }),
      method: "POST",
      headers: this.headers,
    });

    if (!response.ok) {
      return err(new Error("Failed to fetch repositories"));
    }

    const repositories =
      (await response.json()) as unknown as SimplifiedRepositoryType[];
    return ok(repositories);
  }

  public async getByRepositorySlug(
    repositorySlug: string
  ): Promise<Result<SimplifiedRepositoryType, Error>> {
    const response = await fetch(
      `${this.baseUrl}repositories/single-repository`,
      {
        headers: this.headers,
        method: "POST",
        body: JSON.stringify({ repositorySlug }),
      }
    );
    if (!response.ok) {
      return err(new Error("Failed to fetch repository"));
    }

    const repository = (await response.json()) as unknown as ApiRepositoryType;
    return ok(RepositoryTypeAdapter.simplifyRepositoryAdapter(repository));
  }

  public async getReadMeByRepositoryFullSlug({
    repositorySlug,
    defaultBranch,
  }: {
    repositorySlug: string;
    defaultBranch: string;
  }): Promise<Result<string, Error>> {
    const response = await fetch(
      `${this.baseUrl}repositories/single-repository/readme`,
      {
        headers: this.headers,
        method: "POST",
        body: JSON.stringify({ defaultBranch, repositorySlug }),
      }
    );

    if (!response.ok) {
      return err(new Error("Failed to fetch repository readme"));
    }
    const readme = await response.json();
    return ok(readme);
  }
}
