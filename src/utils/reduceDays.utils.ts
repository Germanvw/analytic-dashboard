import type { AnalyticsDaysResult } from "@/types/analytics.types";

export const reduceDays = (days: AnalyticsDaysResult[]) => {
  return days.reduce(
    (acc, curr) =>
      acc + curr.events.reduce((acc, curr) => acc + Object.values(curr)[0]!, 0),
    0
  );
};
