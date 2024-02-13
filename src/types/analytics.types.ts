export type AnalyticsArgs = {
  retention?: number;
};

export type TrackOptions = {
  persist?: boolean;
};

interface AnalyticEvent {
  [key: string]: number;
}
export interface AnalyticsDaysResult {
  date: string;
  events: AnalyticEvent[];
}
