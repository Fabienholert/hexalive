import { create } from "zustand";

const useProfileStore = create((set) => ({
  profiles: [],
  addProfile: (profile) =>
    set((state) => ({
      profiles: [...state.profiles, profile],
    })),
  getProfiles: () => useProfileStore.getState().profiles,
}));

export default useProfileStore;
