import Header from "@/components/Header";
import { useCookies } from "react-cookie";
import useUsers from "@/hooks/useUsers";
import Spinner from "@/components/Spinner";
import useDeleteByIdAndType from "@/hooks/useDeleteByIdAndType";
import React from "react";
import UsersLayout from "@/components/UsersLayout";
import useCreateUser from "@/hooks/createUserMutation";
import { toast } from "react-toastify";

const Users = () => {
  const [cookies, setCookie] = useCookies();

  const users = useUsers(cookies.userKey);

  const createUser = useCreateUser();

  const deleteMutation = useDeleteByIdAndType();

  const getInactiveUsers = (arr) => {
    const inactiveUsers = Object.keys(arr).filter((cookieName) =>
      cookieName.startsWith("usuario-inactivo-")
    );
    const valoresCookiesUsuariosInactivos = inactiveUsers.map(
      (cookieName) => cookies[cookieName]
    );
    return valoresCookiesUsuariosInactivos;
  };

  const deleteElement = (id) => {
    deleteMutation
      .mutateAsync({ id: id, key: cookies.userKey, type: "users" })
      .then(() => {
        users.refetch();
      });
  };

  const registerUser = (user) => {
    createUser.mutateAsync({ user: user, key: cookies.userKey }).then(() => {
      toast.success("¡Usuario autorizado!");
      users.refetch();
    });
  };

  return (
    <>
      <Header />
      <div className="w-2/3 mx-auto">
        {users.isFetching ? (
          <Spinner />
        ) : (
          <>
            <h1 className="text-4xl text-center text-amber-500 my-12">
              Usuarios registrados
            </h1>
            <div>
              <UsersLayout
                data={users.data.users}
                areInactives={false}
                deleteFunction={deleteElement}
              />
            </div>
            <h1 className="text-4xl text-center text-amber-500 my-12">
              Usuarios inactivos
            </h1>
            <div>
              <UsersLayout
                data={getInactiveUsers(cookies)}
                areInactives={true}
                registerFunction={registerUser}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Users;
