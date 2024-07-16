import { create } from "zustand";
import fetchApi from "./fetchApi";

interface SettingsData {
  id: number;
  project_name: string;
  university_name: string;
  logo: string;
  banner: string;
  description: string;
  color: string[];
  contact_us: { email: string }[];
}

interface SettingsState {
  loading: boolean;
  settings: SettingsData;
  fetchSettings: () => Promise<void>;
  updateSetting: (key: string, value: any) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  loading: true,
  settings: {
    id: 0,
    project_name: "EduClassAI",
    university_name: "University",
    logo: "/logo_default.png",
    banner: "/bg-lms.png",
    description: "University",
    color: ["#0057EE"],
    contact_us: [{ email: "contact@example.com" }],
  },

  fetchSettings: async () => {
    try {
      const data = await fetchApi("/settings", "GET");
      document.documentElement.style.setProperty(
        "--dark-blue",
        data.data.color[0]
      );

      set({ settings: data.data });
    } catch (error) {
      console.error("Failed to fetch settings", error);
    } finally {
      set({ loading: false });
    }
  },

  updateSetting: (key, value) =>
    set((state) => ({
      settings: { ...state.settings, [key]: value },
    })),
}));
