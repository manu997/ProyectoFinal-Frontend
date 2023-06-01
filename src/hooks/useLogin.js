import { useMutation } from "@tanstack/react-query";

export default function useLogin() {
  return useMutation(["login"], {
    mutationFn: async (credentials) => {
      const result = await fetch(`${process.env.NEXT_PUBLIC_PHP_BACKEND}/access_token`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(Object.entries(credentials)).toString(),
      });
      return result;
    },
    onSuccess: (res) => console.log(res),
    onError: (err) => console.log(err),
  });
}
