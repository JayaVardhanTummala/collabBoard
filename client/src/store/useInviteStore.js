import { create } from "zustand";
import apiService from "../utils/apiService";

const useInviteStore = create((set) => ({
  invites: [],

  fetchInvites: async () => {
    try {
      const data = await apiService.getInvites();
      set({ invites: data || [] });
    } catch (err) {
      console.error("Error fetching invites:", err);
    }
  },

  removeInvite: (id) =>
    set((state) => ({
      invites: state.invites.filter((i) => i._id !== id),
    })),
}));

export default useInviteStore;