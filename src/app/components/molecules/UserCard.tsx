import { SimplifiedUserType } from "@/app/features/users/types/simplifiedUserTypes";
import Image from "next/image";

export function UserCard({ user }: { user: SimplifiedUserType }) {
  return (
    <li className="flex items-center p-4 bg-neutral-700 shadow rounded-md">
      <Image
        className="w-12 h-12 rounded-full"
        src={user.avatarUrl}
        alt={user.login}
        width={48}
        height={48}
      />
      <div className="ml-4">
        <h3 className="text-lg font-semibold">{user.login}</h3>
      </div>
    </li>
  );
}
