import { SimplifiedRepositoryType } from "@/app/features/repositories/types/simplifiedRepositoryTypes";

export const simplifiedRepositoryFixture: SimplifiedRepositoryType = {
  id: 1296269,
  name: "Hello-World",
  owner: {
    id: 1,
    login: "octocat",
    avatarUrl: "https://github.com/images/error/octocat_happy.gif",
    htmlUrl: "https://github.com/octocat",
  },
  description: "This your first repo!",
  htmlUrl: "https://github.com/octocat/Hello-World",
  stargazersCount: 80,
  forksCount: 9,
  openIssuesCount: 0,
  watchersCount: 80,
  createdAt: new Date("2011-01-26T19:01:12Z"),
  updatedAt: new Date("2011-01-26T19:14:43Z"),
  defaultBranch: "master",
  language: "",
  license: {
    name: "MIT",
  },
};
