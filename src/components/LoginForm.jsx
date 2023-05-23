import { useRouter } from "next/router";
import { useState } from "react";
import useLoginContext from "../hooks/useLoginContext";
import { useCookies } from "react-cookie";
import useLogin from "@/hooks/useLogin";
import React from "react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
  const router = useRouter();

  const [cookies, setCookie] = useCookies(["userKey"]);

  const setUserByUsername = useLoginContext((state) => state.setUserByUsername);
  const { mutateAsync } = useLogin();

  const login = () => {
    let credentials = {
      username: username,
      password: password,
    };
    mutateAsync(credentials)
      .then((res) => {
        if (res.status === 200) {
          setUserByUsername("", username, "");
          setCookie("userKey", res.headers.get("Authorization"), {
            path: "/",
          });
          router.replace("/");
          router.push(`/home`);
        } else {
          setDisplayErrorMessage(true);
        }
      })
      .catch(() => {
        setDisplayErrorMessage(true);
      });
  };

  return (
    <form
      method="POST"
      className="flex flex-col sm:w-1/3 max-sm:w-full max-sm:mx-auto max-sm:ml-0 outline outline-amber-500 p-10 rounded-xl"
    >
      <h1 className="text-4xl text-amber-500 pb-7 text-center font-semibold">
        Iniciar sesión
      </h1>
      {displayErrorMessage && <p className="text-red-500">ERROR EN LOGIN</p>}
      <label htmlFor="username" className="text-amber-500 text-xl mb-2">
        Nombre de usuario:{" "}
      </label>
      <input
        type="text"
        id="username"
        placeholder="Nombre de usuario..."
        className="rounded-full pl-5 mb-3 py-2 text-xl"
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password" className="text-amber-500 text-xl mb-2">
        Contraseña:{" "}
      </label>
      <input
        type="password"
        id="pwd"
        placeholder="Contraseña..."
        className="rounded-full pl-5 mb-3 py-2 text-xl"
        onChange={(e) => setPassword(e.target.value)}
      />
      <a
        className="cursor-pointer rounded-full py-2 mt-5 bg-amber-500 font-medium text-xl text-center"
        onClick={login}
      >
        Iniciar sesión
      </a>
    </form>
  );
};

export default LoginForm;
