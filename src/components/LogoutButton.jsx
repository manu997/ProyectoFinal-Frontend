import useLoginContext from "@/hooks/useLoginContext";
import { useRouter } from "next/router";
import React from "react";

const LogoutButton = () => {
  const router = useRouter();

  const setAccessKey = useLoginContext((state) => state.setAccessKey);
  const setUserByUsername = useLoginContext((state) => state.setUserByUsername);

  const logout = () => {
    setAccessKey("");
    setUserByUsername("", "", "");
    router.push("/");
  };

  return (
    <button
      type="button"
      className="rounded-full px-5 bg-amber-500 font-medium text-lg"
      onClick={logout}
    >
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
