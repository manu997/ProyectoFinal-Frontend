import { create } from "zustand";
import { persist } from "zustand/middleware";

const useLoginContext = create(
  persist(
    (set) => ({
      user: { userId: "", username: "", role: "" },
      accessKey: "",
      setUserByUsername: (userId, username, role) =>
        set({ user: { userId, username, role } }),
      setAccessKey: (key) => set({ accessKey: key }),
    }),
    {
      name: "login-storage", // name of the item in the storage (must be unique)
    }
  )
);

export const useAccessKey = () => useLoginContext((state) => state.accessKey);
export const useSetUser = () =>
  useLoginContext((state) => state.setUserByUsername);
export const useUserContext = () => useLoginContext((state) => state.user);

export default useLoginContext;
