import { useQuery } from "@tanstack/react-query";
import { useAccessKey } from "./useLoginContext";

const getElementById = async (key, id, type) => {
  const query = await fetch(
    `${process.env.NEXT_PUBLIC_PHP_BACKEND}/api/v1/${type}/${id}`,
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

export default function useElementByIdAndType(id, type) {
  const accessKey = useAccessKey();
  return useQuery(["getElementById", id], () => getElementById(accessKey, id, type));
}
