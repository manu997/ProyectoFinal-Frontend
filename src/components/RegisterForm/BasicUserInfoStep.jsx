import useCheckUsername from "@/hooks/useCheckUsername";
import { useRegisterUserForm } from "@/hooks/useRegisterUserForm";
import { useState } from "react";
import { useWizard } from "react-use-wizard";
import Spinner from "../Spinner";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

const BasicUserInfoStep = () => {
  const { nextStep } = useWizard();

  const { register, state: { errors, touched, values } } = useRegisterUserForm();

  const usernameToCheck = useCheckUsername(values.username);

  const [usernameExists, setUsernameExists] = useState(true);
  const [usernameExistsMessageVisibility, setUsernameExistsMessageVisibility] =
    useState(false);

  const doNextStep = () => {
    setUsernameExists(false);
    const username = values.username;
    if (username.length > 0) {
      usernameToCheck.refetch({ username: username }).then((res) => {
        res.data == 204 ? nextStep() : setUsernameExists(true);
      });
    } else {
      setUsernameExists(true);
    }
  };

  const checkUsername = () => {
    if (values.username.length > 0) {
      setUsernameExistsMessageVisibility(true);
      usernameToCheck
        .refetch({ username: values.username })
        .then((res) => setUsernameExists(res.data !== 204));
    } else {
      setUsernameExistsMessageVisibility(false);
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
        onKeyUp={() => checkUsername()}
        {...register("username")}
      />
      {errors.username && (
        <span className="font-medium text-red-500 ml-1 mb-3">
          {errors.username}
        </span>
      )}
      {usernameExistsMessageVisibility &&
        (usernameToCheck.isFetching ? (
          <Spinner />
        ) : usernameExists ? (
          <div className="flex flex-row gap-1">
            <XCircleIcon className="text-red-500 w-5 h-6" />
            <p className="font-medium text-red-500 ml-1 mb-3">
              El nombre de usuario ya existe.
            </p>
          </div>
        ) : (
          <div className="flex flex-row">
            <CheckCircleIcon className="w-5 h-6 text-green-500" />
            <p className="font-medium text-green-500 ml-1 mb-3">
              El nombre de usuario está disponible.
            </p>
          </div>
        ))}
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
