import { Result, ok, err } from "neverthrow";
import { SimplifiedRepositoryType } from "../types/simplifiedRepositoryTypes";
import { RepositoryTypeAdapter } from "../adapters/repositoryTypeAdapter";
import { ApiRepositoryArrayType } from "../types/apiRepositoryTypes";
import { ApiRepositoryType } from "../types/apiRepositoryTypes";

export class RepositoryAcion {
  private readonly baseUrl = "https://api.github.com/";

  private readonly headers = {
    Accept: "application/vnd.github.v3+json",
  };

  public async list(
    search: string
  ): Promise<Result<SimplifiedRepositoryType[], Error>> {
    const response = await fetch(`${this.baseUrl}users/${search}/repos`, {
      headers: this.headers,
    });

    if (!response.ok) {
      return err(new Error("Failed to fetch repositories"));
    }

    const repositories =
      (await response.json()) as unknown as ApiRepositoryArrayType;
    return ok(
      repositories.map(RepositoryTypeAdapter.simplifyRepositoryAdapter)
    );
  }

  public async getByRepositorySlug(
    repositorySlug: string
  ): Promise<Result<ApiRepositoryType, Error>> {
    const response = await fetch(`${this.baseUrl}repos/${repositorySlug}`, {
      headers: this.headers,
    });

    if (!response.ok) {
      return err(new Error("Failed to fetch repository in action"));
    }

    const repository = (await response.json()) as unknown as ApiRepositoryType;
    return ok(repository);
  }

  public async getReadMeByRepositoryFullSlug({
    repositorySlug,
    defaultBranch,
  }: {
    repositorySlug: string;
    defaultBranch: string;
  }): Promise<Result<string, Error>> {
    const response = await fetch(
      `https://raw.githubusercontent.com/${repositorySlug}/${defaultBranch}/README.md`
    );

    if (!response.ok) {
      return err(new Error("Failed to fetch repository readme"));
    }

    const readme = await response.text();

    return ok(readme);
  }
}
