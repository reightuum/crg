import { create } from "zustand";
import { fetchTimelineData } from "../api/timelineApi.js";

const useTimelineStore = create((set) => ({
    timeline: [],
    about: "",
    background: null,
    loading: true,
    error: null,

    fetchTimeline: async () => {
        set({ loading: true, error: null });
        try {
            const data = await fetchTimelineData();
            set({
                timeline: data.Timeline || [],
                about: data.Body?.[0]?.About || "",
                background: data.Body?.[0]?.Background || null,
                loading: false,
            });
        } catch (error) {
            set({ error: "Failed to load data.", loading: false });
        }
    },
}));

export default useTimelineStore;
