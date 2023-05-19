import List from "@/components/List";
import Header from "@/components/Header";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import useUsers from "@/hooks/useUsers";
import useLogin from "@/hooks/useLoginContext";
import React from "react";

const Home = () => {
  const [cookies, setCookie] = useCookies(["userKey", "userId", "userRole"]);

  const router = useRouter();

  const users = useUsers(cookies.userKey);

  const user = useLogin((state) => state.user);
  const setUserByUsername = useLogin((state) => state.setUserByUsername);

  useEffect(() => {
    if (!cookies.userKey) {
      router.push("/"); //Si no has iniciado sesión, vas a "/"
    } else {
      // Necesito obtener los datos del usuario que ha iniciado sesión, a partir de su username, para crear cookies
      if (!users.isFetching) {
        const allUsers = users.data.users;
        const userLogged = allUsers.find((item) => {
          if (item.user.username == user.username) {
            setUserByUsername(item.user.id, user.username, item.user.role);
            setCookie("userId", item.user.id);
            setCookie("userRole", item.user.role);
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
