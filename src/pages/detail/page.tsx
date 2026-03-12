import { BackButton } from '@/shared/ui/BackButton';
import { WeatherDetailHeader } from '@/entities/weather/ui/WeatherDetailHeader';

// Placeholder data matching Figma design
const HOURLY_FORECASTS = [
  { time: '18시', temp: 3 },
  { time: '20시', temp: 3 },
  { time: '22시', temp: 3 },
  { time: '0시', temp: 3 },
  { time: '2시', temp: 3 },
  { time: '4시', temp: 3 },
];

const DetailPage = () => {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center pt-[91px] px-[60px]">
      <div className="w-full max-w-[1160px]">
        {/* Back Button Area */}
        <div className="mb-[17px]">
          <BackButton />
        </div>

        {/* Main Content Box */}
        <div className="border border-[#7c7c7c] border-solid rounded-[8px] p-[68px] min-h-[770px]">
          <WeatherDetailHeader
            locationName="충청남도 대전광역시"
            currentTemp={14}
            minTemp={3}
            maxTemp={16}
          />

          {/* Hourly Forecast */}
          <div className="flex gap-[16px] mb-[66px]">
            {HOURLY_FORECASTS.map((forecast, idx) => (
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
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
