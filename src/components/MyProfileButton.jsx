import useLoginContext from "@/hooks/useLoginContext";
import Link from "next/link";
import React from "react";

const MyProfileButton = () => {
  const userLogged = useLoginContext((state) => state.user);

  return (
    <Link
      className="rounded-full px-5 bg-amber-500 font-medium text-lg"
      href={{
        pathname: "/user/[id]",
        query: {
          id: userLogged.userId,
        },
      }}
      as={`/user/${userLogged.userId}`}
    >
      Mi perfil
    </Link>
  );
};

export default MyProfileButton;
