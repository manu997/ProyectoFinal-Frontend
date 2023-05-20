import { useMutation } from "@tanstack/react-query";

export default function useCreateUser() {
  return useMutation(["register"], {
    mutationFn: async ({ user, key }) => {
      const result = await fetch("http://127.0.0.1:8000/api/v1/users", {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: key,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      return result;
    },
    onSuccess: (res) => console.error(res),
    onError: (err) => console.error(err),
  });
}
