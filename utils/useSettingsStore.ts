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
  settings: SettingsData;
  fetchSettings: () => Promise<void>;
  updateSetting: (key: string, value: any) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: {
    id: 0,
    project_name: "",
    university_name: "",
    logo: "",
    banner: "",
    description: "",
    color: [],
    contact_us: [{ email: "" }],
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
    }
  },

  updateSetting: (key, value) =>
    set((state) => ({
      settings: { ...state.settings, [key]: value },
    })),
}));
