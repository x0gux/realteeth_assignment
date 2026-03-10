import { useState, useMemo, useRef, useEffect } from 'react';
import { Input } from '../../../shared/ui/Input';
import { useDistricts } from '../../../entities/location/api/useDistricts';
import type { District } from '../../../entities/location/model/types';

interface SearchBarProps {
  placeholder?: string;
}

export const SearchBar = ({ placeholder = '지역명을 입력해주세요 (ex.서울 강서구,대전 은행동)' }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: districts } = useDistricts();

  const filteredResults = useMemo(() => {
    if (!searchTerm.trim() || !districts) return [];
    
    // Simple substring match for now. 
    // In a real app, you might want to consider 초성 (initial sound) search.
    return districts
      .filter((d: District) => d.fullAddress.replace(/-/g, ' ').includes(searchTerm))
      .slice(0, 10);
  }, [searchTerm, districts]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (address: string) => {
    setSearchTerm(address.replace(/-/g, ' '));
    setIsOpen(false);
    // Add logic here to update the current weather based on selection
  };

  return (
    <div className="flex justify-center w-full" ref={containerRef}>
      <div className="relative w-full max-w-[492px]">
        <Input 
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        
        {isOpen && filteredResults.length > 0 && (
          <ul className="absolute top-[44px] left-0 w-full bg-white border border-[#7c7c7c] rounded-[8px] shadow-xl z-50 max-h-[300px] overflow-y-auto overflow-x-hidden py-1">
            {filteredResults.map((result: District, index: number) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-50 cursor-pointer transition-colors text-[14px] text-black font-['Pretendard:Light',sans-serif]"
                onClick={() => handleSelect(result.fullAddress)}
              >
                {result.fullAddress.replace(/-/g, ' ')}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
