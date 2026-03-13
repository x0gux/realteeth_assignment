import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import toast from 'react-hot-toast';

// Define the type for a saved bookmark
export interface Bookmark {
  id: string; // Typically the locationName or a unique ID. We'll use locationName as the unique ID for simplicity, mapped to 'id' for the UI.
  locationName: string;
  currentTemp: number;
  minTemp: number;
  maxTemp: number;
  customName?: string;
}

interface BookmarkContextType {
  bookmarks: Bookmark[];
  toggleBookmark: (bookmark: Bookmark) => void;
  isBookmarked: (locationName: string) => boolean;
  updateBookmarkName: (id: string, newName: string) => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'realteeth_bookmarks';

export const BookmarkProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state from localStorage
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Failed to parse bookmarks from localStorage', error);
      return [];
    }
  });

  // Sync back to localStorage whenever bookmarks change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (newBookmark: Bookmark) => {
    const exists = bookmarks.some((b) => b.locationName === newBookmark.locationName);
    
    if (exists) {
      // Show confirmation toast
      toast.custom((t) => (
        <div 
          className={`${
            t.visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-[20px]'
          } transition-all duration-300 transform bg-white border border-[#7c7c7c] rounded-[8px] p-[16px] flex flex-col gap-[12px] shadow-lg md:w-[320px]`}
        >
          <p className="font-['Pretendard:Medium',sans-serif] text-[15px] text-center text-black">
            정말 즐겨찾기를 취소하시겠습니까?
          </p>
          <div className="flex gap-[8px] justify-center mt-[4px]">
            <button
              onClick={() => {
                setBookmarks((prev) => prev.filter((b) => b.locationName !== newBookmark.locationName));
                toast.dismiss(t.id);
              }}
              className="px-[16px] py-[8px] bg-[#ff4d4f] text-white font-['Pretendard:Medium',sans-serif] text-[13px] rounded-[6px] hover:bg-[#ff7875] transition-colors w-[80px]"
            >
              예
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-[16px] py-[8px] bg-[#f0f0f0] text-black font-['Pretendard:Regular',sans-serif] text-[13px] rounded-[6px] hover:bg-[#d9d9d9] transition-colors w-[80px]"
            >
              아니오
            </button>
          </div>
        </div>
      ), { duration: 4000 });
    } else {
      setBookmarks((prev) => {
        // Add if it doesn't exist, up to max 6
        if (prev.length >= 6) {
          toast.error('즐겨찾기는 최대 6개까지만 등록 가능합니다.');
          return prev;
        }
        return [...prev, newBookmark];
      });
    }
  };

  const isBookmarked = (locationName: string) => {
    return bookmarks.some((b) => b.locationName === locationName);
  };

  const updateBookmarkName = (id: string, newName: string) => {
    setBookmarks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, customName: newName } : b))
    );
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked, updateBookmarkName }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};
