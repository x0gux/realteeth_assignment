import { useLocation } from 'react-router-dom';
import { BackButton } from '@/shared/ui/BackButton';
import { WeatherDetailHeader } from '@/entities/weather/ui/WeatherDetailHeader';
import { useWeather } from '@/entities/weather/api/useWeather';

const DetailPage = () => {
  const { state } = useLocation();
  const locationName = state?.locationName || '충청남도 대전광역시';
  const customName = state?.customName;
  const { data: weatherData, isLoading, isError } = useWeather(locationName);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center pt-[60px] md:pt-[91px] px-[20px] md:px-[60px]">
      <div className="w-full max-w-[1160px]">
        {/* Back Button Area */}
        <div className="mb-[10px] md:mb-[17px]">
          <BackButton />
        </div>

        {/* Main Content Box */}
        <div className="border border-[#7c7c7c] border-solid rounded-[8px] p-[24px] md:p-[68px] min-h-[500px] md:min-h-[770px] overflow-x-auto">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">날씨 정보를 불러오는 중...</div>
          ) : isError || !weatherData ? (
            <div className="flex h-full items-center justify-center text-red-500">해당 장소의 정보가 제공되지 않습니다.</div>
          ) : (
            <>
              <WeatherDetailHeader
                locationName={customName || locationName.replace(/-/g, ' ')}
                currentTemp={weatherData.currentTemp}
                minTemp={weatherData.minTemp}
                maxTemp={weatherData.maxTemp}
              />

              {/* Hourly Forecast */}
              <div className="flex gap-[16px] mb-[40px] md:mb-[66px] overflow-x-auto pb-2">
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

              {/* Weather Details (Humidity, Wind, Pressure, Feels Like) */}
              <div className="flex flex-col gap-[30px] md:gap-[40px]">
                <div className="flex justify-between border-b pb-4">
                  <h2 className="font-['Pretendard:Medium',sans-serif] text-[18px] md:text-[24px] text-black">
                    체감 온도
                  </h2>
                  <p className="font-['Pretendard:Regular',sans-serif] text-[18px] md:text-[24px] text-[#7c7c7c]">
                    {weatherData.feelsLike}°C
                  </p>
                </div>
                
                <div className="flex justify-between border-b pb-4">
                  <h2 className="font-['Pretendard:Medium',sans-serif] text-[18px] md:text-[24px] text-black">
                    습도
                  </h2>
                  <p className="font-['Pretendard:Regular',sans-serif] text-[18px] md:text-[24px] text-[#7c7c7c]">
                    {weatherData.humidity}%
                  </p>
                </div>

                <div className="flex justify-between border-b pb-4">
                  <h2 className="font-['Pretendard:Medium',sans-serif] text-[18px] md:text-[24px] text-black">
                    바람
                  </h2>
                  <p className="font-['Pretendard:Regular',sans-serif] text-[18px] md:text-[24px] text-[#7c7c7c]">
                    {weatherData.windSpeed} m/s
                  </p>
                </div>

                <div className="flex justify-between pb-4">
                  <h2 className="font-['Pretendard:Medium',sans-serif] text-[18px] md:text-[24px] text-black">
                    기압
                  </h2>
                  <p className="font-['Pretendard:Regular',sans-serif] text-[18px] md:text-[24px] text-[#7c7c7c]">
                    {weatherData.pressure} hPa
                  </p>
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

