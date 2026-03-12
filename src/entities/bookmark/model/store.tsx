import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

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
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.locationName === newBookmark.locationName);
      
      if (exists) {
        // Remove if it exists
        return prev.filter((b) => b.locationName !== newBookmark.locationName);
      } else {
        // Add if it doesn't exist, up to max 6
        if (prev.length >= 6) {
          alert('즐겨찾기는 최대 6개까지만 등록 가능합니다.');
          return prev;
        }
        return [...prev, newBookmark];
      }
    });
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
