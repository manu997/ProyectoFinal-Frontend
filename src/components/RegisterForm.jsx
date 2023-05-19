import { useState } from "react";
import { useCookies } from "react-cookie";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import useLogin from "@/hooks/useLoginContext";
import useCreateUser from "@/hooks/createUserMutation";
import React from "react";


const RegisterForm = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "reader",
  });

  const setRole = useLogin((state) => state.setRole);
  const setUserId = useLogin((state) => state.setUserId);

  const [cookies, setCookie] = useCookies(["userKey"]);

  const router = useRouter();

  const { mutateAsync } = useCreateUser();

  const register = () => {
    mutateAsync(user).then(async (res) => {
      setCookie("userKey", res.headers.get("Authorization"), {
        path: "/",
      });
      console.log(res);
      if (res.status === 201) {
        const resJson = await res.json();
        router.push(`/home`);
      }
    });
  };

  return (
    <form className="flex flex-col w-1/3 outline outline-amber-500 p-10 rounded-xl">
      <h1 className="text-4xl text-amber-500 pb-7 text-center font-semibold">
        Registrarse
      </h1>
      <label htmlFor="username" className="text-amber-500 text-xl mb-2">
        Nombre de usuario:{" "}
      </label>
      <input
        type="text"
        placeholder="Nombre de usuario..."
        id="username"
        className="rounded-full pl-5 mb-3 py-2 text-xl"
        onChange={(e) => (user.username = e.target.value)}
      />
      <label htmlFor="email" className="text-amber-500 text-xl mb-2">
        Email:{" "}
      </label>
      <input
        type="email"
        placeholder="Email..."
        className="rounded-full pl-5 mb-3 py-2 text-xl"
        onChange={(e) => (user.email = e.target.value)}
      />
      <label htmlFor="password" className="text-amber-500 text-xl mb-2">
        Nueva contraseña:{" "}
      </label>
      <input
        placeholder="Contraseña..."
        type="password"
        className="rounded-full pl-5 mb-3 py-2 text-xl"
        onChange={(e) => (user.password = e.target.value)}
      />
      <button
        className="rounded-full py-2 mt-5 bg-amber-500 font-medium text-xl text-center"
        onClick={register}
        type="button"
      >
        Registrarse
      </button>
    </form>
  );
};

export default RegisterForm;
