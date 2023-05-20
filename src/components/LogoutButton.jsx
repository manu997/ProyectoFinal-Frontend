import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import React from "react";

const LogoutButton = () => {
  const [cookies, setCookie] = useCookies(["userKey", "userId", "userRole"]);
  const router = useRouter();
  const logout = () => {
    setCookie("userKey", "");
    setCookie("userId", "");
    setCookie("userRole", "");
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
