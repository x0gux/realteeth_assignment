import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = ({ className = '', ...props }: InputProps) => {
  return (
    <input
      className={`border border-[#7c7c7c] border-solid h-[38px] rounded-[8px] px-4 font-['Pretendard:Light',sans-serif] text-[15px] text-[#7c7c7c] outline-none placeholder-[#7c7c7c] focus:border-black transition-colors w-full max-w-[492px] ${className}`}
      {...props}
    />
  );
};
