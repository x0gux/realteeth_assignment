import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  rightElement?: React.ReactNode;
}

export const Input = ({ className = '', rightElement, ...props }: InputProps) => {
  return (
    <div className={`relative w-full max-w-[492px] ${className}`}>
      <input
        className="border border-[#7c7c7c] border-solid h-[38px] rounded-[8px] pl-4 pr-[40px] font-['Pretendard:Light',sans-serif] text-[15px] text-[#7c7c7c] outline-none placeholder-[#7c7c7c] focus:border-black transition-colors w-full"
        {...props}
      />
      {rightElement && (
        <div className="absolute right-0 top-0 h-full flex items-center pr-3">
          {rightElement}
        </div>
      )}
    </div>
  );
};
