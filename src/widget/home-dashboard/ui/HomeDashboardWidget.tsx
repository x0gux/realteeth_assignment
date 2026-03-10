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
    <div className="w-full min-h-screen bg-white relative flex flex-col items-center pt-[86px] md:pt-[90px]">
      
      {/* The top search bar. */}
      <div className="w-full px-[30px] md:px-0 flex justify-center mb-[25px] md:mb-0 md:absolute md:top-[90px]">
        <SearchBar placeholder="지역명을 입력해주세요 (ex.서울 강서구,대전 은행동)" />
      </div>

      {/* Main Weather Card */}
      <div className="w-full flex justify-center md:absolute md:top-[177px] mb-[26px] md:mb-0">
        <WeatherForecastCard
          locationName="충청남도 대전광역시"
          currentTemp={14}
          minTemp={3}
          maxTemp={16}
          hourlyForecasts={HOURLY_FORECASTS}
        />
      </div>

      {/* Bookmark List Overlay */}
      <div className="w-full px-[30px] md:px-0 flex justify-center md:absolute md:top-[447px]">
        <div className="w-full md:w-[826px]">
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
