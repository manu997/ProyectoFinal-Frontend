import { useQuery } from "@tanstack/react-query";

const getElementsByType = async (key, type) => {
  const elements = await fetch(`${process.env.NEXT_PUBLIC_PHP_BACKEND}/api/v1/${type}`, {
    method: "GET",
    mode: "cors",
    headers: {
      Authorization: key,
    },
  }).then((data) => data.json());
  return elements;
};

export default function useElementsByType(key, type) {
  return useQuery(["elementsByType", [type]], () =>
    getElementsByType(key, type)
  );
}
