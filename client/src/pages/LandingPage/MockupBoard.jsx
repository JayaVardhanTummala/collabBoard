import React from "react";

export default function MockupBoard() {
  return (
    <div
      className="bg-white rounded-2xl border-8 border-gray-900 p-6 shadow-[16px_16px_0px_#facc15]"
    >
      <h2 className="font-bold text-gray-800 mb-4 text-center">
        CollabBoard · Demo
      </h2>

      <div className="grid grid-cols-3 gap-4">
        {["To Do", "In Progress", "Done"].map((col, idx) => (
          <div
            key={idx}
            className="bg-gray-50 border-4 border-gray-900 rounded-xl p-4"
          >
            <h3 className="font-black mb-2">{col}</h3>
            <div className="bg-white border border-gray-300 rounded-lg p-3 mb-2">
              <p className="font-medium text-sm">Draft Hero Copy</p>
              <span className="text-xs text-gray-500">@You</span>
            </div>
            <div className="bg-white border border-gray-300 rounded-lg p-3">
              <p className="font-medium text-sm">Design Feature Cards</p>
              <span className="text-xs text-gray-500">@Jane Doe</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
