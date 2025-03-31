import { UserTypeAdapter } from "../../users/adapters/userTypeAdapter";
import { ApiRepositoryType } from "../types/apiRepositoryTypes";
import { SimplifiedRepositoryType } from "../types/simplifiedRepositoryTypes";

export class RepositoryTypeAdapter {
  static simplifyRepositoryAdapter = (
    repo: ApiRepositoryType
  ): SimplifiedRepositoryType => {
    return {
      id: repo.id,
      name: repo.name,
      htmlUrl: repo.html_url,
      description: repo.description ?? "",
      stargazersCount: repo.stargazers_count ?? 0,
      forksCount: repo.forks_count ?? 0,
      openIssuesCount: repo.open_issues_count ?? 0,
      watchersCount: repo.watchers_count ?? 0,
      updatedAt: repo.updated_at ? new Date(repo.updated_at) : undefined,
      language: repo.language ?? "",
      license: {
        name: repo.license?.name ?? "No license",
      },
      createdAt: repo.created_at ? new Date(repo.created_at) : undefined,
      owner: UserTypeAdapter.simplifyUserAdapter(repo.owner),
      defaultBranch: repo.default_branch,
    };
  };
}
