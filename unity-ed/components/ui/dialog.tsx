import React, { ReactNode } from "react";

interface DialogProps {
  open: boolean;
  children: ReactNode;
}

interface BaseProps {
  children: ReactNode;
  className?: string;
}

export function Dialog({ open, children }: DialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      {children}
    </div>
  );
}

export function DialogContent({ children, className = "" }: BaseProps) {
  return (
    <div className={`bg-white rounded-xl p-6 w-full max-w-lg shadow-lg ${className}`}>
      {children}
    </div>
  );
}

export function DialogHeader({ children }: Omit<BaseProps, "className">) {
  return <div className="mb-4">{children}</div>;
}

export function DialogTitle({ children }: Omit<BaseProps, "className">) {
  return <h2 className="text-xl font-semibold">{children}</h2>;
}

export function DialogDescription({ children }: Omit<BaseProps, "className">) {
  return <p className="text-sm text-gray-500 mb-3">{children}</p>;
}

export function DialogTrigger({ children }: Omit<BaseProps, "className">) {
  return <>{children}</>;
}

export function DialogFooter({ children }: Omit<BaseProps, "className">) {
  return <div className="flex justify-end gap-2 mt-4">{children}</div>;
}
