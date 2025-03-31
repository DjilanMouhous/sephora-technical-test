import { UserAction } from "@/app/features/users/actions/userAction";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ user_name: string }> }
) {
  const userAction = new UserAction();

  const { user_name } = await params;
  const userResult = await userAction.getUserByName(user_name);
  if (userResult.isErr()) {
    return NextResponse.json(
      { error: userResult.error.message },
      { status: 500 }
    );
  } else {
    return NextResponse.json(userResult.value);
  }
}
