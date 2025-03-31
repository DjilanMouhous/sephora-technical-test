import { RepositoryAcion } from "@/app/features/repositories/actions/repositoryAction";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const repositoryAction = new RepositoryAcion();

  const { search } = await req.json();
  const repositoryListResult = await repositoryAction.list(search);

  if (repositoryListResult.isErr()) {
    return NextResponse.json(
      { error: repositoryListResult.error.message },
      { status: 500 }
    );
  } else {
    return NextResponse.json(repositoryListResult.value);
  }
}
