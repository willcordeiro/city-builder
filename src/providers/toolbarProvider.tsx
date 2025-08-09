"use client";

import {
  MouseEventHandler,
  ReactNode,
  createContext,
  useState,
} from "react";

interface ToolbarContextType {
  selectedToolId: string | undefined;
  toggleToolSelect: (id: string | undefined) => void;
  isIsometric: boolean;
  toggleIsometricView: MouseEventHandler<HTMLButtonElement>;
}

export const ToolbarContext = createContext<ToolbarContextType | undefined>(
  undefined
);

export function ToolbarProvider({ children }: { children: ReactNode }) {
  const [selectedToolId, setSelectedToolId] = useState<string | undefined>(
    "residential"
  );
  const [isIsometric, setIsIsometric] = useState(false);

  function toggleToolSelect(id: string | undefined) {
    setSelectedToolId(id);
  }

  const toggleIsometricView = () => {
    setIsIsometric((prev) => !prev);
  };

  return (
    <ToolbarContext.Provider
      value={{
        selectedToolId,
        toggleToolSelect,
        isIsometric,
        toggleIsometricView,
      }}
    >
      {children}
    </ToolbarContext.Provider>
  );
}
