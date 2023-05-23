import { useQuery } from "@tanstack/react-query";

const checkUsername = async ({username}) => {
  const usernameExists = await fetch(
    `http://127.0.0.1:8000/api/v1/users/username/${username}`,
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
