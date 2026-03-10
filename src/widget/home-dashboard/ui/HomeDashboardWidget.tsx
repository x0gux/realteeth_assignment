import { WeatherForecastCard } from '../../../entities/weather/ui/WeatherForecastCard';
import { SearchBar } from '../../../features/search-location/ui/SearchBar';
import { BookmarkList } from '../../../features/bookmark/ui/BookmarkList';

// Placeholder data according to Figma design
const HOURLY_FORECASTS = [
  { time: '18시', temp: 3 },
  { time: '20시', temp: 3 },
  { time: '22시', temp: 3 },
  { time: '0시', temp: 3 },
  { time: '2시', temp: 3 },
  { time: '4시', temp: 3 },
];

const INITIAL_BOOKMARKS = [
  { id: '1', locationName: '충청남도 대전광역시', currentTemp: 14, minTemp: 3, maxTemp: 16 },
  { id: '2', locationName: '충청남도 대전광역시', currentTemp: 14, minTemp: 3, maxTemp: 16 },
  { id: '3', locationName: '충청남도 대전광역시', currentTemp: 14, minTemp: 3, maxTemp: 16 },
  { id: '4', locationName: '충청남도 대전광역시', currentTemp: 14, minTemp: 3, maxTemp: 16 },
  { id: '5', locationName: '충청남도 대전광역시', currentTemp: 14, minTemp: 3, maxTemp: 16 },
  { id: '6', locationName: '충청남도 대전광역시', currentTemp: 14, minTemp: 3, maxTemp: 16 },
];

export const HomeDashboardWidget = () => {
  return (
    <div className="w-full h-full min-h-screen bg-white relative">
      {/* 
        The top search bar. 
        In Figma: top 90px, horizontally centered (left 42.86% base approx + some offset)
        We'll use absolute positioning aligned with Figma, or standard flex if preferred. 
        Using absolute to closely match Figma's exact overlay.
      */}
      <div className="absolute top-[90px] w-full flex justify-center">
        <SearchBar />
      </div>

      {/* Main Weather Card */}
      <div className="absolute top-[177px] w-full flex justify-center left-[-14px]">
        {/* left -14px is from figma data-node-id="9:290" */}
        <div className="w-[1308px] h-[222px]">
          <WeatherForecastCard
            locationName="충청남도 대전광역시"
            currentTemp={14}
            minTemp={3}
            maxTemp={16}
            hourlyForecasts={HOURLY_FORECASTS}
          />
        </div>
      </div>

      {/* Bookmark List Overlay */}
      <div className="absolute top-[447px] w-full flex justify-center">
        <div className="w-[826px] h-[472px]">
          <BookmarkList
            bookmarks={INITIAL_BOOKMARKS}
            currentCount={2}
            maxCount={6}
          />
        </div>
      </div>
    </div>
  );
};
