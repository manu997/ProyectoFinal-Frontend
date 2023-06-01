import { useQuery } from "@tanstack/react-query";

const getUsers = async (key) => {
  const user = await fetch(`${process.env.NEXT_PUBLIC_PHP_BACKEND}/api/v1/users`, {
    headers: {
      Authorization: key,
    },
  }).then((users) => users.json());
  return user;
};

export default function useUsers(key) {
  return useQuery(["users"], () => getUsers(key));
}
