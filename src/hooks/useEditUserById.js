import { useMutation } from "@tanstack/react-query";

export function editUserById() {
  return useMutation(["editProfile"], {
    mutationFn: async ({ userId, userData, accessKey, userEtag }) => {
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
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      console.error(err);
    },
  });
}
