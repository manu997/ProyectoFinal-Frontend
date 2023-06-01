import { useQuery } from "@tanstack/react-query";

const checkUsername = async ({username}) => {
  const usernameExists = await fetch(
    `${process.env.NEXT_PUBLIC_PHP_BACKEND}/api/v1/users/username/${username}`,
    {
      method: "GET",
    }
  )
    .then((res) => res.status)
  return usernameExists;
};

export default function useCheckUsername(username) {
  return useQuery({
    queryKey: ["checkUsername", username],
    queryFn: () => checkUsername({username: username}),
    enabled: false,
  });
}
