import { useMutation } from "@tanstack/react-query";

export default function useCreateUser() {
  return useMutation(["register"], {
    mutationFn: async (user) => {
      const result = await fetch(`${process.env.NEXT_PUBLIC_PHP_BACKEND}/api/v1/users`, {
        method: "POST",
        mode: "cors",
        headers: {
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
