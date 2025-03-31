import React from "react";

type LoaderProps = {
  size?: number; // By default 24px (6 * 4)
  color?: string; // Customizable, blue by default
};

export default function Loader({
  size = 6,
  color = "border-blue-600",
}: LoaderProps) {
  return (
    <div
      className="flex justify-center items-center h-32"
      role="status"
      aria-label="Loading..."
    >
      <div
        className={`w-${size} h-${size} border-2 border-t-0 ${color} rounded-full animate-spin`}
      ></div>
    </div>
  );
}
