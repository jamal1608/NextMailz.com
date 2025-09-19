import React from "react";

interface AdBannerProps {
  type?: "horizontal" | "vertical";
  title?: string;
  description?: string;
  company?: string;
  ctaText?: string;
  colors?: {
    bg?: string;
    text?: string;
    accent?: string;
  };
}

export default function AdBanner({
  type = "horizontal",
  title = "Ad Title",
  description = "Ad description goes here",
  company = "Company",
  ctaText = "Click",
  colors = { bg: "bg-gray-200", text: "text-black", accent: "text-gray-600" },
}: AdBannerProps) {
  const baseClasses =
    "rounded-xl p-4 shadow-md flex flex-col justify-between " +
    (type === "horizontal" ? "w-full h-28" : "w-full h-48");

  return (
    <div className={`${baseClasses} ${colors.bg} ${colors.text}`}>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className={`text-sm ${colors.accent}`}>{description}</p>
      </div>
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs">{company}</span>
        <button className="px-3 py-1 rounded-md bg-white text-black text-sm font-medium hover:opacity-80">
          {ctaText}
        </button>
      </div>
    </div>
  );
}

