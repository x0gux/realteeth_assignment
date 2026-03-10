
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
    <div className="relative border-y border-[#7c7c7c] border-solid flex flex-col md:block w-full overflow-hidden px-[52px] py-[24px] md:p-0 md:h-[222px]">
      
      <div className="md:relative md:max-w-[826px] md:mx-auto md:h-full">
        {/* Mobile Top Row: Name + Star + Current Temp */}
        <div className="flex justify-between items-start md:hidden w-full mb-[24px]">
          <div>
            <h2 className="font-['Pretendard:SemiBold',sans-serif] text-[20px] text-black">
              {locationName}
            </h2>
            <p className="font-['Pretendard:Light',sans-serif] text-[13px] text-black mt-[16px]">
              시간대별 날씨
            </p>
          </div>
          <div className="flex flex-col items-end">
            {isBookmarked && <span className="mb-[2px]"><StarIcon /></span>}
            <span className="font-['Pretendard:SemiBold',sans-serif] text-[24px] leading-none mb-[4px]">
              {currentTemp}°C
            </span>
            <p className="font-['Pretendard:Light',sans-serif] text-[#7c7c7c] text-[10px] whitespace-nowrap">
              최저 {minTemp}°C / 최고 {maxTemp}°C
            </p>
          </div>
        </div>

        {/* Desktop Location Area */}
        <div className="hidden md:block absolute left-0 top-[24px]">
          <h2 className="font-['Pretendard:SemiBold',sans-serif] text-[24px] text-black">
            {locationName}
          </h2>
        </div>

        {/* Desktop Star */}
        {isBookmarked && (
          <div className="hidden md:block absolute left-[206px] top-[29px]">
            <StarIcon />
          </div>
        )}

        {/* Desktop Hourly Title */}
        <p className="hidden md:block absolute font-['Pretendard:Light',sans-serif] text-[13px] text-black left-0 top-[87px]">
          시간대별 날씨
        </p>

        {/* Desktop Current Temp */}
        <div className="hidden md:block absolute right-0 top-[86px]">
           <span className="font-['Pretendard:SemiBold',sans-serif] text-[34px] leading-none">
             {currentTemp}°C
           </span>
        </div>

        {/* Desktop Min / Max Temp */}
        <p className="hidden md:block absolute font-['Pretendard:Light',sans-serif] text-[#7c7c7c] text-[13px] right-0 top-[129px] whitespace-nowrap text-right">
          최저 {minTemp}°C / 최고 {maxTemp}°C
        </p>

        {/* Hourly Data Grid (Scrollable on Mobile, Absolute on Desktop) */}
        <div className="flex gap-[14px] md:gap-[10px] md:absolute md:top-[111px] md:left-[11px] overflow-x-auto w-full md:w-auto [&::-webkit-scrollbar]:hidden">
          {hourlyForecasts.map((forecast, idx) => (
            <div key={idx} className="flex flex-col items-center min-w-[32px] shrink-0">
              <p className="font-['Pretendard:Light',sans-serif] text-[8px] md:text-[10px] text-[#7c7c7c] whitespace-nowrap">
                {forecast.time}
              </p>
              <p className="font-['Pretendard:Light',sans-serif] text-[10px] md:text-[13px] text-black whitespace-nowrap mt-[10px] md:mt-[8px]">
                {forecast.temp}°C
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
