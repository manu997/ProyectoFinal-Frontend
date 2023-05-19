import Header from "@/components/Header";
import { useCookies } from "react-cookie";
import useUsers from "@/hooks/useUsers";
import Spinner from "@/components/Spinner";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import useDeleteByIdAndType from "@/hooks/useDeleteByIdAndType";
import Link from "next/link";
import React from "react";

const Users = () => {
  const [cookies, setCookie] = useCookies(["userKey", "userId", "userRole"]);

  const users = useUsers(cookies.userKey);

  const deleteMutation = useDeleteByIdAndType();

  const deleteElement = (id) => {
    deleteMutation
      .mutateAsync({ id: id, key: cookies.userKey, type: "users" })
      .then(() => {
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
              {users.data.users.map((item) => {
                return (
                  item.user.id != cookies.userId && ( // No muestra el usuario logeado ya que sus datos están en "Mi perfil"
                    <div className="flex flex-row mb-5">
                      <div className="flex flex-row justify-around gap-10 bg-amber-500 rounded-xl items-center px-7 text-xl w-full text-center">
                        <p>{item.user.username}</p>
                        <p>{item.user.email}</p>
                        <p>{item.user.role}</p>
                      </div>
                      <TrashIcon
                        className="w-10 p-2 rounded-full bg-amber-500 font-medium cursor-pointer text-black mx-3"
                        onClick={() => deleteElement(item.user.id)}
                      />
                      <Link
                        className="text-white underline text-3xl"
                        href={{
                          pathname: "/user/[id]",
                          query: {
                            id: item.user.id,
                          },
                        }}
                        as={`/edit/user/${item.user.id}`}
                      >
                        <PencilSquareIcon className="w-10 p-2 rounded-full bg-amber-500 font-medium cursor-pointer text-black" />
                      </Link>
                    </div>
                  )
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Users;
