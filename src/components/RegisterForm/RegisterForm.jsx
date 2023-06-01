import React from "react";
import { toast } from "react-toastify";
import { Wizard } from "react-use-wizard";
import BasicUserInfoStep from "./BasicUserInfoStep";
import PersonalUserInfoStep from "./PersonalUserInfoStep";
import { useRegisterUserForm } from "@/hooks/useRegisterUserForm";
import useCreateUser from "@/hooks/useCreateUserMutation";

const RegisterForm = () => {
  const { state, handleSubmit } = useRegisterUserForm();

  const { mutateAsync } = useCreateUser();

  const register = () => {
    if (state.isValid) {
      mutateAsync({ ...state.values })
        .then(() => {
          toast.success(
            "Registro exitoso. Espera a que un WRITER te autorice."
          );
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <form
      className="flex flex-col sm:w-1/3 max-sm:w-full max-sm:my-5 outline outline-amber-500 p-10 rounded-xl"
      onSubmit={handleSubmit(register)}
    >
      <h1 className="text-4xl text-amber-500 pb-7 text-center font-semibold">
        Registrarse
      </h1>
      <Wizard>
        <BasicUserInfoStep />
        <PersonalUserInfoStep />
      </Wizard>
    </form>
  );
};

export default RegisterForm;
