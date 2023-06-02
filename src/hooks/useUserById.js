import { useQuery } from "@tanstack/react-query";
import { useAccessKey } from "./useLoginContext";
import { useCallback } from "react";

export const USER_QUERY_KEY = "user";

const getUserById = async (key, id) => {
  const query = await fetch(
    `${process.env.NEXT_PUBLIC_PHP_BACKEND}/api/v1/users/${id}`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: key,
        Accept: "application/json",
      },
    }
  );
  const data = await query.json();
  const etag = query.headers.get("etag");
  return { ...data, etag };
};

export default function useUserById(id) {
  const accessKey = useAccessKey();
  return useQuery([USER_QUERY_KEY, id], () => getUserById(accessKey, id), {
    enabled: id !== undefined,
  });
}

export function useGetUserById() {
  const accessKey = useAccessKey();
  const getUser = useCallback(
    async (id) => await getUserById(accessKey, id),
    [accessKey]
  );
  return getUser;
}
