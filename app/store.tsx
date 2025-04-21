import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Detail {
  detail: string;
  includeInReceiver: boolean;
  includeInAdditional: boolean;
}

interface StoreState {
  brandLogoURL: string | null;
  csvURL: string | null;
  ordersData: Record<string, string>[];
  details: Detail[];
  labelSize: string;
  updateLabelSize: (labelSize: string) => void;
  updateBrandLogoURL: (url: string | null) => void;
  updateCSVurl: (url: string) => void;
  updateOrdersData: (orders: Record<string, string>[]) => void;
  updateDetails: (details: Detail[]) => void;
  fromDetails: string;
  updateFromDetails: (fromDetails: string) => void;
}

const initialDefaultTo = [
  "Shipping Name",
  "Shipping Street",
  "Shipping Address1",
  "Shipping Address2",
  "Shipping City",
  "Shipping Zip",
  "Shipping Province",
  "Shipping Country",
  "Shipping Phone",
];

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      brandLogoURL: null,
      csvURL: null,
      ordersData: [],
      details: [],
      fromDetails: "",
      labelSize: "4x6",

      updateLabelSize: (labelSize: string) => {
        set({
          labelSize: labelSize,
        });
      },

      updateFromDetails: (fromDetails: string) => {
        set({
          fromDetails: fromDetails,
        });
      },

      updateBrandLogoURL: (url: string | null) => set({ brandLogoURL: url }),
      updateCSVurl: (url: string) => set({ csvURL: url }),
      updateOrdersData: (orders: Record<string, string>[]) => {
        set({
          ordersData: orders,
        });

        set({
          details: Object.keys(orders[0]).map((key) => ({
            detail: key,
            includeInReceiver: initialDefaultTo.includes(key),
            includeInAdditional: false,
          })),
        });
      },
      updateDetails: (details: Detail[]) => {
        set({
          details: details,
        });
      },
    }),

    {
      name: "app-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useStore;
