import { useCookies } from "react-cookie";
import MyProfileButton from "./MyProfileButton";
import LogoutButton from "./LogoutButton";
import NewElementButton from "./NewItemButton";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import useLoginContext from "@/hooks/useLoginContext";

const Header = () => {
  const [cookies] = useCookies(["userRole"]);

  const userLogged = useLoginContext((state) => state.user);

  const [displayedUsername, setDisplayerUsername] = useState();

  const router = useRouter();

  useEffect(() => {
    setDisplayerUsername(userLogged.username);
  }, [userLogged.username]);

  return (
    <>
      <div className="border-2 border-amber-500 mb-5">
        <h1 className="text-4xl text-center text-amber-500 py-3">
          Anales de la Ciencia
        </h1>
      </div>
      <div className="flex flex-row justify-between mt-5">
        <div className="flex flex-row h-8 gap-5">
          {router.asPath !== `/home` && (
            <Link href={`/home`}>
              <ArrowLeftIcon className="h-6 w-6 text-neutral-50" />
            </Link>
          )}
          <p className="rounded-full px-5 bg-amber-500 font-medium text-lg">
            Bienvenido, {displayedUsername}
          </p>
          <MyProfileButton />
          <LogoutButton />
        </div>
        {userLogged.role == "WRITER" && (
          <div className="flex flex-row gap-5">
            <Link
              href={"/users"}
              className="rounded-full px-5 bg-amber-500 font-medium text-lg"
            >
              Usuarios
            </Link>
            <NewElementButton />{" "}
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
