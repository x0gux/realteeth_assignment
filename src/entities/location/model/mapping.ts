export const SIDO_MAP: Record<string, string> = {
  "서울특별시": "Seoul",
  "부산광역시": "Busan",
  "대구광역시": "Daegu",
  "인천광역시": "Incheon",
  "광주광역시": "Gwangju",
  "대전광역시": "Daejeon",
  "울산광역시": "Ulsan",
  "세종특별자치시": "Sejong",
  "경기도": "Gyeonggi-do",
  "강원특별자치도": "Gangwon-do",
  "충청북도": "Chungcheongbuk-do",
  "충청남도": "Chungcheongnam-do",
  "전라북도": "Jeollabuk-do",
  "전라남도": "Jeollanam-do",
  "경상북도": "Gyeongsangbuk-do",
  "경상남도": "Gyeongsangnam-do",
  "제주특별자치도": "Jeju-do",
  // Common specific mappings that often fail with just Do (Province)
  "경기도-수원시": "Suwon",
  "경기도-성남시": "Seongnam",
  "경기도-고양시": "Goyang",
  "경기도-용인시": "Yongin",
  "경기도-부천시": "Bucheon",
  "충청남도-천안시": "Cheonan",
  "전라북도-전주시": "Jeonju",
  "경상북도-포항시": "Pohang",
  "경상남도-창원시": "Changwon",
  "충청북도-청주시": "Cheongju",
};

export const convertToEnglishCity = (koreanLocation: string): string => {
  const parts = koreanLocation.split("-");
  
  // 광역시/특별시 직접 매핑
  const sido = parts[0];
  if (sido.includes("특별시") || sido.includes("광역시") || sido.includes("특별자치시")) {
    return SIDO_MAP[sido] || sido;
  }

  // 시도-시군 조합 매핑 (예: "경기도-수원시" → "Suwon")
  if (parts.length >= 2) {
    const sidoSigungu = `${parts[0]}-${parts[1]}`;
    if (SIDO_MAP[sidoSigungu]) {
      return SIDO_MAP[sidoSigungu];
    }
  }

  // 기본값: 시도명 반환
  return SIDO_MAP[sido] || sido;
};

export const CITY_COORDINATES: Record<string, { lat: number; lon: number }> = {
  "서울특별시": { lat: 37.5665, lon: 126.9780 },
  "부산광역시": { lat: 35.1796, lon: 129.0756 },
  "대구광역시": { lat: 35.8714, lon: 128.6014 },
  "인천광역시": { lat: 37.4563, lon: 126.7052 },
  "광주광역시": { lat: 35.1595, lon: 126.8526 },
  "대전광역시": { lat: 36.3504, lon: 127.3845 },
  "울산광역시": { lat: 35.5384, lon: 129.3114 },
  "세종특별자치시": { lat: 36.4800, lon: 127.2890 },
  "경기도": { lat: 37.2636, lon: 127.0286 }, // Defaulting to Suwon for Gyeonggi
  "강원특별자치도": { lat: 37.8813, lon: 127.7298 }, // Chuncheon
  "충청북도": { lat: 36.6360, lon: 127.4913 }, // Cheongju
  "충청남도": { lat: 36.6588, lon: 126.6728 }, // Hongseong
  "전라북도": { lat: 35.8242, lon: 127.1480 }, // Jeonju
  "전라남도": { lat: 34.8163, lon: 126.4629 }, // Muan
  "경상북도": { lat: 36.5684, lon: 128.7294 }, // Andong
  "경상남도": { lat: 35.2383, lon: 128.6924 }, // Changwon
  "제주특별자치도": { lat: 33.4996, lon: 126.5312 }, // Jeju City
  "경기도-수원시": { lat: 37.2636, lon: 127.0286 },
  "경기도-성남시": { lat: 37.4201, lon: 127.1262 },
  // ... add more as needed
};

export const getCityCoordinates = (koreanLocation: string) => {
  const parts = koreanLocation.split("-");

  // 1단계: "시도-시군" 조합으로 찾기
  if (parts.length >= 2) {
    const sidoSigungu = `${parts[0]}-${parts[1]}`;
    if (CITY_COORDINATES[sidoSigungu]) {
      return CITY_COORDINATES[sidoSigungu];
    }
  }

  // 2단계: 시군명만으로 찾기
  if (parts.length >= 2) {
    const sigungu = parts[1];
    const match = Object.entries(CITY_COORDINATES).find(([key]) =>
      key.endsWith(`-${sigungu}`)
    );
    if (match) return match[1];
  }

  // 3단계: 시도명으로 찾기
  return CITY_COORDINATES[parts[0]];
};
