import React, { createContext, useContext, useState } from "react";
import SuccessModal from "@/components/modals/SuccessModal";

interface ModalContextType {
  showSuccessModal: (message: string) => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const useSuccessModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useSuccessModal must be used within a ModalProvider");
  }
  return context;
};

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");

  const showSuccessModal = (message: string) => {
    setMessage(message);
    setIsVisible(true);
  };

  const closeSuccessModal = () => {
    setIsVisible(false);
  };

  return (
    <ModalContext.Provider value={{ showSuccessModal }}>
      {children}
      <SuccessModal
        isVisible={isVisible}
        title="Success!"
        subtitle={message}
        onClose={closeSuccessModal}
      />
    </ModalContext.Provider>
  );
};
