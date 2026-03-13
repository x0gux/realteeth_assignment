# 날씨 앱 — 리얼티쓰 프론트엔드 채용 과제

🔗 **배포 URL**: https://weatherapp-delta-pied.vercel.app/

---

##  프로젝트 실행 방법

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

##  구현 기능

### 1. 현재 위치 기반 날씨 자동 조회
앱 첫 진입 시 브라우저의 Geolocation API를 통해 사용자의 현재 위치(위도/경도)를 자동으로 감지하고, 해당 좌표를 기반으로 날씨 정보를 불러옵니다. 위치 권한이 거부된 경우 서울특별시를 기본값으로 표시합니다.

### 2. 날씨 정보 표시
현재 기온, 당일 최저/최고 기온, 시간대별 기온(3시간 간격, 6개 슬롯)을 화면에 표시합니다. 당일 최저/최고 기온은 `/forecast` 응답에서 오늘 날짜 데이터만 필터링해 정확하게 계산합니다.

### 3. 장소 검색
과제에서 제공한 `korea_districts.json`을 활용해 시·군·구·동 모든 단위로 장소를 검색할 수 있습니다. 검색어 입력 시 매칭되는 장소 목록이 드롭다운으로 표시되며, 항목을 선택하면 해당 장소의 날씨 정보를 조회합니다. 날씨 정보를 제공할 수 없는 경우 "해당 장소의 정보가 제공되지 않습니다."를 표시합니다.

### 4. 즐겨찾기
- 현재 조회 중인 장소를 즐겨찾기에 추가하거나 삭제할 수 있습니다.
- 최대 6개까지 등록 가능하며, 초과 시 토스트 메시지로 안내합니다.
- 즐겨찾기 카드에는 현재 기온과 당일 최저/최고 기온이 표시됩니다.
- 연필 아이콘을 클릭하면 인라인 편집 모드로 장소의 이름(별칭)을 수정할 수 있으며, Enter 또는 포커스 해제 시 저장됩니다.
- 별 아이콘 클릭 시 확인 토스트를 통해 즐겨찾기를 안전하게 삭제할 수 있습니다.
- 카드를 클릭하면 해당 장소의 상세 페이지로 이동합니다.
- 즐겨찾기 데이터는 `localStorage`에 저장되어 새로고침 후에도 유지됩니다.

### 5. 상세 페이지
즐겨찾기 카드 클릭 시 이동하는 상세 페이지에서 현재 기온, 당일 최저/최고 기온, 시간대별 기온과 함께 체감 온도, 습도, 바람, 기압 정보를 확인할 수 있습니다.

### 6. 반응형 레이아웃
Tailwind CSS의 `md:` 브레이크포인트(768px)를 기준으로 데스크탑과 모바일 레이아웃이 전환됩니다.

---

##  기술적 의사결정 및 이유

### 한국어 도시명 → 영어 변환 + 좌표 폴백 이중 전략

OpenWeatherMap API는 한국어 도시명을 직접 지원하지 않기 때문에, 한국어 지명을 영어로 변환하는 `SIDO_MAP`을 직접 정의했습니다. 하지만 시·군·구·동 단위의 세부 지명은 영어 변환이 불가능한 경우가 많아, 변환 후 API 응답이 실패하면 `CITY_COORDINATES`에 미리 정의해둔 좌표로 폴백하는 2단계 전략을 구현했습니다. 이를 통해 광역시·특별시뿐 아니라 도 단위, 시군 단위 검색에서도 날씨를 최대한 제공할 수 있도록 했습니다.

### Reverse Geocoding으로 한국어 지명 복원

Geolocation API로 얻은 좌표로 날씨를 조회하면 OpenWeatherMap이 반환하는 `name` 필드가 로마자 표기(예: "Seolman")로 나옵니다. 이를 그대로 UI에 표시하면 사용자가 현재 위치를 알아볼 수 없기 때문에, 날씨 조회와 별도로 Reverse Geocoding API(`/geo/1.0/reverse`)를 추가 호출해 `local_names.ko` 필드에서 한국어 지명을 가져오도록 했습니다.

### `/weather`의 `temp_min`/`temp_max` 대신 `/forecast` 필터링으로 당일 최저/최고 계산

`/weather` 엔드포인트의 `temp_min`/`temp_max`는 당일 전체의 최저/최고가 아니라 현재 관측소 주변의 편차값입니다. 실제 당일 최저/최고 기온을 표시하기 위해 `/forecast` 응답에서 오늘 날짜에 해당하는 슬롯만 필터링한 뒤 각각 `Math.min`, `Math.max`로 계산했습니다.

### `useMemo`로 검색 필터링 성능 최적화

`korea_districts.json`은 수천 개의 행정구역 데이터를 포함합니다. 검색어가 바뀔 때마다 전체 배열을 순회해 필터링하면 키 입력마다 불필요한 연산이 반복되기 때문에, `useMemo`로 `searchTerm`과 `districts`가 바뀔 때만 재계산하도록 했습니다.

### `useGeolocation` 로딩 상태를 이용한 날씨 요청 지연

Geolocation 응답을 기다리지 않고 바로 날씨를 요청하면 기본값(서울)으로 먼저 요청이 나간 뒤 실제 위치로 다시 요청되어 불필요한 API 호출이 2번 발생합니다. `useGeolocation`의 `isLoading` 상태를 `useWeather`의 `enabled` 옵션에 연결해, Geolocation 응답이 완료된 이후에만 날씨 요청이 시작되도록 했습니다. 단, 사용자가 검색으로 직접 위치를 선택한 경우에는 Geolocation 로딩과 무관하게 즉시 요청합니다.

### 즐겨찾기 삭제 시 확인 토스트 도입

별 아이콘 클릭 한 번으로 즐겨찾기가 바로 삭제되면 실수로 지웠을 때 복구할 방법이 없습니다. 삭제 전 확인 토스트를 띄워 의도치 않은 삭제를 방지했습니다. 브라우저 기본 `confirm()` 대신 `react-hot-toast`의 `toast.custom()`을 사용해 디자인 일관성을 유지했습니다.

### 별칭 수정을 인라인 편집으로 구현

별칭 수정을 위한 별도 모달을 만들면 컴포넌트가 늘어나고 UX 흐름이 끊깁니다. `BookmarkCard` 내부에 `isEditing` 상태를 두고, 연필 아이콘 클릭 시 텍스트를 `<input>`으로 교체하는 인라인 편집 방식을 선택했습니다. Enter 키 또는 포커스 해제(`onBlur`) 시 저장되며, Escape 키로 취소할 수 있어 키보드 사용성도 고려했습니다.

### 즐겨찾기 상태를 `localStorage`에 동기화

즐겨찾기는 새로고침 후에도 유지되어야 하는 데이터입니다. Context의 `useState` 초기값을 `localStorage`에서 읽어오는 함수로 설정하고, `useEffect`로 상태가 바뀔 때마다 `localStorage`에 동기화했습니다. 외부 라이브러리 없이 최소한의 코드로 영속성을 확보했습니다.

---

##  기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | React 19, TypeScript |
| 빌드 도구 | Vite 7 |
| 패키지 매니저 | pnpm |
| 서버 상태 관리 | TanStack Query v5 |
| 클라이언트 상태 관리 | Context API |
| 라우팅 | React Router v7 |
| 스타일링 | Tailwind CSS v4 |
| 알림 UI | react-hot-toast |
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
