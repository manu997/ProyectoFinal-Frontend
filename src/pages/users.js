import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
import useDeleteElementMutation from "@/hooks/useDeleteByIdAndType";
import React, { useMemo } from "react";
import UsersLayout from "@/components/UsersLayout";
import { toast } from "react-toastify";
import useEditUserMutation from "@/hooks/useEditUserById";
import { useGetUserById } from "@/hooks/useUserById";
import useUsersQuery, { USERS_QUERY_KEY } from "@/hooks/useUsers";

const Users = () => {
  const usersQuery = useUsersQuery();

  const { mutateAsync: deleteElement } = useDeleteElementMutation([USERS_QUERY_KEY]);
  const { mutateAsync: editUser } = useEditUserMutation();

  const getUserById = useGetUserById();

  const handleDeleteElement = (id) => deleteElement({ id, type: "user" });

  const activateUser = async (user) => {
    try {
      const { etag } = await getUserById(user.id);
      const res = await editUser({
        userId: user.id,
        userData: { ...user, role: "READER" },
        userEtag: etag,
      });
      if (res.status === 209) toast.success("¡Usuario autorizado!");
      else toast.error("No se ha podido autorizar al usuario.");
    } catch (err) {
      console.log(err);
    }
  };

  const activeUsers = useMemo(() => {
    return usersQuery.data?.users.filter(
      (item) => item.user.role !== "INACTIVE"
    );
  }, [usersQuery]);

  const inactiveUsers = useMemo(() => {
    return usersQuery.data?.users.filter(
      (item) => item.user.role === "INACTIVE"
    );
  }, [usersQuery]);

  return (
    <>
      <Header />
      <div className="w-2/3 mx-auto">
        {usersQuery.isFetching ? (
          <Spinner />
        ) : (
          <>
            <h1 className="text-4xl text-center text-amber-500 my-12">
              Usuarios registrados
            </h1>
            <div>
              <UsersLayout
                data={activeUsers}
                areInactives={false}
                deleteFunction={handleDeleteElement}
              />
            </div>
          </>
        )}
        <h1 className="text-4xl text-center text-amber-500 my-12">
          Usuarios inactivos
        </h1>
        <div>
          <UsersLayout
            data={inactiveUsers}
            areInactives={true}
            activationFunction={activateUser}
          />
        </div>
      </div>
    </>
  );
};

export default Users;
