import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "./button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, description, children, footer }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-[#0f1f45]/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Content */}
      <div className="relative bg-white w-full max-w-md border border-[rgba(15,31,69,0.1)] shadow-2xl animate-in zoom-in-95 duration-200 p-8 flex flex-col gap-6">
        <header>
          <h2 className="text-xl font-bold text-[#0f1f45]">{title}</h2>
          {description && <p className="text-sm text-[rgba(15,31,69,0.5)] mt-1">{description}</p>}
        </header>

        <div className="text-sm text-[rgba(15,31,69,0.7)]">
          {children}
        </div>

        {footer && (
          <footer className="flex justify-end gap-3 pt-2">
            {footer}
          </footer>
        )}
        
        {!footer && (
           <footer className="flex justify-end pt-2">
             <Button variant="secondary" size="sm" onClick={onClose}>Close</Button>
           </footer>
        )}
      </div>
    </div>,
    document.body
  );
}
