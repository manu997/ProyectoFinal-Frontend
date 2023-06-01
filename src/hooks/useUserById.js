import { useQuery } from "@tanstack/react-query";

const getUserById = async (key, id) => {
  const query = await fetch(`${process.env.NEXT_PUBLIC_PHP_BACKEND}/api/v1/users/${id}`, {
    method: "GET",
    mode: "cors",
    headers: {
      Authorization: key,
      Accept: "application/json",
    },
  });
  const data = await query.json();
  const etag = query.headers.get("etag");
  return { ...data, etag };
};

export default function useUserById(key, id) {
  return useQuery(["getUserById", id], () => getUserById(key, id), {
    enabled: id !== 0,
  });
}
