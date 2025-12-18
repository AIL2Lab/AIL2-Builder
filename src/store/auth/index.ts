import { atom } from "jotai";

export const isAuthenticatedAtom = atom(false);
export const isLoadingAtom = atom(false);
export const errorAtom = atom<string | null>(null);
export const lastAuthAddressAtom = atom<string | undefined>(undefined);

export const resetAuthAtom = atom(null, (get, set) => {
  set(isAuthenticatedAtom, false);
  set(isLoadingAtom, false);
  set(errorAtom, null);
  set(lastAuthAddressAtom, undefined);
});