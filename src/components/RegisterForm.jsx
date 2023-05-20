import { useState } from "react";
import { useCookies } from "react-cookie";
import React from "react";
import { v4 } from "uuid";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "reader",
  });

  const [cookies, setCookie] = useCookies();

  const register = () => {
    setCookie(
      `usuario-inactivo-${v4()}`,
      JSON.stringify({ user: { ...user } })
    );
    toast.success("Registro exitoso. Espera a que un WRITER te autorice.");
    setUser({
      username: "",
      email: "",
      password: "",
      role: "reader",
    });
  };

  return (
    <form className="flex flex-col sm:w-1/3 max-sm:w-full max-sm:my-5 outline outline-amber-500 p-10 rounded-xl">
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
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        value={user.username}
      />
      <label htmlFor="email" className="text-amber-500 text-xl mb-2">
        Email:{" "}
      </label>
      <input
        type="email"
        placeholder="Email..."
        className="rounded-full pl-5 mb-3 py-2 text-xl"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        value={user.email}
      />
      <label htmlFor="password" className="text-amber-500 text-xl mb-2">
        Nueva contraseña:{" "}
      </label>
      <input
        placeholder="Contraseña..."
        type="password"
        className="rounded-full pl-5 mb-3 py-2 text-xl"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        value={user.password}
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
