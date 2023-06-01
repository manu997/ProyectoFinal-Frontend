import { typePage } from "@/components/List";
import { useMutation } from "@tanstack/react-query";

export default function useEditElement() {
  return useMutation(["editElement"], {
    mutationFn: async ({ id, etag, type, key, element }) => {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_PHP_BACKEND}/api/v1/${typePage(type)}/${id}`,
        {
          method: "PUT",
          mode: "cors",
          headers: {
            Authorization: key,
            "Content-type": "application/json",
            "If-Match": etag,
          },
          body: JSON.stringify(element),
        }
      );
      return result;
    },
    onSuccess: (res) => console.log(res),
    onError: (err) => console.log(err),
  });
}
