import React, { createContext, useState, useContext } from 'react';

const HoverContext = createContext();

export const useHover = () => useContext(HoverContext);

export const HoverProvider = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <HoverContext.Provider value={{ isHovered, handleHover, handleMouseLeave }}>
      {children}
    </HoverContext.Provider>
  );
};