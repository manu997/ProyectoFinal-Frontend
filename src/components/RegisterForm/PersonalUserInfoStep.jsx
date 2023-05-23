import { useRegisterUserForm } from "@/hooks/useRegisterUserForm";
import { useWizard } from "react-use-wizard";

const PersonalUserInfoStep = () => {
  const { previousStep } = useWizard();
  const { register, state } = useRegisterUserForm();
  const { errors, touched } = state;

  return (
    <>
      <label htmlFor="email" className="text-amber-500 text-xl mb-2">
        Email:{" "}
      </label>
      <input
        type="email"
        placeholder="Email..."
        className="rounded-full pl-5 mb-3 py-2 text-xl"
        {...register("email")}
      />
      {touched.email && (
        <p className="font-medium text-red-500 ml-1 mb-3">{errors.email}</p>
      )}
      <label htmlFor="birthDate" className="text-amber-500 text-xl mb-2">
        Fecha de nacimiento:{" "}
      </label>
      <input
        type="date"
        className="rounded-full pl-5 mb-3 py-2 text-xl pr-3"
        {...register("birthDate")}
      />
      {touched.birthDate && (
        <p className="font-medium text-red-500 ml-1 mb-3">{errors.birthDate}</p>
      )}
      <label htmlFor="email" className="text-amber-500 text-xl mb-2">
        URL del perfil:{" "}
      </label>
      <input
        type="url"
        placeholder="URL del perfil..."
        className="rounded-full pl-5 mb-3 py-2 text-xl"
        {...register("profileUrl")}
      />
      <div className="flex flex-row gap-10 justify-center">
        <button
          className="rounded-full py-2 mt-5 bg-amber-500 font-medium text-xl text-center px-10"
          onClick={previousStep}
        >
          Atrás
        </button>
        <button
          className="rounded-full py-2 mt-5 bg-amber-500 font-medium text-xl text-center px-10"
          type="submit"
        >
          Registrarse
        </button>
      </div>
    </>
  );
};

export default PersonalUserInfoStep;
