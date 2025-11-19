import React from "react";

export default function Card({ children, className = "" }) {
  return (
    <div
      className={`
        bg-white rounded-2xl p-8 border-4 border-gray-900
        shadow-[10px_10px_0px_#1e293b]
        ${className}
      `}
    >
      {children}
    </div>
  );
}
