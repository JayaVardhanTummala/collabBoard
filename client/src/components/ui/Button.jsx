import React from "react";
import clsx from "clsx";

/**
 * Global Button Variants
 * These match your landing-page / dashboard design system
 * Colors: Blue, Yellow, White, Black shadow system
 */
const COLORS = {
  primary: {
    bg: "bg-[var(--color-primary)]",
    text: "text-white",
    shadow: "shadow-[6px_6px_0px_#1e293b]",
    hover: "hover:-translate-y-1 hover:shadow-[8px_8px_0px_#1e293b]",
  },
  secondary: {
    bg: "bg-[var(--cb-card)]",
    text: "text-[var(--cb-text)]",
    shadow: "shadow-[6px_6px_0px_var(--cb-border)]",
    hover: "hover:-translate-y-1 hover:shadow-[8px_8px_0px_var(--cb-border)]",
  },
  yellow: {
    bg: "bg-[var(--color-accent-yellow)]",
    text: "text-gray-900",
    shadow: "shadow-[6px_6px_0px_#1e293b]",
    hover: "hover:-translate-y-1 hover:shadow-[8px_8px_0px_#1e293b]",
  },
  green: {
    bg: "bg-[var(--color-accent-green)]",
    text: "text-gray-900",
    shadow: "shadow-[6px_6px_0px_#14532d]",
    hover: "hover:-translate-y-1 hover:shadow-[8px_8px_0px_#064e3b]",
  },
  blue: {
    bg: "bg-[var(--color-accent-blue)]",
    text: "text-gray-900",
    shadow: "shadow-[6px_6px_0px_#1e40af]",
    hover: "hover:-translate-y-1 hover:shadow-[8px_8px_0px_#1e3a8a]",
  },

  none: {
    bg: "",
    text: "",
    shadow: "",
    hover: "",
  },
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  disabled = false,
  onClick,
  type = "button",
}) {
  const styling = COLORS[variant] || COLORS.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "px-6 py-3 font-bold text-lg rounded-xl border-4 border-gray-900",
        "transition-all duration-200 focus:outline-none focus:ring-0 active:outline-none",
        "active:translate-y-0 active:shadow-none",

        styling.bg,
        styling.text,
        styling.shadow,
        !disabled && styling.hover,

        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  );
}
