import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CursorStore {
  customCursorEnabled: boolean;
  toggleCustomCursor: () => void;
}

export const useCursorStore = create<CursorStore>()(
  persist(
    (set) => ({
      customCursorEnabled: true,
      toggleCustomCursor: () => set((state) => ({ customCursorEnabled: !state.customCursorEnabled })),
    }),
    {
      name: 'cursor-settings',
    }
  )
);
