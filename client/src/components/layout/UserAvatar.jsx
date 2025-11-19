import React from "react";

export default function UserAvatar({ name }) {
  const initial = name?.charAt(0)?.toUpperCase() || "?";

  return (
    <div
      className="
        w-10 h-10 rounded-full flex items-center justify-center
        bg-yellow-300 text-black font-bold
        border-2 border-black shadow-[3px_3px_0px_#0B0F19]
      "
    >
      {initial}
    </div>
  );
}
