import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAccessKey } from "./useLoginContext";
import { USERS_QUERY_KEY } from "./useUsers";
import { USER_QUERY_KEY } from "./useUserById";

export default function useEditUserMutation() {
  const accessKey = useAccessKey();
  const queryClient = useQueryClient();

  return useMutation(["editProfile"], {
    mutationFn: async ({ userId, userData, userEtag }) => {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_PHP_BACKEND}/api/v1/users/${userId}`,
        {
          method: "PUT",
          mode: "cors",
          headers: {
            Authorization: accessKey,
            "Content-type": "application/json",
            "If-Match": userEtag,
          },
          body: JSON.stringify(userData),
        }
      );
      return result;
    },
    onSuccess: (res, vars) => {
      console.log(res);
      queryClient.invalidateQueries([USERS_QUERY_KEY]);
      // debugger
      queryClient.invalidateQueries([USER_QUERY_KEY, vars.userId]);
    },
    onError: (err) => {
      console.error(err);
    },
  });
}
