import React from "react";
import clsx from "clsx";

export default function IconButton({ onClick, children, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "w-10 h-10 flex items-center justify-center rounded-full",
        "bg-white dark:bg-gray-800",
        "border-2 border-gray-900 dark:border-gray-700",
        "shadow-[4px_4px_0px_#1e293b] dark:shadow-[4px_4px_0px_#000]",
        "transition-all hover:-translate-y-1 active:translate-y-0",
        className
      )}
    >
      {children}
    </button>
  );
}
