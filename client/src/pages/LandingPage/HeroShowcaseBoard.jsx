import React from "react";

export default function HeroShowcaseBoard() {
  const columns = [
    {
      title: "To Do",
      color: "bg-purple-100",
      count: 3,
      tasks: [
        {
          title: "Design Landing Page",
          assigned: "Unassigned",
          tag: "UI",
          color: "#6366f1", // Indigo
        },
        {
          title: "Write API Contract",
          assigned: "Jane Doe",
          tag: "Backend",
          color: "#06b6d4", // Cyan
        },
        {
          title: "Create User Personas",
          assigned: "You",
          tag: "Research",
          color: "#f59e0b", // Amber
        },
      ],
    },
    {
      title: "In Progress",
      color: "bg-blue-100",
      count: 2,
      tasks: [
        {
          title: "Implement Auth Flow",
          assigned: "You",
          tag: "Auth",
          color: "#10b981", // Green
        },
        {
          title: "Socket.IO Real-time Sync",
          assigned: "Akhil",
          tag: "Realtime",
          color: "#3b82f6", // Blue
        },
      ],
    },
    {
      title: "Done",
      color: "bg-green-100",
      count: 2,
      tasks: [
        {
          title: "Setup Database Models",
          assigned: "You",
          tag: "DB",
          color: "#f43f5e", // Rose
        },
        {
          title: "Project Structure Cleanup",
          assigned: "J",
          tag: "Refactor",
          color: "#a855f7", // Purple
        },
      ],
    },
  ];

  return (
    <div className="bg-white rounded-3xl border-8 border-gray-900 p-8 shadow-[16px_16px_0px_#facc15]">
      {/* Header */}
      <h2 className="font-black text-2xl text-center mb-6">CollabBoard · Demo Showcase</h2>

      {/* Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {columns.map((col, idx) => (
          <div
            key={idx}
            className={`rounded-2xl border-4 border-gray-900 p-5 shadow-[10px_10px_0px_#1e293b] ${col.color}`}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-black">{col.title}</h3>
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-900 text-white font-bold">
                {col.count}
              </span>
            </div>

            {/* Add Task Button (dummy) */}
            <button className="
              w-full py-2 rounded-xl text-sm font-semibold bg-gray-800 text-white
              border-4 border-gray-900 shadow-[4px_4px_0px_#1e293b] mb-4
            ">
              + Add Task
            </button>

            {/* Tasks */}
            <div className="flex flex-col gap-4">
              {col.tasks.map((task, tIdx) => (
                <div
                  key={tIdx}
                  className="bg-white p-4 rounded-xl border border-gray-300 shadow-lg"
                  style={{
                    boxShadow: `0 0 0 3px ${task.color}`, // outer color shadow
                  }}
                >
                  <p className="font-bold text-gray-800">{task.title}</p>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">{task.assigned}</span>
                    <span
                      className="text-xs font-medium"
                      style={{ color: task.color }}
                    >
                      {task.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
