import { useLocation } from 'react-router-dom';
import { BackButton } from '@/shared/ui/BackButton';
import { WeatherDetailHeader } from '@/entities/weather/ui/WeatherDetailHeader';
import { useWeather } from '@/entities/weather/api/useWeather';

const DetailPage = () => {
  const { state } = useLocation();
  const locationName = state?.locationName || '충청남도 대전광역시';
  const { data: weatherData, isLoading, isError } = useWeather(locationName);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center pt-[91px] px-[60px]">
      <div className="w-full max-w-[1160px]">
        {/* Back Button Area */}
        <div className="mb-[17px]">
          <BackButton />
        </div>

        {/* Main Content Box */}
        <div className="border border-[#7c7c7c] border-solid rounded-[8px] p-[68px] min-h-[770px]">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">날씨 정보를 불러오는 중...</div>
          ) : isError || !weatherData ? (
            <div className="flex h-full items-center justify-center text-red-500">날씨 정보를 불러오지 못했습니다.</div>
          ) : (
            <>
              <WeatherDetailHeader
                locationName={locationName}
                currentTemp={weatherData.currentTemp}
                minTemp={weatherData.minTemp}
                maxTemp={weatherData.maxTemp}
              />

              {/* Hourly Forecast */}
              <div className="flex gap-[16px] mb-[66px]">
                {weatherData.hourlyForecasts.map((forecast: {time: string, temp: number}, idx: number) => (
                  <div key={idx} className="flex flex-col items-center min-w-[32px]">
                    <p className="font-['Pretendard:Light',sans-serif] text-[10px] text-[#7c7c7c] whitespace-nowrap">
                      {forecast.time}
                    </p>
                    <p className="font-['Pretendard:Light',sans-serif] text-[13px] text-black whitespace-nowrap mt-[8px]">
                      {forecast.temp}°C
                    </p>
                  </div>
                ))}
              </div>

              {/* Humidity Sections (Placeholders as per design) */}
              <div className="flex flex-col gap-[88px]">
                <div>
                  <h2 className="font-['Pretendard:SemiBold',sans-serif] text-[24px] text-black">
                    습도
                  </h2>
                </div>
                <div>
                  <h2 className="font-['Pretendard:SemiBold',sans-serif] text-[24px] text-black">
                    습도
                  </h2>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;

