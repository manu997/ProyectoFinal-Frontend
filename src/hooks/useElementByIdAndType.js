import { useQuery } from "@tanstack/react-query";

const getElementById = async (key, id, type) => {
  const query = await fetch(`${process.env.NEXT_PUBLIC_PHP_BACKEND}/api/v1/${type}/${id}`, {
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

export default function useElementByIdAndType(key, id, type) {
  return useQuery(["getElementById"], () => getElementById(key, id, type));
}
