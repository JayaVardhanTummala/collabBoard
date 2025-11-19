import React from "react";

export default function FormInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  className = "",
}) {
  return (
    <div className="mb-6">
      <label
        htmlFor={id}
        className="block mb-2 text-gray-800 font-semibold text-sm"
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className={`
          w-full p-3 text-gray-900 rounded-xl border-4 border-gray-900
          bg-white shadow-[4px_4px_0px_#1e293b]
          focus:outline-none focus:shadow-[6px_6px_0px_#1e293b] 
          focus:-translate-y-[2px] transition-all 
          ${className}
        `}
      />
    </div>
  );
}
