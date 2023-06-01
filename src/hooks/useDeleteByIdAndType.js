import { typePage } from "@/components/List";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteByIdAndType() {
  return useMutation(["deleteElement"], {
    mutationFn: async ({ id, type, key }) => {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_PHP_BACKEND}/api/v1/${typePage(type)}/${id}`,
        {
          method: "DELETE",
          mode: "cors",
          headers: {
            Authorization: key,
          },
        }
      );
      return result;
    },
    onSuccess: (res) => console.log(res),
    onError: (err) => console.log(err),
  });
}
