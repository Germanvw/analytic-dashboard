import { redis } from "@/lib/redis";
import { getDate } from "./getDate.utils";
import { parse } from "date-fns";
import type {
  AnalyticsArgs,
  AnalyticsDaysResult,
  TrackOptions,
} from "@/types/analytics.types";

const oneWeek = 60 * 60 * 24 * 7;

export type AnalyticsPromise = ReturnType<typeof analytics.fetchDate>;

export class Analytics {
  private retention: number = oneWeek;

  constructor(opts?: AnalyticsArgs) {
    if (opts?.retention) this.retention = opts.retention;
  }

  async track(action: string, data: object = {}, opts?: TrackOptions) {
    let key = `event::${action}`;

    if (!opts?.persist) key += `::${getDate()}`;

    await redis.hincrby(key, JSON.stringify(data), 1);

    if (!opts?.persist) await redis.expire(key, this.retention);
  }

  async fetchDate(action: string, date: string) {
    const res = await redis.hgetall<Record<string, string>>(
      `event::${action}::${date}`
    );

    const events = Object.entries(res ?? []).map(([key, value]) => ({
      [key]: Number(value),
    }));

    return {
      date,
      events,
    };
  }

  async fetchDays(
    action: string,
    numberDays: number
  ): Promise<AnalyticsDaysResult[]> {
    const promises: AnalyticsPromise[] = [];

    for (let i = 0; i < numberDays; i++) {
      const promise = analytics.fetchDate(action, getDate(i));
      promises.push(promise);
    }

    const results = await Promise.all(promises);

    return results.sort((a, b) =>
      parse(a.date, "dd-MM-yyyy", new Date()) >
      parse(b.date, "dd-MM-yyyy", new Date())
        ? 1
        : -1
    );
  }
}

export const analytics = new Analytics();
