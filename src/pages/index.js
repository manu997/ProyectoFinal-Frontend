import RegisterForm from "@/components/RegisterForm/RegisterForm";
import LoginForm from "@/components/LoginForm";
import React from "react";

const Index = () => {
  return (
    <>
      <h1 className="text-5xl text-center text-amber-500 font-bold mt-5">
        Bienvenido a la web de Anales de la Ciencia
      </h1>
      <p className="text-2xl text-center text-amber-500 font-medium mt-10">
        Para continuar, por favor, inicia sesión o crea una nueva cuenta.
      </p>
      <div className="flex flex-row justify-center sm:space-x-20 mt-10 max-sm:flex-col max-sm:w-11/12 max-sm:mx-auto">
        <LoginForm />
        <RegisterForm />
      </div>
    </>
  );
};

export default Index;
