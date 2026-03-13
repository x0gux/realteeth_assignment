import { WeatherForecastCard } from '@/entities/weather/ui/WeatherForecastCard';
import { SearchBar } from '@/features/search-location/ui/SearchBar';
import { BookmarkList } from '@/features/bookmark/ui/BookmarkList';
import { useLocationStore } from '@/entities/location/model/store';
import { useWeather } from '@/entities/weather/api/useWeather';
import { useBookmarks } from '@/entities/bookmark/model/store';
import { useGeolocation } from '@/shared/hooks/useGeolocation';
import type { LocationState } from '@/entities/location/model/store';

export const HomeDashboardWidget = () => {
  const { selectedLocation } = useLocationStore();
  const { bookmarks, toggleBookmark, isBookmarked } = useBookmarks();
  const { coordinates, isLoading: isGeoLoading } = useGeolocation();
  
  // Determine which location to fetch based on priorities
  let locationToFetch: LocationState = '서울특별시'; // Fallback
  
  if (selectedLocation) {
    locationToFetch = selectedLocation; // User selected via search
  } else if (coordinates) {
    locationToFetch = coordinates; // Use geolocation
  }
  
  // Only start fetching weather if we aren't waiting for geolocation (unless it timed out/errored and is false)
  // But useWeather handles enabling nicely if we just pass the location.
  const { data: weatherData, isLoading: isWeatherLoading, isError } = useWeather(
    isGeoLoading && !selectedLocation ? null : locationToFetch
  );

  const displayLocationName = weatherData?.locationName || (typeof locationToFetch === 'string' ? locationToFetch : '현재 위치');
  // Use the locationName returned by API for bookmarking so we have a consistent ID
  const bookmarkId = weatherData?.locationName || (typeof locationToFetch === 'string' ? locationToFetch : 'unknown');

  const handleToggleBookmark = () => {
    if (weatherData) {
      toggleBookmark({
        id: bookmarkId,
        locationName: displayLocationName,
        currentTemp: weatherData.currentTemp,
        minTemp: weatherData.minTemp,
        maxTemp: weatherData.maxTemp,
      });
    }
  };

  const isLoading = isGeoLoading || isWeatherLoading;

  return (
    <div className="w-full min-h-screen bg-white relative flex flex-col items-center pt-[86px] md:pt-[90px]">
      
      {/* The top search bar. */}
      <div className="w-full px-[30px] md:px-0 flex justify-center mb-[25px] md:mb-0 md:absolute md:top-[90px] z-20">
        <SearchBar placeholder="지역명을 입력해주세요 (ex.서울 강서구,대전 은행동)" />
      </div>

      {/* Main Weather Card */}
      <div className="w-full flex justify-center md:absolute md:top-[177px] mb-[26px] md:mb-0">
        {isLoading ? (
          <div className="md:h-[222px] flex items-center justify-center text-[#7c7c7c]">현재 위치를 확인 중이거나 날씨 정보를 불러오는 중입니다...</div>
        ) : isError || !weatherData ? (
          <div className="md:h-[222px] flex items-center justify-center text-red-500">해당 장소의 정보가 제공되지 않습니다.</div>
        ) : (
          <WeatherForecastCard
            locationName={displayLocationName.replace(/-/g, ' ')}
            currentTemp={weatherData.currentTemp}
            minTemp={weatherData.minTemp}
            maxTemp={weatherData.maxTemp}
            hourlyForecasts={weatherData.hourlyForecasts}
            isBookmarked={isBookmarked(bookmarkId)}
            onToggleBookmark={handleToggleBookmark}
          />
        )}
      </div>

      {/* Bookmark List Overlay */}
      <div className="w-full px-[30px] md:px-0 flex justify-center md:absolute md:top-[447px] pb-10">
        <div className="w-full md:w-[826px]">
          <BookmarkList
            bookmarks={bookmarks}
            currentCount={bookmarks.length}
            maxCount={6}
          />
        </div>
      </div>
    </div>
  );
};
