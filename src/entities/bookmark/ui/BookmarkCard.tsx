import { useNavigate } from 'react-router-dom';
import { StarIcon } from '../../../shared/ui/Icon';
import { useBookmarks } from '../../../entities/bookmark/model/store';

interface BookmarkCardProps {
  id: string;
  locationName: string;
  currentTemp: number;
  minTemp: number;
  maxTemp: number;
}

export const BookmarkCard = ({
  id,
  locationName,
  currentTemp,
  minTemp,
  maxTemp,
}: BookmarkCardProps) => {
  const navigate = useNavigate();
  const { toggleBookmark } = useBookmarks();

  const handleCardClick = () => {
    navigate(`/detail/${id}`, { state: { locationName } });
  };

  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigating to detail page
    toggleBookmark({ id, locationName, currentTemp, minTemp, maxTemp });
  };

  return (
    <div 
      onClick={handleCardClick}
      className="relative border border-[#7c7c7c] border-solid h-[106px] w-full md:w-[226px] overflow-hidden rounded-[8px] cursor-pointer hover:shadow-md transition-shadow"
    >
      {/* Current Temp */}
      <div className="absolute left-[15px] md:left-[7px] top-[20px] md:top-[16px]">
        <span className="font-['Pretendard:SemiBold',sans-serif] text-[21px] leading-none text-black">
          {currentTemp}°C
        </span>
      </div>

      {/* Min/Max Temp */}
      <p className="absolute w-full text-center font-['Pretendard:Light',sans-serif] text-[#7c7c7c] text-[10px] top-[48px] md:top-[44px] left-0">
        최저 {minTemp}°C / 최고 {maxTemp}°C
      </p>

      {/* Divider */}
      <div className="absolute border-t border-[#7c7c7c] border-solid h-px w-full left-0 top-[71px]" />

      {/* Location Name */}
      <p className="absolute w-full flex justify-center font-['Pretendard:Light',sans-serif] text-[#7c7c7c] text-[13px] top-[80px] left-0">
        <span className="md:ml-0 md:mr-0 mr-[40px] pl-[10px]">{locationName}</span>
      </p>

      {/* Icons */}
      <div className="absolute right-[36px] md:right-[35px] top-[81px] w-[14px] h-[14px] cursor-pointer">
        {/* Pencil SVG placeholder */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-[#7c7c7c]">
          <path d="M12 20h9"></path>
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
        </svg>
      </div>

      <div className="absolute right-[16px] md:right-[9px] top-[78px] w-[20px] h-[20px]">
        <StarIcon filled={true} onClick={handleStarClick} />
      </div>
    </div>
  );
};
