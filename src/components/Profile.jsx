import useUserById from "@/hooks/useUserById";
import { useEffect, useMemo, useState } from "react";
import Spinner from "./Spinner";
import { editUserById } from "@/hooks/editUserById";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import useLoginContext from "@/hooks/useLoginContext";

const Profile = ({ userId }) => {
  const accessKey = useLoginContext((state) => state.accessKey);

  const userContext = useLoginContext((state) => state.user);
  const setUsernameContext = useLoginContext(
    (state) => state.setUserByUsername
  );

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [, setUserIdFromQuery] = useState();

  const buttonDisable = useMemo(
    () => Object.values(userData).every((value) => value == ""),
    [userData] // Compruebo que todos los campos están rellenos
  );

  const user = useUserById(accessKey, userId);

  const router = useRouter();

  useEffect(() => {
    if (!user.isFetching) {
      setUserIdFromQuery(user.data.user.userId);
      setUserData({
        username: user.data.user.username,
        email: user.data.user.email,
        password: "",
        role: user.data.user.role,
        birthDate: user.data.user.birthDate,
        profileUrl: user.data.user.profileUrl,
      });
    }
  }, [user.isFetching, userId]);

  const { mutateAsync } = editUserById();

  const editUser = () => {
    mutateAsync({
      userId: user.data.user.id,
      userData: userData,
      accessKey: accessKey,
      userEtag: user.data.etag,
    }).then(async (data) => {
      const dataJson = await data.json()
      userContext.userId === dataJson.user.id && // Si el usuario que se va a editar es el usuario logeado, cambia el nombre que aparece en el header.
        setUsernameContext(
          dataJson.user.id,
          dataJson.user.username,
          dataJson.user.role,
        );
      toast.success("¡Perfil actualizado!", {
        position: toast.POSITION.TOP_CENTER,
      });
      router.push(`/users`);
    });
  };

  return (
    <form className="flex flex-col w-1/3 outline outline-amber-500 p-10 rounded-xl mx-auto mt-10">
      <h1 className="text-4xl text-amber-500 pb-7 text-center font-semibold">
        {userId != userContext.userId
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
            onChange={(e) => (userData.username = e.target.value)}
            defaultValue={userData.username}
          />
          <label htmlFor="email" className="text-amber-500 text-xl mb-2">
            Email:{" "}
          </label>
          <input
            type="email"
            placeholder="Email..."
            className="rounded-full pl-5 mb-3 py-2 text-xl"
            onChange={(e) => (userData.email = e.target.value)}
            defaultValue={userData.email}
          />
          <label htmlFor="password" className="text-amber-500 text-xl mb-2">
            Nueva contraseña:{" "}
          </label>
          <input
            placeholder="Contraseña..."
            type="password"
            className="rounded-full pl-5 mb-3 py-2 text-xl"
            onChange={(e) => (userData.password = e.target.value)}
          />
          {userId != userContext.userId &&
            userContext.role == "WRITER" && ( // Si el perfil no es el que está logeado y el usuario logeado es WRITER...
              <>
                <label htmlFor="role" className="text-amber-500 text-xl mb-2">
                  Rol:{" "}
                </label>
                <select
                  className="rounded-full pl-5 mb-3 py-2 text-xl"
                  onChange={(e) =>
                    setUserData({ ...userData, role: e.target.value })
                  }
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
            onChange={(e) => (userData.birthDate = e.target.value)}
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
            onChange={(e) => (userData.profileUrl = e.target.value)}
            defaultValue={userData.profileUrl}
          />
          <button
            className={`rounded-full py-2 mt-5 bg-amber-500 font-medium text-xl text-center ${
              buttonDisable && "bg-amber-300 text-neutral-500"
            }`}
            onClick={editUser}
            type="button"
            disabled={buttonDisable}
          >
            Editar
          </button>
        </>
      )}
    </form>
  );
};

export default Profile;
