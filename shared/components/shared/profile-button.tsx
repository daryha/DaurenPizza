import React from "react";
import { Button } from "../ui";
import { CircleUser, Heart, UserRoundPlus } from "lucide-react";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";

interface Props {
  onClickSingIn?: () => void;
  className?: string;
}

export const ProfileButton: React.FC<Props> = ({ className, onClickSingIn }) => {
  const { data: session } = useSession();

  return (
    <div>
      {!session ? (
        <Button onClick={onClickSingIn} variant={"outline"} className="felx items-center gap-1">
          <UserRoundPlus size={16} /> Войти
        </Button>
      ) : (
        <>
          <div className="flex items-center gap-4 ">
            <Link href={"/profile?favorites"}>
              <Button variant={"secondary"} className="flex items-center gap-2">
                <Heart size={18} />
                Любимые
              </Button>
            </Link>

            <Link href={"/profile?profile"}>
              <Button variant={"secondary"} className="flex items-center gap-2">
                <CircleUser size={18} />
                Профиль
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
