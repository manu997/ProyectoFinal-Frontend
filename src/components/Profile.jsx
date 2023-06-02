import useUserById from "@/hooks/useUserById";
import { useCallback, useEffect, useMemo, useState } from "react";
import Spinner from "./Spinner";
import useEditUserMutation, { editUserById } from "@/hooks/useEditUserById";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import {
  useSetUser,
  useUserContext,
} from "@/hooks/useLoginContext";

const Profile = () => {
  const userContext = useUserContext();
  const setUser = useSetUser();

  const [userData, setUserData] = useState({
    username: null,
    email: null,
    password: null,
    role: null,
  });

  const updateField = useCallback((field, data) =>
    setUserData((e) => ({ ...e, [field]: data }))
  );

  const router = useRouter();
  const userId = parseInt(router.query.id ?? "");
  const user = useUserById(userId);

  useEffect(() => {
    if (user.isFetched && user.isSuccess) {
      setUserData({
        username: user.data.user.username,
        email: user.data.user.email,
        password: null,
        role: user.data.user.role,
        birthDate: user.data.user.birthDate,
        profileUrl: user.data.user.profileUrl,
      });
    }
  }, [user.isSuccess, router.query.id]);

  const { mutateAsync: editUser } = useEditUserMutation();

  const handleEditUser = async () => {
    const data = await editUser({
      userId: user.data.user.id,
      userData: userData,
      userEtag: user.data.etag,
    });
    switch (data.status) {
      case 209:
        const { user } = await data.json();
        userContext.userId === user.id && // Si el usuario que se va a editar es el usuario logeado, cambia el nombre que aparece en el header.
          setUser(user.id, user.username, user.role);
        toast.success("¡Perfil actualizado!", {
          position: toast.POSITION.TOP_CENTER,
        });
        router.push(`/users`);
        break;
      case 400:
        toast.error("El email o el username ya existen.", {
          position: toast.POSITION.TOP_CENTER,
        });
        break;
      default:
        toast.error("Error interno", {
          position: toast.POSITION.TOP_CENTER,
        });
    }
  };

  return (
    <form className="flex flex-col w-1/3 outline outline-amber-500 p-10 rounded-xl mx-auto mt-10">
      <h1 className="text-4xl text-amber-500 pb-7 text-center font-semibold">
        {userId !== userContext.userId
          ? `Usuario ${userData.username}`
          : "Mi perfil"}
      </h1>
      {user.isFetching ? (
        <Spinner />
      ) : (
        <>
          <label htmlFor="username" className="text-amber-500 text-xl mb-2">
            Nombre de usuario:{" "}
          </label>
          <input
            type="text"
            placeholder="Nombre de usuario..."
            id="username"
            className="rounded-full pl-5 mb-3 py-2 text-xl"
            onChange={(e) => updateField("username", e.target.value)}
            defaultValue={userData.username}
          />
          <label htmlFor="email" className="text-amber-500 text-xl mb-2">
            Email:{" "}
          </label>
          <input
            type="email"
            placeholder="Email..."
            className="rounded-full pl-5 mb-3 py-2 text-xl"
            onChange={(e) => updateField("email", e.target.value)}
            defaultValue={userData.email}
          />
          <label htmlFor="password" className="text-amber-500 text-xl mb-2">
            Nueva contraseña:{" "}
          </label>
          <input
            placeholder="Contraseña..."
            type="password"
            className="rounded-full pl-5 mb-3 py-2 text-xl"
            onChange={(e) => updateField("password", e.target.value)}
          />
          {userId !== userContext.userId &&
            userContext.role === "WRITER" && ( // Si el perfil no es el que está logeado y el usuario logeado es WRITER...
              <>
                <label htmlFor="role" className="text-amber-500 text-xl mb-2">
                  Rol:{" "}
                </label>
                <select
                  className="rounded-full pl-5 mb-3 py-2 text-xl"
                  onChange={(e) => updateField("role", e.target.value)}
                  value={userData.role}
                >
                  <option value={"WRITER"}>WRITER</option>
                  <option value={"READER"}>READER</option>
                  <option value={"INACTIVE"}>INACTIVE</option>
                </select>
              </>
            )}
          <label htmlFor="birthDate" className="text-amber-500 text-xl mb-2">
            Fecha de nacimiento:{" "}
          </label>
          <input
            type="date"
            placeholder="Nombre de usuario..."
            id="birthDate"
            className="rounded-full pl-5 mb-3 p-2 text-xl"
            onChange={(e) => updateField("birthDate", e.target.value)}
            defaultValue={userData.birthDate}
          />

          <label htmlFor="profileUrl" className="text-amber-500 text-xl mb-2">
            URL del perfil:{" "}
          </label>
          <input
            type="text"
            placeholder="URL del perfil..."
            id="profileUrl"
            className="rounded-full pl-5 mb-3 py-2 text-xl"
            onChange={(e) => updateField("profileUrl", e.target.value)}
            defaultValue={userData.profileUrl}
          />
          <button
            className={`rounded-full py-2 mt-5 bg-amber-500 font-medium text-xl text-center `}
            onClick={handleEditUser}
            type="button"
          >
            Editar
          </button>
        </>
      )}
    </form>
  );
};

export default Profile;
