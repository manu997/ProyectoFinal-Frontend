import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useLoginContext = create(
  persist(
    (set) => ({
      user: { userId: "", username: "", role: "" },
      accessKey: "",
      setUserByUsername: (userId, username, role) =>
        set({ user: { userId: userId, username: username, role: role } }),
      setAccessKey: (key) => set({ accessKey: key }),
    }),
    {
      name: "login-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useLoginContext;
