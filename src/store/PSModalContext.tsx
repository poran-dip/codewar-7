"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ProblemStatement } from "@/data/ps";

interface PSModalContextType {
  selectedPS: ProblemStatement | null;
  isOpen: boolean;
  openModal: (ps: ProblemStatement) => void;
  closeModal: () => void;
}

const PSModalContext = createContext<PSModalContextType | undefined>(undefined);

export function PSModalProvider({ children }: { children: ReactNode }) {
  const [selectedPS, setSelectedPS] = useState<ProblemStatement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (ps: ProblemStatement) => {
    setSelectedPS(ps);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setSelectedPS(null), 300);
  };

  return (
    <PSModalContext.Provider
      value={{ selectedPS, isOpen, openModal, closeModal }}
    >
      {children}
    </PSModalContext.Provider>
  );
}

export function usePSModal() {
  const context = useContext(PSModalContext);
  if (!context) {
    throw new Error("usePSModal must be used within PSModalProvider");
  }
  return context;
}
