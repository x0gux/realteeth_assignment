# Realteeth Weather Dashboard

## 1. 개요 (Project Overview)
Realteeth 프론트엔드 과제 전형 제출용 날씨 대시보드 웹 애플리케이션입니다.
제공된 Figma 디자인 가이드를 준수하며, 지속 가능한 유지보수를 위해 **FSD (Feature-Sliced Design)** 아키텍처를 적용하여 모바일 및 PC 반응형으로 구현했습니다.

## 2. 기술 스택 (Tech Stack)
- **Core**: React 컴포넌트 기반 웹 개발 (with TypeScript, Vite)
- **State & Data Fetching**: TanStack Query (React Query)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM (v6)

## 3. 실행 방법 (Getting Started)

### 환경 변수 설정
OpenWeatherMap API 연동을 위해 환경 변수 설정이 필요합니다.
프로젝트 루트 디렉토리에 `.env` 파일을 생성한 후 아래와 같이 API 키를 입력하세요.

```env
VITE_WEATHER_API_KEY=42a9cf9872a24b2f4ac1573e564806f3
```

### 패키지 설치 및 실행
```bash
# 종속성 설치 (pnpm 권장, npm/yarn 사용 가능)
pnpm install

# 로컬 개발 서버 실행
pnpm run dev
```
이후 `http://localhost:5173` 에서 정상적으로 앱을 확인할 수 있습니다.

## 4. 주요 기능 상세 (Features)
- **초기 로드 (Geolocation)**: 브라우저 위치 정보 API를 활용해 최초 진입 시 접속자의 실제 위치 날씨를 우선적으로 렌더링합니다. (역지오코딩을 통해 영어 좌표를 정확한 한글 지역명으로 표시하도록 개선했습니다.)
- **위치 통합 검색 & 일치 항목 자동완성**: json 데이터를 메모리에 올려 초성/부분 일치 기반으로 국내 모든 Sido/Sigungu/Dong 행정구역 정보를 자동완성으로 제공합니다.
- **API 폴백(Fallback) 전략**: OpenWeatherMap이 모든 한글 동 단위 검색을 지원하지 않는 점을 해결하기 위해, 1차 주소 매칭이 실패할 경우 2차 좌표(위/경도) 기반 호출로 자동 전환되도록 폴백 기능을 구현했습니다.
- **즐겨찾기 (최대 6개) 및 별칭 수정**: LocalStorage를 활용하여 검색한 도시를 즐겨찾기 목록에 저장합니다. 또한, 연필 아이콘을 클릭하여 사용자가 원하는 이름으로 **별칭 수정**이 가능합니다.
- **날씨 상세 정보**: 즐겨찾기 슬롯 클릭 시 진입하는 Detail Page에서, 습도, 풍속, 기압 등 OpenWeather에서 제공하는 추가 메타데이터 및 시간대별 예보를 한 번에 조회할 수 있습니다.

## 5. 기술적 의사결정 (Technical Decisions)
- **FSD(Feature-Sliced Design) 100% 반영**: 과제 요구사항에 맞춰 App, Pages, Widgets, Features, Entities, Shared 6단계의 레이어로 모든 컴포넌트와 비즈니스 로직을 완벽하게 격리했습니다. 프로젝트가 확장되어도 도메인별 응집도를 높이고 모듈 간 의존성을 단방향으로 통제할 수 있습니다.
- **상태 관리 도구의 최적화**: 서버(API) 상태는 `TanStack Query`를 둬서 staleTime 등 브라우저 단 캐싱을 위임하고 불필요한 네트워크 스파이크를 억제했습니다. 클라이언트 상태(즐겨찾기 목록)는 가볍고 직관적인 `Context API` + `LocalStorage` 조합을 채택하여 불필요한 외부 상태관리 라이브러리(Zustand 등) 의존성을 배제했습니다.
- **Tailwind CSS 채택**: 디자인 시스템의 파편화를 막고 빠른 이터레이션을 위해 채용했습니다. 복잡한 CSS-in-JS 설정 없이 `md:` 프리픽스를 통해 데스크톱/모바일 반응형 레이아웃을 하나의 클래스 라인에서 쉽게 처리했습니다.
