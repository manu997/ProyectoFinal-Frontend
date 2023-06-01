import Header from "@/components/Header";
import useUsers from "@/hooks/useUsers";
import Spinner from "@/components/Spinner";
import useDeleteByIdAndType from "@/hooks/useDeleteByIdAndType";
import React, { useCallback, useState } from "react";
import UsersLayout from "@/components/UsersLayout";
import { toast } from "react-toastify";
import { editUserById } from "@/hooks/editUserById";
import useUserById from "@/hooks/useUserById";
import useLoginContext from "@/hooks/useLoginContext";

const Users = () => {
  const accessKey = useLoginContext((state) => state.accessKey);

  const [userToActivateId, setUsertoActivateId] = useState(0);

  const users = useUsers(accessKey);

  const deleteMutation = useDeleteByIdAndType();
  const activateUserMutation = editUserById();

  const getUserEtag = useUserById(accessKey, userToActivateId);

  const deleteElement = (id) => {
    deleteMutation
      .mutateAsync({ id: id, key: accessKey, type: "users" })
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
          accessKey: accessKey,
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
