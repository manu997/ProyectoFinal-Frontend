import { typePage } from "@/components/List";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAccessKey } from "./useLoginContext";

export default function useDeleteElementMutation(queriesToBeInvalidated = undefined) {
  const accessKey = useAccessKey();
  const queryClient = useQueryClient();
  return useMutation(["deleteElement"], {
    mutationFn: async ({ id, type }) => {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_PHP_BACKEND}/api/v1/${typePage(type)}/${id}`,
        {
          method: "DELETE",
          mode: "cors",
          headers: {
            Authorization: accessKey,
          },
        }
      );
      return result;
    },
    onSuccess: (res) => {
      console.log(res);
      if(queriesToBeInvalidated) queryClient.invalidateQueries(queriesToBeInvalidated);
    },
    onError: (err) => console.log(err),
  });
}
