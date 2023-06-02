import List from "@/components/List";
import Header from "@/components/Header";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useUsers from "@/hooks/useUsers";
import React from "react";
import useLoginContext from "@/hooks/useLoginContext";

const Home = () => {
  const router = useRouter();

  const accessKey = useLoginContext((state) => state.accessKey);
  const user = useLoginContext((state) => state.user);
  const setUserByUsername = useLoginContext((state) => state.setUserByUsername);

  const users = useUsers(accessKey);

  useEffect(() => {
    if (!accessKey || user.role == "INACTIVE") {
      router.push("/"); //Si no has iniciado sesión o eres usuario inactivo, vas a "/"
    } else {
      // Necesito obtener los datos del usuario que ha iniciado sesión, a partir de su username
      if (!users.isFetching) {
        const allUsers = users.data.users;
        const userLogged = allUsers.find((item) => {
          if (item.user.username == user.username) {
            setUserByUsername(item.user.id, user.username, item.user.role);
          }
        });
        return userLogged;
      }
    }
  }, [users.isFetching]);

  return (
    <>
      <Header />
      <div className="flex flex-row gap-x-32 mt-10 justify-center">
        <List type="product" />
        <List type="person" />
        <List type="entity" />
      </div>
    </>
  );
};

export default Home;
