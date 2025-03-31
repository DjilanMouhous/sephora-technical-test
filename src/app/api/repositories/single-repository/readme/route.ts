import { RepositoryAcion } from "@/app/features/repositories/actions/repositoryAction";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const json = await req.json();
  const repositorySlug = json.repositorySlug;
  const defaultBranch = json.defaultBranch;

  const repositoryAction = new RepositoryAcion();

  const repositorySingleResult =
    await repositoryAction.getReadMeByRepositoryFullSlug({
      repositorySlug: repositorySlug,
      defaultBranch: defaultBranch,
    });

  if (repositorySingleResult.isErr()) {
    return NextResponse.json(
      { error: repositorySingleResult.error.message },
      { status: 500 }
    );
  } else {
    return NextResponse.json(repositorySingleResult.value);
  }
}
