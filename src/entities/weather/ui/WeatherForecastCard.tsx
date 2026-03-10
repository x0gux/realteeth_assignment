import { StarIcon } from '../../../shared/ui/Icon';

interface HourlyForecast {
  time: string;
  temp: number;
}

interface WeatherForecastCardProps {
  locationName: string;
  currentTemp: number;
  minTemp: number;
  maxTemp: number;
  hourlyForecasts: HourlyForecast[];
  isBookmarked?: boolean;
}

export const WeatherForecastCard = ({
  locationName,
  currentTemp,
  minTemp,
  maxTemp,
  hourlyForecasts,
  isBookmarked = true,
}: WeatherForecastCardProps) => {
  return (
    <div className="relative border border-[#7c7c7c] border-solid h-[222px] w-full max-w-[1308px] overflow-hidden rounded-[8px]">
      {/* Location Area */}
      <div className="absolute left-[243px] top-[24px]">
        <h2 className="font-['Pretendard:SemiBold',sans-serif] text-[24px] text-black">
          {locationName}
        </h2>
      </div>

      {isBookmarked && (
        <div className="absolute left-[449px] top-[29px]">
          <StarIcon />
        </div>
      )}

      {/* Hourly Title */}
      <p className="absolute font-['Pretendard:Light',sans-serif] text-[13px] text-black left-[243px] top-[87px]">
        시간대별 날씨
      </p>

      {/* Hourly Data Grid */}
      <div className="absolute top-[111px] left-[254px] flex gap-[10px]">
        {hourlyForecasts.map((forecast, idx) => (
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

      {/* Current Temp */}
      <div className="absolute left-[964px] top-[86px]">
         <span className="font-['Pretendard:SemiBold',sans-serif] text-[34px] leading-none">
           {currentTemp}°C
         </span>
      </div>

      {/* Min / Max Temp */}
      <p className="absolute font-['Pretendard:Light',sans-serif] text-[#7c7c7c] text-[13px] left-[1011px] top-[129px] -translate-x-1/2 whitespace-nowrap">
        최저 {minTemp}°C / 최고 {maxTemp}°C
      </p>
    </div>
  );
};
