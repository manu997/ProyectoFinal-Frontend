import { create } from "zustand";

const useLoginContext = create((set) => ({
  user: { userId: "", username: "", role: "" },
  setUserByUsername: (userId, username, role) =>
    set({ user: { userId: userId, username: username, role: role } }),
}));

export default useLoginContext;
