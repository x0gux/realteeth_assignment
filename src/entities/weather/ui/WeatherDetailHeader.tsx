interface WeatherDetailHeaderProps {
  locationName: string;
  currentTemp: number;
  minTemp: number;
  maxTemp: number;
}

export const WeatherDetailHeader = ({
  locationName,
  currentTemp,
  minTemp,
  maxTemp,
}: WeatherDetailHeaderProps) => {
  return (
    <div className="flex justify-between items-start w-full mb-[40px]">
      <div>
        <h1 className="font-['Pretendard:SemiBold',sans-serif] text-[24px] text-black">
          {locationName}
        </h1>
        <p className="font-['Pretendard:Light',sans-serif] text-[13px] text-black mt-[16px]">
          시간대별 날씨
        </p>
      </div>
      <div className="flex flex-col items-end">
        <span className="font-['Pretendard:SemiBold',sans-serif] text-[34px] leading-none mb-[8px]">
          {currentTemp}°C
        </span>
        <p className="font-['Pretendard:Light',sans-serif] text-[#7c7c7c] text-[13px] whitespace-nowrap">
          최저 {minTemp}°C / 최고 {maxTemp}°C
        </p>
      </div>
    </div>
  );
};
