import create from "zustand";

const useConsentStore = create((set) => ({
    consent: false,
    setConsent: () => set((state) => ({ consent: !state.consent })),
  }))

  export default useConsentStore;