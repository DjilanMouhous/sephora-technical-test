import { UserAction } from "@/app/features/users/actions/userAction";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const userAction = new UserAction();

  const { search } = await req.json();
  const usersResult = await userAction.list(search);

  if (usersResult.isErr()) {
    return NextResponse.json(
      { error: usersResult.error.message },
      { status: 500 }
    );
  } else {
    return NextResponse.json(usersResult.value);
  }
}
