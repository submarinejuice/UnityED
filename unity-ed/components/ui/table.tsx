import React, { ReactNode } from "react";

interface BaseProps {
  children: ReactNode;
  className?: string;
}

export function Table({ children, className = "" }: BaseProps) {
  return <table className={`min-w-full divide-y divide-gray-200 ${className}`}>{children}</table>;
}

export function TableHeader({ children, className = "" }: BaseProps) {
  return <thead className={className}>{children}</thead>;
}

export function TableBody({ children, className = "" }: BaseProps) {
  return <tbody className={className}>{children}</tbody>;
}

export function TableRow({ children, className = "" }: BaseProps) {
  return <tr className={className}>{children}</tr>;
}

export function TableHead({ children, className = "" }: BaseProps) {
  return <th className={`px-6 py-4 text-left font-medium ${className}`}>{children}</th>;
}

export function TableCell({ children, className = "" }: BaseProps) {
  return <td className={`px-6 py-4 ${className}`}>{children}</td>;
}
