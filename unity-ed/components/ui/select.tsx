import React, { ReactNode } from "react";

// Base type for components 
interface BaseProps {
  children: ReactNode;
  className?: string;
}

// Select root props
interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
}

export function Select({ value, onValueChange, children }: SelectProps) {
  return <div>{children}</div>;
}

// Trigger props
interface SelectTriggerProps extends BaseProps {
  onClick?: () => void;
}

export function SelectTrigger({
  children,
  className = "",
  onClick,
}: SelectTriggerProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full border px-3 py-2 rounded-lg text-left ${className}`}
    >
      {children}
    </button>
  );
}

// Value / placeholder props
interface SelectValueProps {
  placeholder: string;
}

export function SelectValue({ placeholder }: SelectValueProps) {
  return <span className="text-gray-500">{placeholder}</span>;
}

// Content props
export function SelectContent({ children }: { children: ReactNode }) {
  return (
    <div className="mt-1 border rounded-lg bg-white shadow-md">
      {children}
    </div>
  );
}

// Select item props
interface SelectItemProps {
  children: ReactNode;
  value: string;
  onClick?: (value: string) => void;
}

export function SelectItem({
  children,
  value,
  onClick,
}: SelectItemProps) {
  return (
    <div
      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
      onClick={() => onClick?.(value)}
    >
      {children}
    </div>
  );
}
