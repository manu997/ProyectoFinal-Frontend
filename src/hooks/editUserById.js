import { useMutation } from "@tanstack/react-query";

export function editUserById() {
  return useMutation(["editProfile"], {
    mutationFn: async ({ userId, userData, accessKey, userEtag }) => {
      const result = await fetch(
        `http://127.0.0.1:8000/api/v1/users/${userId}`,
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
