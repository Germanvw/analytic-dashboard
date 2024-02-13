import { ActionEnum } from "@/types/actionEnum.types";
import { analytics } from "@/utils/analtytics";
import { AnaliyitcsDashboard } from "../components/AnaliyitcsDashboard";
import { getDate } from "@/utils/getDate.utils";
import { reduceDays } from "@/utils/reduceDays.utils";

const AVERAGE_DAYS = 7;

const Page = async () => {
  const analyticData = await analytics.fetchDays(
    ActionEnum.HomepageVisited,
    AVERAGE_DAYS
  );

  const countriesRank = new Map<string, number>();

  const pageViews = reduceDays(analyticData);

  const averageViews = (pageViews / AVERAGE_DAYS).toFixed(1);

  const todayViews = reduceDays(
    analyticData.filter((i) => i.date === getDate())
  );

  for (let day = 0; day < AVERAGE_DAYS; day++) {
    const indexDay = analyticData[day];

    if (!indexDay) continue;

    for (let event = 0; event < indexDay.events.length; event++) {
      const indexEvent = indexDay.events[event];

      if (!indexEvent) continue;

      const key = Object.keys(indexEvent)[0]!;
      const value = Object.values(event)[0!];

      const country = JSON.parse(key)?.country;

      if (country) {
        if (countriesRank.has(country)) {
          countriesRank.set(country, countriesRank.get(country)! + value);
        } else countriesRank.set(country, value);
      }
    }
  }

  const topCountries = [...countriesRank.entries()]
    .sort((a, b) => (b[1] > a[1] ? -1 : 1))
    .slice(0, 5);

  return (
    <div className="min-h-screen w-full py-12 flex justify-center items-center">
      <div className="relative w-full max-w-6xl mx-auto text-white">
        <AnaliyitcsDashboard
          todayViews={todayViews}
          averageViews={averageViews}
          totalSales={analyticData}
          topCountries={topCountries}
        />
      </div>
    </div>
  );
};

export default Page;
