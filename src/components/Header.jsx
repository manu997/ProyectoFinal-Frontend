import LogoutButton from "./LogoutButton";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useUserContext } from "@/hooks/useLoginContext";

const Header = () => {
  const userLogged = useUserContext();
  const router = useRouter();

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
            Bienvenido, {userLogged.username}
          </p>
          <Link
            className="rounded-full px-5 bg-amber-500 font-medium text-lg"
            href={`/user/${userLogged.userId}`}
          >
            Mi perfil
          </Link>
          <LogoutButton />
        </div>
        {userLogged.role === "WRITER" && (
          <div className="flex flex-row gap-5">
            <Link
              href={"/users"}
              className="rounded-full px-5 bg-amber-500 font-medium text-lg"
            >
              Usuarios
            </Link>
            <Link
              className="rounded-full px-5 bg-amber-500 font-medium text-lg"
              href="/create"
            >
              Crear elemento
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
