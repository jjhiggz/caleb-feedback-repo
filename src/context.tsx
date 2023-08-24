import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { SelectedState } from "./types";
import { Requests } from "./api";
type ContextType = {
  selected: SelectedState;
  setSelected: React.Dispatch<React.SetStateAction<SelectedState>>;
};

export const Context = createContext<ContextType>({} as ContextType);

type ContextProps = {
  children: React.ReactNode;
};

export const Provider: React.FC<ContextProps> = ({ children }) => {
  const [selected, setSelected] = useState<SelectedState>(SelectedState.All);

  return (
    <Context.Provider value={{ selected, setSelected }}>
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useAppContext error");
  }
  return context;
};
