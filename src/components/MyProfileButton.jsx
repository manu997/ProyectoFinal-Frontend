import Link from "next/link";
import { useCookies } from "react-cookie";
import React from "react";

const MyProfileButton = () => {
  const [cookies] = useCookies(["userKey", "userId"]);

  return (
    <Link
      className="rounded-full px-5 bg-amber-500 font-medium text-lg"
      href={{
        pathname: "/user/[id]",
        query: {
          id: cookies.userId,
        },
      }}
      as={`/user/${cookies.userId}`}
    >
      Mi perfil
    </Link>
  );
};

export default MyProfileButton;
