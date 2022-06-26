import React from "preact/compat";
import { createContext, FunctionalComponent, ComponentChildren } from "preact";

type WSContextProps = {};

export const WSContext = createContext<WSContextProps>({} as WSContextProps);

type WSContextProviderProps = {
  url: string;
  children: ComponentChildren;
};

export const WSContextProvider: FunctionalComponent<WSContextProviderProps> = ({
  children,
  url,
}) => {
  const socket = new WebSocket(url);

  return <WSContext.Provider value={{}}>{children}</WSContext.Provider>;
};
