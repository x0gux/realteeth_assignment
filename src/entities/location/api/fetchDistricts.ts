// src/entities/location/api/fetchDistricts.ts
import type { District } from '../model/types';

export const fetchDistricts = async (): Promise<District[]> => {
  const response = await fetch('/korea_districts.json');
  
  if (!response.ok) {
    throw new Error('행정구역 데이터를 불러오는데 실패했습니다.');
  }

  const data: string[] = await response.json();
  
  // Transform flat string array into District objects
  return data.map((item) => {
    const parts = item.split('-');
    return {
      fullAddress: item,
      sido: parts[0] || '',
      sigungu: parts[1] || '',
      dong: parts[2] || '',
    };
  });
};
