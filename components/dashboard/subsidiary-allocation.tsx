"use client";

import path from "path";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const displayBackup = [
  { name: "AssetVest", value: 30, color: "#3b82f6" },
  { name: "HedgeVest", value: 10, color: "#10b981" },
  { name: "PartVest", value: 5, color: "#f97316" },
  { name: "PrivateVest", value: 10, color: "#6366f1" },
];

export default function SubsidiaryAllocation({ data }: { data: any[] }) {
  const filteredData = data?.filter(item => item.value > 0);
  const hasValidData = filteredData && filteredData.length > 0;

  if (!hasValidData) {
  return (
    <div className="h-[300px] w-full flex items-center justify-center bg-gray-50 rounded-md shadow-inner">
      <div className="flex flex-col items-center space-y-2">
        <svg
          className="w-10 h-10 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z"
          />
        </svg>
        <p className="text-gray-600 text-base font-medium">
          No data across subsidiaries
        </p>
      </div>
    </div>
  );
}


  const total = filteredData.reduce((sum, item) => sum + item.value, 0);
  const singleSlice = filteredData.length === 1;

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={filteredData}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={80}
            labelLine={false}
            label={({ name, value }) => `${name} ${((value / total) * 100).toFixed(0)}%`}
            minAngle={singleSlice ? 360 : 0}
            stroke="none"
          >
            {filteredData.map((entry, idx) => (
              <Cell key={idx} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value: any) => `${((value / total) * 100).toFixed(0)}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
