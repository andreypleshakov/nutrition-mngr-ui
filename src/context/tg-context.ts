import { createContext, useContext } from "react";

export const tgIdContext = createContext<number | undefined>(undefined);

export function useTgIdContext() {
  const tgId = useContext(tgIdContext);

  if (tgId === undefined) {
    throw new Error("TotalStatistic must be used with tgIdContext");
  }
  return tgId;
}
