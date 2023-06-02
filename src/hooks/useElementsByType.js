import { useQuery } from "@tanstack/react-query";
import { useAccessKey } from "./useLoginContext";

export const ELEMENTS_BY_TYPE_QUERY_KEY = "elementsByType"

const getElementsByType = async (key, type) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_PHP_BACKEND}/api/v1/${type}`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: key,
      },
    }
  );
  const elements = await data.json();
  return elements;
};

export default function useElementsByTypeQuery(type) {
  const accessKey = useAccessKey();
  return useQuery([ELEMENTS_BY_TYPE_QUERY_KEY, [type]], () =>
    getElementsByType(accessKey, type)
  );
}
