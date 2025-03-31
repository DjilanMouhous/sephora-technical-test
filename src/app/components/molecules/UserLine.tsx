import { SimplifiedUserType } from "@/app/features/users/types/simplifiedUserTypes";
import Image from "next/image";
import Link from "next/link";

export function UserLine({ user }: { user: SimplifiedUserType }) {
  return (
    <Link
      data-testid="user-line"
      className="user-line gap-3  flex items-center p-3 rounded-xl border border-neutral-600 transition-colors bg-neutral-900
      hover:bg-neutral-800"
      href={`/users/${user.login}`}
    >
      <Image
        src={user.avatarUrl}
        alt={user.login}
        width={50}
        height={50}
        className="rounded-full"
      />
      <div>{user.login}</div>
    </Link>
  );
}
