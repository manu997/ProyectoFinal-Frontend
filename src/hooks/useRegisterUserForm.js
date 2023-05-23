import { createForm } from "@createform/react";
import { object, string, date } from "yup";

const validationSchema = object().shape({
  username: string().required("El nombre de usuario es obligatorio."),
  email: string()
    .email("No tiene un formato de email válido.")
    .required("El email es obligatorio."),
  password: string().required("La contraseña es obligatoria."),
  birthDate: date("La fecha no tiene un formato adecuado."),
});

export const useRegisterUserForm = createForm({
  initialValues: {
    username: "",
    email: "",
    password: "",
    role: "READER",
    birthDate: "",
    profileUrl: "",
  },
  validationSchema,
  mode: "onChange",
});
