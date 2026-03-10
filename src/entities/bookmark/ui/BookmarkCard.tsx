import { StarIcon } from '../../../shared/ui/Icon';

interface BookmarkCardProps {
  locationName: string;
  currentTemp: number;
  minTemp: number;
  maxTemp: number;
}

export const BookmarkCard = ({
  locationName,
  currentTemp,
  minTemp,
  maxTemp,
}: BookmarkCardProps) => {
  return (
    <div className="relative border border-[#7c7c7c] border-solid h-[106px] w-[226px] overflow-hidden rounded-[8px]">
      {/* Current Temp */}
      <div className="absolute left-[7px] top-[16px]">
        <span className="font-['Pretendard:SemiBold',sans-serif] text-[21px] leading-none text-black">
          {currentTemp}°C
        </span>
      </div>

      {/* Min/Max Temp */}
      <p className="absolute w-full text-center font-['Pretendard:Light',sans-serif] text-[#7c7c7c] text-[10px] top-[44px] left-0">
        최저 {minTemp}°C / 최고 {maxTemp}°C
      </p>

      {/* Divider */}
      <div className="absolute border-t border-[#7c7c7c] border-solid h-px w-full left-0 top-[71px]" />

      {/* Location Name */}
      <p className="absolute w-full text-center font-['Pretendard:Light',sans-serif] text-[#7c7c7c] text-[13px] top-[80px] left-0">
        {locationName}
      </p>

      {/* Icons */}
      <div className="absolute left-[177px] top-[81px] w-[14px] h-[14px] cursor-pointer">
        {/* Pencil SVG placeholder */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-[#7c7c7c]">
          <path d="M12 20h9"></path>
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
        </svg>
      </div>

      <div className="absolute left-[197px] top-[78px] w-[20px] h-[20px]">
        <StarIcon />
      </div>
    </div>
  );
};
