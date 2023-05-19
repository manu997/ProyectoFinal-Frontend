import { useQuery } from "@tanstack/react-query";

const getUserById = async (key, id) => {
  const query = await fetch(`http://127.0.0.1:8000/api/v1/users/${id}`, {
    method: "GET",
    mode: "cors",
    headers: {
      Authorization: key,
      Accept: "application/json",
    },
  })
  const data = await query.json();
  const etag = query.headers.get("etag");
  return { ...data, etag };
};

export default function useUserById(key, id) {
  return useQuery(["getUserById"], () => getUserById(key, id));
}
