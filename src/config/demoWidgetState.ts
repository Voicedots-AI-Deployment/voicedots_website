import { create } from "zustand";

interface DemoWidgetState {
  /* UI */
  open: boolean;
  minimized: boolean;
  industry?: string;
  setIndustry: (industry: string) => void;

  /* UI actions */
  openWidget: (industry: string) => void;
  closeWidget: () => void;
  minimizeWidget: () => void;
  expandWidget: () => void;
}

export const useDemoWidget = create<DemoWidgetState>((set) => ({
  open: true,
  minimized: false,
  industry: "Voicedots",

  openWidget: (industry) =>
    set({
      open: true,
      minimized: false,
      industry,
    }),
  
  setIndustry: (industry: string) =>
    set({
      industry: industry,
    }),

  minimizeWidget: () =>
    set({
      minimized: true,
    }),

  expandWidget: () =>
    set({
      minimized: false,
      open: true,
    }),

  closeWidget: () =>
    set({
      open: false,
      minimized: false,
      industry: undefined,
    }),
}));
