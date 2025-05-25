import { createContext, useContext } from "react";

export const RefetchContext = createContext<() => void>(() => {});
export const useRefetch = () => useContext(RefetchContext);