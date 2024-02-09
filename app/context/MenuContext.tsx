"use client";
import React, { useState, createContext} from "react";


interface MenuContextProps {
  open: boolean;
  toggle: () => void;
}

export const MenuContext = createContext<MenuContextProps>({
  open: false,
  toggle: () => {}
});

type MenuContextProviderProps = {
  children?: React.ReactNode;
}
export const MenuContextProvider = ({ children }:MenuContextProviderProps) => {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };

  return (
    <MenuContext.Provider value={{ open, toggle }}>
      {children}
    </MenuContext.Provider>
  );
};