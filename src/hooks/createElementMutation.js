import { typePage } from "@/components/List";
import { useMutation } from "@tanstack/react-query";

export default function useCreateElement() {
  return useMutation(["createElement"], {
    mutationFn: async ({ element, type, key }) => {
      const result = await fetch(
        `http://127.0.0.1:8000/api/v1/${typePage(type)}`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            Authorization: key,
            "Content-type": "application/json",
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
