import { Input } from '../../../shared/ui/Input';

interface SearchBarProps {
  placeholder?: string;
}

export const SearchBar = ({ placeholder = '지역명을 입력해주세요 (ex.서울 강서구,대전 은행동)' }: SearchBarProps) => {
  return (
    <div className="flex justify-center w-full">
      <Input placeholder={placeholder} />
    </div>
  );
};
