import Header from "@/components/Header";
import { useCookies } from "react-cookie";
import useUsers from "@/hooks/useUsers";
import Spinner from "@/components/Spinner";
import useDeleteByIdAndType from "@/hooks/useDeleteByIdAndType";
import React, { useCallback, useState } from "react";
import UsersLayout from "@/components/UsersLayout";
import { toast } from "react-toastify";
import { editUserById } from "@/hooks/editUserById";
import useUserById from "@/hooks/useUserById";

const Users = () => {
  const [cookies] = useCookies();
  const [userToActivateId, setUsertoActivateId] = useState(0);

  const users = useUsers(cookies.userKey);

  const deleteMutation = useDeleteByIdAndType();
  const activateUserMutation = editUserById();

  const getUserEtag = useUserById(cookies.userKey, userToActivateId);

  const deleteElement = (id) => {
    deleteMutation
      .mutateAsync({ id: id, key: cookies.userKey, type: "users" })
      .then(() => {
        users.refetch();
      });
  };

  const getInactiveUsers = useCallback(() => {
    return users.data.users.filter((item) => item.user.role === "INACTIVE");
  }, [users.data]);

  const getActiveUsers = useCallback(() => {
    return users.data.users.filter((item) => item.user.role !== "INACTIVE");
  }, [users.data]);

  const activateUser = (user) => {
    setUsertoActivateId(user.id);
    getUserEtag.refetch().then((res) => {
      activateUserMutation
        .mutateAsync({
          userId: user.id,
          userData: { ...user, role: "READER" },
          accessKey: cookies.userKey,
          userEtag: res.data.etag,
        })
        .then((res) => {
          if (res.status === 209) {
            toast.success("¡Usuario autorizado!");
            users.refetch();
          } else {
            toast.error("No se ha podido autorizar al usuario.");
          }
        })
        .catch((err) => console.log(err));
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
                data={getActiveUsers()}
                areInactives={false}
                deleteFunction={deleteElement}
              />
            </div>
          </>
        )}
        <h1 className="text-4xl text-center text-amber-500 my-12">
          Usuarios inactivos
        </h1>
        <div>
          <UsersLayout
            data={getInactiveUsers()}
            areInactives={true}
            activationFunction={activateUser}
          />
        </div>
      </div>
    </>
  );
};

export default Users;
