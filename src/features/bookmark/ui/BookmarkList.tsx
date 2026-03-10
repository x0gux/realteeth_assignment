import { BookmarkCard } from '../../../entities/bookmark/ui/BookmarkCard';

interface BookmarkItem {
  id: string;
  locationName: string;
  currentTemp: number;
  minTemp: number;
  maxTemp: number;
}

interface BookmarkListProps {
  bookmarks: BookmarkItem[];
  currentCount: number;
  maxCount: number;
}

export const BookmarkList = ({ bookmarks, currentCount, maxCount }: BookmarkListProps) => {
  return (
    <div className="relative border border-[#7c7c7c] border-solid w-full max-w-[826px] overflow-hidden rounded-[8px] bg-white px-[26px] py-[23px] md:px-0 md:py-0 md:h-[472px]">
      {/* Title */}
      <div className="flex items-center gap-[46px] mb-[36px] md:mb-0 md:absolute md:left-[28px] md:top-[24px]">
        <h2 className="font-['Pretendard:SemiBold',sans-serif] text-[20px] md:text-[24px] text-black">
          즐겨찾기 리스트
        </h2>
        <p className="font-['Pretendard:Light',sans-serif] text-[#7c7c7c] text-[10px] md:text-[13px] whitespace-nowrap md:absolute md:left-[196px] md:top-[10px] md:-translate-x-1/2">
          {currentCount}/{maxCount}
        </p>
      </div>

      {/* Grid of Bookmark Cards */}
      <div className="flex flex-col gap-y-[38px] md:absolute md:top-[84px] md:left-[31px] md:grid md:grid-cols-3 md:gap-x-[42px] md:gap-y-[37px]">
        {bookmarks.map((bookmark) => (
          <BookmarkCard
            key={bookmark.id}
            locationName={bookmark.locationName}
            currentTemp={bookmark.currentTemp}
            minTemp={bookmark.minTemp}
            maxTemp={bookmark.maxTemp}
          />
        ))}

        {/* Empty states or placeholders can optionally be handled here depending on functionality */}
      </div>
    </div>
  );
};
