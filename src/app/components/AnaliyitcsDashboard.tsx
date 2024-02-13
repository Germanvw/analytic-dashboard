"use client";
import { AnalyticsDaysResult } from "@/types/analytics.types";
import { BarChart, Card } from "@tremor/react";
import ReactCountryFlag from "react-country-flag";
import { Badge } from "./Badge";

interface Props {
  todayViews: number;
  averageViews: string;
  totalSales: AnalyticsDaysResult[];
  topCountries: [string, number][];
}

export const AnaliyitcsDashboard = ({
  todayViews,
  averageViews,
  totalSales,
  topCountries,
}: Props) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid w-full mx-auto grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="w-full mx-auto max-w-xs">
          <div className="flex items-center gap-6">
            <p className="text-tremor-default text-dark-tremor-content">
              Visitors/day
            </p>
            <Badge percentage={todayViews / Number(averageViews) - 1} />
          </div>
          <p className="text-3xl text-dark-tremor-content-strong font-semibold">
            {todayViews}
          </p>
        </Card>
        <Card className="w-full mx-auto max-w-xs">
          <p className="text-tremor-default text-dark-tremor-content">
            Avg. visitors/day
          </p>
          <p className="text-3xl text-dark-tremor-content-strong font-semibold">
            {averageViews}
          </p>
        </Card>
      </div>
      <Card className="flex flex-col sm:grid grid-cols-4 gap-6">
        <h2 className="w-full text-dark-tremor-content-strong text-center sm:left-left font-semibold text-xl">
          Top 5 visitors:
        </h2>
        <div className="col-span-3 flex items-center justify-between flex-wrap  gap-8">
          {topCountries?.map(([country, views]) => (
            <div
              className="flex items-center gap-3 text-dark-tremor-content-strong"
              key={country}
            >
              <p className="hidden sm:block text-tremor-content">{country}</p>
              <ReactCountryFlag
                countryCode={country}
                className="text-5xl sm:text-3xl"
                svg
              />
              <p className="text-tremor-content sm:text-dark-tremor-content-strong">
                {views}
              </p>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        {totalSales ? (
          <BarChart
            allowDecimals={false}
            showAnimation
            data={totalSales.map((day) => ({
              name: day.date,
              Sales: day.events.reduce(
                (acc, curr) => acc + Object.values(curr)[0]!,
                0
              ),
            }))}
            categories={["Sales"]}
            index="name"
          />
        ) : null}
      </Card>
    </div>
  );
};
