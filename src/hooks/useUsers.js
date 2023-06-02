import { useQuery } from "@tanstack/react-query";
import { useAccessKey } from "./useLoginContext";

export const USERS_QUERY_KEY = "users";

const getUsers = async (key) => {
  const user = await fetch(
    `${process.env.NEXT_PUBLIC_PHP_BACKEND}/api/v1/users`,
    {
      headers: {
        Authorization: key,
      },
    }
  ).then((users) => users.json());
  return user;
};

export default function useUsersQuery() {
  const accessKey = useAccessKey()
  return useQuery([USERS_QUERY_KEY], () => getUsers(accessKey));
}
