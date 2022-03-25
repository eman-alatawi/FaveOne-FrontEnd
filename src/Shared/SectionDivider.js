import React from "react";

export default function SectionDivider() {
  const background = 'linear-gradient(to right, #6d0d3c 0%, #a76460 100%)'
  return <div style={{backgroundImage: background}} className="h-4 w-full bg-gray-400 shadow-xl "></div>;
}
