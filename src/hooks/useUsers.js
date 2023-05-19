import { useQuery } from "@tanstack/react-query";

const getUsers = async (key) => {
  const user = await fetch(`http://127.0.0.1:8000/api/v1/users`, {
    headers: {
      Authorization: key,
    },
  }).then((users) => users.json());
  return user;
};

export default function useUsers(key) {
  return useQuery(["users"], () => getUsers(key));
}
