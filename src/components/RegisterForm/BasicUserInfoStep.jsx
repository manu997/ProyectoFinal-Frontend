import useCheckUsername from "@/hooks/useCheckUsername";
import { useRegisterUserForm } from "@/hooks/useRegisterUserForm";
import { useCallback, useMemo, useState } from "react";
import { useWizard } from "react-use-wizard";

const BasicUserInfoStep = () => {
  const { nextStep } = useWizard();

  const { register, state } = useRegisterUserForm();
  const { errors, touched } = state;

  const usernameExists = useCheckUsername(state.values.username);

  const [usernameExistsMessageVisibility, setUsernameExistsMessageVisibility] =
    useState(false);

  const doNextStep = () => {
    setUsernameExistsMessageVisibility(false)
    const username = state.values.username;
    if (username.length > 0) {
      usernameExists.refetch({ username: username }).then((res) => {
        res.data == 204 ? setUsernameExistsMessageVisibility(true) : nextStep();
      });
    } else {
      setUsernameExistsMessageVisibility(true);
    }
  };
  return (
    <>
      <label htmlFor="username" className="text-amber-500 text-xl mb-2">
        Nombre de usuario:{" "}
      </label>
      <input
        type="text"
        placeholder="Nombre de usuario..."
        id="username"
        className="rounded-full pl-5 mb-3 py-2 text-xl"
        {...register("username")}
      />
      {touched.username && (
        <p className="font-medium text-red-500 ml-1 mb-3">{errors.username}</p>
      )}
      {usernameExistsMessageVisibility && (
        <p className="font-medium text-red-500 ml-1 mb-3">
          El nombre de usuario no es válido.
        </p>
      )}
      <label htmlFor="password" className="text-amber-500 text-xl mb-2">
        Nueva contraseña:{" "}
      </label>
      <input
        placeholder="Contraseña..."
        type="password"
        className="rounded-full pl-5 mb-3 py-2 text-xl"
        {...register("password")}
      />
      {touched.password && (
        <p className="font-medium text-red-500 ml-1 mb-3">{errors.password}</p>
      )}
      <button
        className="rounded-full py-2 mt-5 bg-amber-500 font-medium text-xl text-center px-10"
        onClick={doNextStep}
        type="button"
      >
        Siguiente
      </button>
    </>
  );
};

export default BasicUserInfoStep;
