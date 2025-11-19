import React, { useEffect } from "react";
import { Bell } from "lucide-react";
import useInviteStore from "../../store/useInviteStore";
import useLayoutStore from "../../store/useLayoutStore";

export default function InviteBell({ onClick }) {
  const { invites, fetchInvites } = useInviteStore();
  const unread = invites.length;

  useEffect(() => {
    fetchInvites();
  }, []);

  return (
    <button
      onClick={onClick}
      className="relative p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
    >
      <Bell size={22} />
      {unread > 0 && (
        <span className="
          absolute -top-1 -right-1 bg-red-500 text-white 
          text-xs font-bold w-5 h-5 flex items-center justify-center 
          rounded-full shadow
        ">
          {unread}
        </span>
      )}
    </button>
  );
}
