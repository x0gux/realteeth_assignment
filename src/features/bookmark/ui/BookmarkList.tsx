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
    <div className="relative border border-[#7c7c7c] border-solid h-[472px] w-full max-w-[826px] overflow-hidden rounded-[8px] bg-white">
      {/* Title */}
      <div className="absolute left-[28px] top-[24px]">
        <h2 className="font-['Pretendard:SemiBold',sans-serif] text-[24px] text-black">
          즐겨찾기 리스트
        </h2>
      </div>

      {/* Count Tracker */}
      <p className="absolute left-[196px] top-[34px] -translate-x-1/2 font-['Pretendard:Light',sans-serif] text-[#7c7c7c] text-[13px] whitespace-nowrap">
        {currentCount}/{maxCount}
      </p>

      {/* Grid of Bookmark Cards */}
      <div className="absolute top-[84px] left-[31px] grid grid-cols-3 gap-x-[42px] gap-y-[37px]">
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
