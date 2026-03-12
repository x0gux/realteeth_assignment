import { useNavigate } from 'react-router-dom';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-[10px] border border-[#7c7c7c] border-solid h-[41px] px-[20px] rounded-[8px] cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 12L6 8L10 4"
          stroke="#7C7C7C"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-['Pretendard:Light',sans-serif] text-[#7c7c7c] text-[16px]">
        뒤로가기
      </span>
    </button>
  );
};
