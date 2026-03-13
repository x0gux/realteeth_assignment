# 날씨 앱 — 리얼티쓰 프론트엔드 채용 과제
 
## 프로젝트 실행 방법
 
### 사전 요구사항
 
- Node.js 18 이상
- pnpm
 
### 환경 변수 설정
 
프로젝트 루트에 `.env` 파일을 생성하고 아래 내용을 입력합니다.
 
```
VITE_WEATHER_API_KEY=your_openweathermap_api_key
```
 
> OpenWeatherMap API 키는 [https://openweathermap.org/api](https://openweathermap.org/api)에서 무료로 발급받을 수 있습니다.
 
### 설치 및 실행
 
```bash
# 의존성 설치
pnpm install
 
# 개발 서버 실행
pnpm dev
 
# 프로덕션 빌드
pnpm build
 
# 빌드 결과물 미리보기
pnpm preview
```
 
---
 
## ✨ 구현 기능
 
### 1. 현재 위치 기반 날씨 자동 조회
앱 첫 진입 시 브라우저의 Geolocation API를 통해 사용자의 현재 위치(위도/경도)를 감지하고, 해당 좌표를 기반으로 날씨 정보를 자동으로 불러옵니다. 위치 권한이 거부된 경우 서울특별시를 기본값으로 표시합니다.
 
### 2. 날씨 정보 표시
현재 기온, 당일 최저/최고 기온, 시간대별 기온(3시간 간격, 6개 슬롯)을 화면에 표시합니다.
 
### 3. 장소 검색
과제에서 제공한 `korea_districts.json`을 활용해 시·군·구·동 모든 단위로 장소를 검색할 수 있습니다. 검색어 입력 시 매칭되는 장소 목록이 드롭다운으로 표시되며, 항목을 선택하면 해당 장소의 날씨 정보를 조회합니다. 날씨 정보를 제공할 수 없는 경우 안내 메시지를 표시합니다.
 
### 4. 즐겨찾기
- 현재 조회 중인 장소를 즐겨찾기에 추가하거나 삭제할 수 있습니다.
- 최대 6개까지 등록 가능하며, 초과 시 안내 메시지를 표시합니다.
- 즐겨찾기 카드에는 현재 기온과 당일 최저/최고 기온이 표시됩니다.
- 즐겨찾기에 추가된 장소의 이름(별칭)을 수정할 수 있습니다.
- 카드를 클릭하면 해당 장소의 상세 페이지로 이동합니다.
- 즐겨찾기 데이터는 `localStorage`에 저장되어 새로고침 후에도 유지됩니다.
 
### 5. 상세 페이지
즐겨찾기 카드 클릭 시 이동하는 상세 페이지에서 현재 기온, 당일 최저/최고 기온, 시간대별 기온을 확인할 수 있습니다.
 
### 6. 반응형 레이아웃
데스크탑(md: 768px 이상)과 모바일 뷰에 맞추어 레이아웃이 전환됩니다.
 
---
 
## 🏗️ 기술적 의사결정 및 이유
 
### FSD (Feature-Sliced Design) 아키텍처
컴포넌트 단위가 아닌 **기능 단위로 코드를 응집**시키기 위해 FSD를 채택했습니다. `app → pages → widgets → features → entities → shared` 레이어 구조를 따르며, 상위 레이어는 하위 레이어에만 의존하도록 설계해 코드의 방향성과 역할을 명확히 했습니다.
 
### TanStack Query
날씨 데이터와 행정구역 데이터를 서버 상태로 분리하여 관리하기 위해 TanStack Query를 사용했습니다. `staleTime` 설정으로 불필요한 API 재호출을 방지하고, `enabled` 옵션으로 위치 정보가 확정되기 전까지 날씨 요청을 지연시켜 불필요한 네트워크 요청을 줄였습니다. 행정구역 JSON은 변경될 일이 없으므로 `staleTime: Infinity`로 설정해 최초 1회만 로드합니다.
 
### OpenWeatherMap API
무료 플랜에서 현재 날씨(`/weather`)와 3시간 단위 예보(`/forecast`) API를 모두 지원하며, Reverse Geocoding API도 제공해 좌표를 한국어 지명으로 변환할 수 있어 선택했습니다. 한국어 도시명 → 영어 변환 실패 시 좌표 기반으로 폴백하는 이중 방어 로직을 구현했습니다.
 
### Context API (전역 상태)
즐겨찾기와 선택된 위치는 여러 컴포넌트에서 공유되는 클라이언트 상태이므로 외부 라이브러리 없이 Context API로 관리했습니다. 서버 상태는 TanStack Query, 클라이언트 상태는 Context API로 역할을 분리했습니다.
 
### Vite + pnpm
빠른 개발 서버 시작과 HMR을 위해 Vite를 사용했고, 디스크 효율적인 패키지 관리를 위해 pnpm을 채택했습니다.
 
---
 
## 🛠️ 기술 스택
 
| 분류 | 기술 |
|------|------|
| 프레임워크 | React 19, TypeScript |
| 빌드 도구 | Vite 7 |
| 패키지 매니저 | pnpm |
| 서버 상태 관리 | TanStack Query v5 |
| 클라이언트 상태 관리 | Context API |
| 라우팅 | React Router v7 |
| 스타일링 | Tailwind CSS v4 |
| 날씨 API | OpenWeatherMap API |
| 아키텍처 | Feature-Sliced Design (FSD) |
 
---
 
## 📁 프로젝트 구조
 
```
src/
├── app/                          # 앱 진입점, 전역 설정
│   ├── App.tsx                   # 라우팅 설정
│   ├── main.tsx                  # Provider 조합, 앱 마운트
│   └── index.css
├── pages/                        # 페이지 단위 컴포넌트
│   ├── home/page.tsx             # 홈 페이지
│   └── detail/page.tsx          # 날씨 상세 페이지
├── widgets/                      # 페이지 조합 위젯
│   └── home-dashboard/
│       └── ui/HomeDashboardWidget.tsx
├── features/                     # 사용자 인터랙션 단위 기능
│   ├── bookmark/ui/BookmarkList.tsx
│   └── search-location/ui/SearchBar.tsx
├── entities/                     # 도메인 엔티티
│   ├── weather/                  # 날씨 API, UI 컴포넌트
│   ├── location/                 # 행정구역 데이터, 위치 상태
│   └── bookmark/                 # 즐겨찾기 상태, 카드 UI
└── shared/                       # 공통 훅, UI 컴포넌트
    ├── hooks/useGeolocation.ts
    └── ui/
```
