import { useMutation } from "@tanstack/react-query";

export default function useRelateItems() {
  return useMutation(["relateItems"], {
    mutationFn: async ({
      idToRelate,
      actualItemType,
      itemTypeToRelate,
      itemIdToRelate,
      operation,
      key,
    }) => {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_PHP_BACKEND}/api/v1/${actualItemType}/${idToRelate}/${itemTypeToRelate}/${operation}/${itemIdToRelate}`,
        {
          method: "PUT",
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
