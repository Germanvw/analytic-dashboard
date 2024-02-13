"use client";

import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";

interface Props {
  percentage: number;
}

const positiveStyle = "bg-green-900/25 text-green-400 ring-green-400/25";
const neutralStyle = "bg-zinc-900/25 text-zinc-400 ring-zinc-400/25";
const negativeStyle = "bg-red-900/25 text-red-400 ring-red-400/25";

export const Badge = ({ percentage }: Props) => {
  const isPositive = percentage > 0;
  const isNeutral = percentage === 0;

  if (isNaN(percentage)) return null;

  return (
    <div
      className={` inline-flex gap-1 items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
        isPositive ? positiveStyle : isNeutral ? neutralStyle : negativeStyle
      }`}
    >
      {isPositive ? (
        <ArrowUpRight className="w-3 h-3" />
      ) : isNeutral ? (
        <ArrowRight className="w-3 h-3" />
      ) : (
        <ArrowDown className="w-3 h-3" />
      )}
      {percentage.toFixed(2)}%
    </div>
  );
};
