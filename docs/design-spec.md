# 포트폴리오 디자인 명세 v2 — 「만지는 설계도」

> Flutter 모바일 엔지니어(5년차) 이직용 포트폴리오 웹사이트 · 엘리스 지원용
> 본 문서는 v1 설계안에 대한 4개 관점(ia-ux / motion / layout / feasibility) 검토와 콘셉트 심사 결과를 통합한 **구현 착수용 최종 명세**다.
> 스택 전제: Next.js 16(App Router, SSG) + TypeScript + MUI 9 단독(sx+styled, Emotion) + Vercel. 콘텐츠 한국어.

---

## 0. 불변 제약 (모든 구현 판단의 상위 규칙)

1. 화면 캡처 이미지는 **분저장(공개 출시 앱)만**. APC/커머스 등 내부 시스템 화면 금지 — 일반화된 기술 도식으로만 표현.
2. 회사 실데이터·실지표·도메인 비밀 금지. 일반화된 기술 패턴만.
3. 모든 프로젝트 서술은 **문제 → 내 의사결정/트레이드오프 → 결과** 흐름 유지.
4. 정량 수치는 출처 명시 — 본 명세에서는 **각주 시스템**(§10.2)으로 시스템화.
5. 스타일링은 MUI 단독(sx+styled, createTheme 토큰). 애니메이션 전용 라이브러리는 §6의 결정에 따름.
6. 모바일 반응형(MUI breakpoints, 360px 기준) + 접근성(prefers-reduced-motion 포함) 필수.
7. SSG 유지, 콘텐츠 언어 한국어.

---

## 1. 콘셉트 개요와 디자인 원칙

### 1.1 콘셉트 — 만지는 설계도

**태그라인: 설명하지 않고 증명한다.**
분저장 제스처 캔버스를 면접관의 손끝에서 직접 작동시키고, 나머지 프로젝트는 도면(blueprint)처럼 차분하게 받친다.

- **이중 정체성**: '종이 다이어리(분저장) × 기술 도면(blueprint)'. 캡처가 분저장뿐이라는 제약을 *"실물은 만지게 하고, 아키텍처는 도면으로 말한다"*는 비주얼 논리로 전환한다.
- **카드 비주얼 2타입 이원화**:
  - **실물(Artifact)**: 분저장 — 실기기 목업 캡처 + 인터랙티브 데모.
  - **도면(Blueprint)**: APC 키오스크 / SSE / Redis — 토큰 색 모노라인 미니 도식 + 모눈 도트 배경.
- **시그니처 모티프 1개**: 모눈 도트 그리드(radial-gradient 도트, divider 토큰 색). 다이어리 모눈과 기술 도면을 동시에 상징. 적용처는 **도면형 카드 배경 + 제스처 데모 스테이지 배경 2곳으로 한정**.

### 1.2 디자인 원칙 5조

1. **증명 우선(Proof-first)**: 가장 강한 증거(제스처 데모 티저, 정량 수치 3개)를 첫 스크롤 안에 배치한다. 슬로건으로 시작하지 않는다.
2. **1 시그니처 + 절제된 보조 모션**: 인터랙션 예산은 제스처 캔버스 데모 1개에 집중. 보조 모션은 "한 화면에 동시에 움직이는 요소 1종" 규칙으로 절제. 모션은 장식이 아니라 **기술력의 증거물**로만 존재한다.
3. **결론 선행(Conclusion-first)**: 상세 페이지는 문제 한 문장 → ABSTRACT(TL;DR) → 근거 순. 끝까지 읽지 않는 면접관에게도 설득 포인트가 전달되게 한다.
4. **출처는 수치와 동시에**: 모든 정량 수치는 위첨자 각주와 함께 처음부터 노출. 수치가 먼저 튀고 출처가 나중에 뜨는 연출 금지.
5. **토큰 단일 소스**: 색·타이포·간격·모션 duration/easing 전부 createTheme 토큰만 참조. 이 시스템 자체를 푸터 '빌드 노트'에 공개해 메타 증거로 전환한다.

### 1.3 하지 않을 것 (명시적 스코프 결정)

- **다크 모드 없음(라이트 단독)** — 토큰 주입·사전 렌더 SVG 파이프라인 단순화를 위한 트레이드오프 결정. 빌드 노트에 기록.
- **금지 연출 목록**: 커서 추종 효과 / 배경 파티클·그라디언트 애니메이션 / Hero 타이핑 효과 / 패럴랙스·스크롤 스크럽 / 무한 루프 모션 / 3초 이상 등장 시퀀스 / box-shadow 애니메이션 / 숙련도 게이지·별점.
- 풀 페이지 전환 애니메이션, 섹션 간 morphing, exit 애니메이션 — 투자수익 낮음, 범위 제외.
- 인터랙티브 데모 총량 **상한 2개**(제스처 데모 + 조건부 SSE 시뮬레이터).

---

## 2. 디자인 토큰 — createTheme 매핑

모든 토큰은 `src/theme/` 아래 단일 소스로 관리한다. `createTheme({ cssVariables: true })` 필수 — 사전 렌더 SVG·커스텀 도식이 `var(--mui-palette-*)`를 직접 참조할 수 있게 한다.

### 2.1 팔레트 (`palette`)

```ts
palette: {
  mode: 'light',                       // 다크 모드 없음 (스코프 결정)
  background: {
    default: '#FAFAF8',                // 종이 질감 오프화이트 — 순백 금지, 다이어리 정체성
    paper:   '#FFFFFF',                // 카드 서피스
  },
  text: {
    primary:   '#1B2A44',              // 순흑 대신 잉크 네이비
    secondary: '#51607A',              // 본문 보조 (primary 대비 4.5:1 이상 유지)
  },
  primary:   { main: '#13294B', contrastText: '#FAFAF8' },  // 잉크 네이비 — MUI 기본 #1976d2와 확실히 구분
  secondary: { main: '#2563EB' },      // 포인트 블루 — CTA·링크·데이터 강조 전용, 화면당 1~2개 요소로 총량 제한
  success:   { main: '#16A34A' },      // SSE 연결 상태 점 전용
  divider:   '#E3E1D8',               // 종이 톤 보더 — 카드는 elevation 대신 1px solid divider
}
```

- **풀블리드 메트릭 밴드**: `primary.main` 배경 + `#FAFAF8` 텍스트의 inverse 서피스.
- 포인트 블루 사용처 화이트리스트: primary CTA 버튼, 텍스트 링크, 데이터 강조(차트 after 바, 라이브 수치). 그 외 금지.

### 2.2 서피스 규칙 (`shadows` / `shape` / `components.styleOverrides`)

```ts
shadows: Array(25).fill('none'),       // elevation 그림자 전면 무효화
shape: { borderRadius: 0 },            // 직각 — '도면' 언어. 중간값 8px가 가장 템플릿스럽다는 진단 반영
```

- 모든 카드·버튼·칩은 **플랫 + 1px solid divider 보더**.
- `components.styleOverrides`로 `MuiButton` / `MuiCard` / `MuiChip` / `MuiDivider` / `MuiPaper` 재정의: 그림자 제거, 보더 통일, hover는 §5 마이크로 인터랙션 규칙 준수(elevation 전환 무효화).
- **radius 0 유일한 예외**: 제스처 데모의 제어점 핸들만 원형(`borderRadius: '50%'`) — 터치 어포던스라는 기능적 이유. 코드에 주석으로 사유 명시.
- '차갑고 미완성' 리스크 상쇄: 종이 오프화이트 배경 + 모눈 도트 모티프 + 잉크 네이비 텍스트 + 한글 타이포의 온기. 보더·간격 토큰을 엄격히 통일해 '미완성'이 아니라 '도면'으로 읽히게 한다.

### 2.3 타이포그래피 (`typography`)

폰트 패밀리는 next/font의 CSS 변수로 연결한다(§8): `--font-pretendard`, `--font-mono`.

| 토큰(variant) | 폰트 | 크기 | 비고 |
|---|---|---|---|
| `h1` (Hero 디스플레이) | Pretendard 800 | `clamp(2.25rem, 6vw, 4.25rem)` | letter-spacing -0.02em, word-break: keep-all |
| `h2` (섹션 타이틀) | Pretendard 700 | `clamp(1.75rem, 4vw, 2.75rem)` | 동상 |
| `h3` (상세 페이지 '문제 한 문장' 오프닝) | Pretendard 700 | `clamp(1.5rem, 3.5vw, 2.25rem)` | 케이스별 에디토리얼 훅 |
| `body1` | Pretendard 400 | 16~17px (xs 16 / md 17) | line-height 1.7, word-break 기본값(keep-all은 제목만) |
| `body2` | Pretendard 400 | 0.875rem | 보조 설명 |
| `overline` (커스텀) | JetBrains Mono 500 | 0.75rem | letter-spacing 0.08em, '01 / UI ENGINEERING' 식 섹션·강점 라벨. **Highlights 섹션의 대체물** |
| `metric` (커스텀 variant) | JetBrains Mono 700 | `clamp(2.5rem, 7vw, 5rem)` | `font-variant-numeric: tabular-nums` |
| `figcaption` (커스텀) | JetBrains Mono 400 | 0.75rem | 'FIG. n — …' 도판 캡션 |
| `footnote` (커스텀) | JetBrains Mono 400 | 0.8rem | 각주 블록 본문 |
| `footnoteRef` (커스텀) | JetBrains Mono 500 | 0.65em, super | 위첨자 각주 번호 |

- **모노 영역 콘텐츠 규칙**: JetBrains Mono는 라틴 전용 → 모노 영역에는 **영문·숫자만** 배치. 모노 폰트 스택에 Pretendard 폴백 명시.
- 커스텀 variant는 `declare module '@mui/material/styles'`로 타입 확장(any 금지 컨벤션 준수).

### 2.4 간격·브레이크포인트 (`spacing` / `breakpoints` / 커스텀 토큰)

- `spacing: 8` (8px 베이스).
- 섹션 수직 패딩은 **명명 토큰 2단계**로 전 섹션 통일: `theme.sectionSpacing = { xs: 8, md: 15 }` (64px / 120px). 페이지마다 들쭉날쭉해지는 것 방지.
- breakpoints: MUI 기본(xs 0 / sm 600 / md 900 / lg 1200 / xl 1536). 디자인 검증 기준 뷰포트: **360×640(모바일 1차), 1440(데스크톱)**.
- 터치 타깃 최소 44×44px.

### 2.5 모션 토큰 (`transitions` 커스텀)

```ts
transitions: {
  duration: {
    hover: 150,        // 카드 보더·배경 전환
    press: 180,        // active scale(0.985) 프레스
    reveal: 240,       // 벤토 카드 리빌
    shared: 250,       // View Transitions 공유 요소
    bar: 700,          // before/after 바 수축 (600~800ms 범위 내)
    diagramNode: 80,   // 도식 노드 stagger 간격
  },
  easing: {
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',   // 등장·수축
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)',  // 호버·프레스
  },
}
```

**모든 duration/easing은 이 토큰만 참조한다. 하드코딩 금지.** (타입 확장 포함)

### 2.6 모눈 도트 모티프

```css
background-image: radial-gradient(var(--mui-palette-divider) 1px, transparent 1px);
background-size: 16px 16px;
```

적용처 2곳 한정: 도면형 카드 배경, 제스처 데모 스테이지 배경.

---

## 3. 정보 구조·레이아웃 시스템

### 3.1 사이트 맵과 글로벌 내비게이션

```
/                         홈 (4섹션 원페이지)
/projects/diary-canvas    분저장 제스처 캔버스 (대표작)
/projects/kiosk-ota       APC 키오스크 watchdog + Shorebird OTA
/projects/realtime-sse    SSE 실시간 파이프라인
/projects/redis-ranking   Redis 랭킹 캐싱
```

- **sticky 헤더(전 페이지 공통)**: `[Projects(드롭다운: 4개 케이스) / Experience / Contact / 이력서 다운로드]`. 상세 페이지에서도 동일 유지 — 프로젝트 간 1클릭 이동.
- 모바일 헤더: 최소 **'이력서'·'연락' 두 액션 고정** + 햄버거 메뉴.
- 상세 페이지 하단: **prev/next 케이스 내비 + Contact CTA** — 막다른 길 제거(두 번째 프로젝트 열람률 방어).

### 3.2 홈 레이아웃 — 4섹션, 데스크톱 4~5스크린 이내

#### 섹션 1 — Hero (2단)

- **좌측**: 이름 · **'Flutter 모바일 엔지니어 5년차' 명시** · 포지셔닝 한 줄: *"사용자가 매일 쓰는 앱의 UI 품질과 무중단 운영을 책임져 온 Flutter 엔지니어"* (분저장 B2C 품질 + 키오스크 OTA 운영 안정성 → 엘리스 요구 역량과 자연 연결, 회사명 직접 언급 없음).
- **마이크로 스탯 3개** (모노, tabular-nums, 위첨자 각주¹²³ 동시 표기):
  - `Google Play 누적 약 1만 DL¹`
  - `40ms → 1ms²`
  - `OTA 분 단위 반영³`
  - Hero 하단에 각주 블록: `¹ Google Play 공개 지표 · ² 합성 데이터 50만 건 시뮬레이션 기준 · ³ Dart 코드 변경 기준, Shorebird patch`
- **CTA 2개 분리**: primary `대표 케이스 스터디 보기`(→ /projects/diary-canvas), secondary `이력서·연락`.
- **우측**: 분저장 실기기 목업 **정지 캡처**(공개 출시 앱임을 시각 강조). 데모는 Hero에 두지 않는다 — 첫 화면 로딩·집중도 보호. md 미만에서는 숨김.
- Hero 텍스트는 **리빌 애니메이션 제외 — 항상 즉시 표시**.
- 360×640 폴드 안에 헤드라인+포지셔닝+CTA가 들어와야 한다.

#### 섹션 2 — 벤토 Projects (비대칭 그리드 = 동선 설계)

- CSS Grid 기반 비대칭 벤토: **분저장 featured 2×2 대형 셀** + 키오스크/SSE/Redis 소형 셀 3개.
- **featured 셀(실물 타입)**: 좌 = 실기기 목업 캡처, 우 = **제스처 데모 티저 스테이지**(모눈 배경 + `DRAG THE HANDLE` 모노 라벨 + 'FIG. 1' 캡션). 클릭 0회로 시그니처 도달.
- **소형 셀 3개(도면 타입)**: 모눈 도트 배경 + 토큰 색 모노라인 **카드 전용 자체 제작 미니 도식**(Mermaid 축소 재사용 금지, 3~4노드 수준) — 키오스크: watchdog 루프 / SSE: 스트림 라인+재연결 점선 / Redis: before·after 막대 2개.
- **셀 내부 구성 통일**: `[강점 오버라인 라벨(모노) → 훅 헤드라인 → 핵심 수치 1개+각주 → 미니 비주얼 → CTA '의사결정 과정 보기 →']`
  - 훅 헤드라인(결과·긴장감): 분저장 *"손가락 하나로 회전·확대 — atan2로 푼 캔버스 제스처"* / 키오스크 *"키오스크가 죽어도 스스로 복귀하는 watchdog"* / Redis *"매 요청 40ms 집계 쿼리를 1ms 캐시 조회로"* / SSE *"입고-가공-출고를 지연 없이 — 끊겨도 스스로 잇는 SSE 파이프라인"*
  - 강점 오버라인: `01 / UI ENGINEERING`, `02 / ARCHITECTURE`, `03 / REALTIME`, `04 / PERFORMANCE` — **삭제된 Highlights 섹션의 강점 키워드를 여기로 흡수**.
- **5분 추천 동선**: 카드에 ①②③ 번호 + 섹션 상단 마이크로카피 한 줄: *"5분이라면 ① 캔버스 → ② 키오스크 OTA → ③ Experience 순서를 권합니다."*

#### 섹션 3 — 풀블리드 메트릭 밴드 (inverse)

- `primary.main` 배경 + `#FAFAF8` 텍스트. contained 흐름을 끊는 시각적 호흡.
- 초대형 모노 숫자(`metric` variant) + 위첨자 각주, 밴드 하단에 각주 블록. **출처는 처음부터 숫자와 동시 노출**.
- 콘텐츠는 그리드 정렬 유지, 배경만 브레이크아웃(구현 비용 최소화).

#### 섹션 4 — Experience + Skills + Contact (한 뷰포트)

- **Experience 컴팩트 타임라인**: 항목당 `회사 · 기간 · 역할 한 줄 · 관련 케이스 스터디 링크`만. 상세 서술은 전부 프로젝트 페이지에 위임(3중 중복 차단).
- **Skills**: 강점 축 분류 칩 3그룹 — `UI/렌더링`, `배포·운영`, `데이터·성능`. **칩 클릭 → 해당 상세 페이지 앵커**(예: 'Shorebird' → /projects/kiosk-ota#decision). 게이지·별점 금지. 한 뷰포트 이내.
- **Contact**: 이메일·GitHub·이력서 다운로드 + **'함께 만들고 싶은 것' 한 단락**(지원 동기 선답).
- **푸터 '빌드 노트' 링크**: 이 사이트의 성능 수치(Lighthouse, 출처 명시), 60fps 규칙(transform/opacity만·rAF 배칭·will-change 구간 부여), 토큰·reduced-motion 일원화 시스템, '다크 모드 없음' 트레이드오프 결정을 짧게 공개 — 설계·성능 서사의 메타 증거.

### 3.3 상세 페이지 — 결론 선행 템플릿

공통 골격(순서 고정):

1. **오프닝**: '문제 한 문장'을 display 타이포(h3 스케일)로 — 제목 블록이 아니라 문제 문장이 페이지를 연다.
2. **ABSTRACT 박스(TL;DR)**: `문제 한 줄 / 내 선택 한 줄 / 결과 수치 한 줄(각주 포함)` 3행 고정. 보더 1px 박스, 최상단 고정 배치.
3. **개요 메타**: 역할·기간·스택 (좌측 레일에 상주).
4. **문제**: 산문, 65~70ch.
5. **의사결정·트레이드오프**: 산문 금지 — **'고려한 대안 vs 선택안 vs 이유' 비교 표** + 핵심 도식(FIG. n).
6. **결과**: 수치 + 각주 블록.
7. **회고**: 짧게.
8. **prev/next 케이스 내비 + Contact CTA**.

레이아웃:

- md 이상 **2열**: 좌측 스티키 레일(ToC — IntersectionObserver 현재 섹션 하이라이트 + 역할·기간·스택 메타) / 우측 본문 `max-width: 70ch`(MUI Container 기본 폭은 본문에 너무 넓음).
- 모바일: 스티키 ToC → 앱바 아래 **가로 스크롤 칩 바**로 변환.
- **분량 상한: 케이스당 데스크톱 3~4화면** — 콘텐츠 규칙으로 명문화(장문화 가드레일).

**페이지별 핵심 증거 블록 차별화** (동일 템플릿 4연속의 스캔 피로 방지 — 골격은 같되 증거 형식을 다르게):

| 페이지 | 핵심 증거 블록 |
|---|---|
| diary-canvas | 제스처 데모 풀 버전(FIG. 1) + 좌표계 도해 + Flutter/웹 코드 비교 탭 |
| kiosk-ota | '의도적 해제 vs 비정상 해제' 분기 **상태 전이 수작업 SVG**(progressive reveal) + OTA/APK 폴백 플로우 |
| realtime-sse | **재연결 시퀀스 다이어그램**(progressive reveal) + (조건부) 연결 시뮬레이터 |
| redis-ranking | **before/after 쿼리 경로 비교** + 40ms→1ms 바 수축 애니메이션 |

### 3.4 모바일 전략 — 360px 기준 구체 규칙

1. 벤토는 **1열 스택, 분저장 featured 셀이 첫 번째**(이미지 셀의 시각 차별 유지). 데모 티저는 모바일에서도 동작 — touch-action이 핸들 한정이라 페이지 스크롤과 충돌 없음.
2. Hero: 헤드라인+포지셔닝+CTA가 360×640 폴드 안에. 목업 캡처·장식 요소는 md 이상에서만.
3. 본문 16~17px / 행간 1.7 / 터치 타깃 44px 이상.
4. 사전 렌더 SVG 도식: **가로 스크롤 컨테이너(overflow-x) + aspect-ratio 자리 예약**(축소 렌더 금지, CLS 방지).
5. 상세 스티키 ToC → 가로 스크롤 칩 바.
6. 섹션 수직 패딩은 `sectionSpacing` 토큰(64px/120px) 2단계로 전 섹션 통일.
7. 모바일 헤더에 '이력서·연락' 두 액션 고정.

---

## 4. 시그니처 인터랙션 상세 스펙

### 4.1 시그니처 1 — 제스처 캔버스 '라이브 계측 데모' (FIG. 1)

**무엇**: 분저장 스티커를 일반화한 **추상 도형 1개**(둥근 모서리 카드 형태 — 실제 스티커·UI 모방 금지, 회사 자산 경계) + **우하단 단일 제어점 핸들**(시각 28px, 히트 영역 44px 이상, 원형 — radius 0 규칙의 유일한 예외).

- 몸체 드래그 = 이동
- 핸들 드래그 = 중심-제어점 벡터의 **atan2 회전** + 중심-제어점 **거리 비율 스케일**
- 분저장 실제 구현이 '단일 제어점' 방식이므로 데모도 동일 — 서사적으로 정확하고, **데스크톱 마우스로도 완전 체험 가능**(면접관 다수가 데스크톱).

**어디에 (2단 배치)**:

- (a) 홈 벤토 featured 셀 우측 절반 — **티저 버전**: 모눈 스테이지 + `DRAG THE HANDLE` 모노 라벨. Hero에는 넣지 않는다.
- (b) /projects/diary-canvas — **풀 버전**: 라이브 수치 오버레이 + 수식 캡션 + Flutter/웹 코드 비교 탭. 티저/풀은 동일 컴포넌트의 variant로 재사용.

**구현 스펙 (체크리스트 — 구현 전 명문화, 완료 조건 포함)**:

- [ ] `"use client"` 일반 컴포넌트. **`next/dynamic ssr:false` 금지** — SSG 초기 마크업을 정적으로 유지해 CLS·LCP 보호.
- [ ] 초기 transform은 **상수**(난수/Date 기반 초기값 금지 — hydration mismatch 방지).
- [ ] **Pointer Events + `setPointerCapture`**로 마우스/터치 통합. `pointercancel` 처리 필수.
- [ ] **`touch-action: none`은 제어점 핸들 요소에만** — 스테이지 전체에 걸면 모바일 페이지 스크롤이 막히는 사고.
- [ ] pointermove마다 setState **금지**: 변환값을 ref에 누적 → `requestAnimationFrame`에서 `el.style.transform` 직접 기록 → **pointerup 시점에만 React state 커밋**.
- [ ] `will-change: transform`은 pointerdown 시 부여, pointerup 시 제거. **transform/opacity만 변경**.
- [ ] `user-select: none`, `draggable={false}`.
- [ ] 좌표 변환: `getBoundingClientRect()`가 Flutter `RenderBox.localToGlobal` 역할.
- [ ] 외부 라이브러리 0. 200~300줄. 컨벤션: `gesture-demo-container` / `gesture-demo-view` + `use-gesture-transform` 훅(MVVM).
- [ ] 완료 조건: **Chrome DevTools Performance 4× CPU 스로틀에서 60fps 검증**.

**라이브 수치 오버레이 (데모를 장난감이 아닌 기술 문서로 만드는 장치)**:

- 현재 `rotation(deg)` · `scale` · 중심 좌표를 JetBrains Mono `tabular-nums`로 실시간 표기.
- 수식 캡션: `rotation = atan2(dy, dx)` / `scale = |P−C| / |P₀−C|`.
- 캡션 옆 **한 줄 대응표 상시 노출**: `Flutter: RenderBox.localToGlobal ↔ Web: getBoundingClientRect` — 코드 비교 탭을 열지 않는 면접관에게도 크로스 플랫폼 사고 전달.
- 리드아웃 패널에 **`aria-live="polite"`** — 키보드 조작 시 스크린리더가 회전·스케일 변화를 읽는다. (연속 드래그 중에는 rAF 커밋 주기와 분리해 값 확정 시점에만 갱신 — 스크린리더 폭주 방지)
- FIG. 캡션: `FIG. 1 — rotation = atan2(dy, dx)`.
- **만지지 않는 면접관에게도** 오버레이+수식이 정적 기술 문서로 성립하는 이중 설계.

**트리거/모션 파라미터**: 사용자 직접 조작(pointerdown/move/up). duration 개념 없음(1:1 추종). 진입 시 1회 핸들 미세 펄스(아이들 힌트, 2회 이내·1초 이내).

**접근성**: 키보드 대체 조작(회전 ±15° / 스케일 ±10% 버튼) + 리셋 버튼 + `aria-label`. **reduced-motion**: 사용자 주도 직접 조작은 유지(WCAG상 허용), 아이들 힌트 펄스만 비활성화.

**왜 Flutter 정체성인가**: Flutter GestureDetector + Matrix4로 풀었던 로직을 Pointer Events + CSS transform으로 1:1 포팅했다는 사실 자체가 크로스 플랫폼 사고의 증거. 상세 페이지 Flutter/웹 코드 비교 탭 + 한 줄 대응표 + Hero 위젯 캡션(§4.2)의 3중 장치.

### 4.2 시그니처 2 — View Transitions 공유 요소 전환

- **무엇**: 홈 벤토 카드의 썸네일·타이틀이 상세 페이지 헤더로 이어지는 shared element 전환. 풀 페이지 전환은 하지 않는다.
- **어떻게**: CSS `view-transition-name` 단독(Next 16 experimental `viewTransition` 옵션 검토). `theme.transitions.duration.shared`(250ms) + easeOut. 카드 4개 각각 고유 name.
- **폴백**: 미지원 브라우저(구형 Firefox 등)는 즉시 전환으로 자연 강등 — 핵심 동선 영향 0, 추가 비용 거의 0(1일 이내).
- **캡션**: 상세 페이지 하단에 *"이 전환은 Flutter의 Hero 위젯과 같은 shared element 패턴"* 한 줄 — 전환 자체가 포트폴리오 콘텐츠. **전환 미발동 환경에서는 캡션 숨김**(`CSS.supports` 또는 동등 감지).
- **reduced-motion**: `::view-transition-*` 애니메이션 `none` 오버라이드(전역 @media 한 곳, §9).

---

## 5. 섹션별 모션 목록 (비용 표기)

우선순위(일정 압박 시 **뒤에서부터 컷**, 제스처 데모만은 사수):
제스처 데모 > View Transitions > 도식 progressive reveal > 바 수축 > SSE 시뮬레이터.

| # | 모션 | 위치 | 트리거 | 파라미터(토큰) | 구현 | reduced-motion 폴백 | 비용 |
|---|---|---|---|---|---|---|---|
| 1 | **제스처 캔버스 데모** (시그니처) | 홈 featured 티저 + diary-canvas 풀 버전 | 사용자 직접 조작 | 1:1 추종, 힌트 펄스 1회 | Pointer Events + rAF + ref (§4.1) | 조작 유지, 힌트 펄스만 비활성 | high (2~3일) |
| 2 | **View Transitions 공유 요소** | 벤토 카드 → 상세 헤더 | 페이지 내비게이션 | `shared` 250ms easeOut | CSS view-transition-name | `::view-transition` none | low (1일) |
| 3 | **도면 SVG progressive reveal** | kiosk-ota 상태 전이 · realtime-sse 재연결 시퀀스 | IntersectionObserver 진입 1회 | 노드→엣지 순서, stagger `diagramNode` 80ms, 총 1초 이내 | 수작업 SVG(노드별 클래스) + CSS transition | 전체 즉시 표시 | medium (도식당 반나절) |
| 4 | **before/after 바 수축** | redis-ranking 메트릭 밴드 | IntersectionObserver 1회 | `bar` 700ms easeOut | rAF, 로그 스케일 + 수치 라벨 병기(선형이면 1ms 바 비가시). **각주 출처는 시작 전부터 동시 노출** | 최종값·바 즉시 정적 표시 | low (반나절) |
| 5 | **카운트업** | Hero 마이크로 스탯 중 단순 수치(1만 DL)만 | IntersectionObserver 1회 | 600ms easeOut, tabular-nums | rAF | 최종값 즉시 표시 | low |
| 6 | **벤토 카드 그룹 리빌** | 홈 Projects 벤토 **한정** (Hero 카피·상세 본문은 리빌 제외 — 항상 즉시 표시) | IntersectionObserver 진입 1회 | translateY 12px + opacity, `reveal` 240ms, stagger 60ms | CSS class 토글 + `use-in-view` 훅 | opacity 80ms 전환만 또는 생략 | low |
| 7 | **카드 호버 마이크로** | 벤토 전 셀 | hover / focus-visible | 보더 색 전환 + 모눈 도트 opacity + translateY(-2px), `hover` 150ms | CSS transition. **box-shadow 애니메이션 금지**(MUI elevation 전환 무효화) | 색 전환만 유지 | low |
| 8 | **카드 active 프레스** | 벤토 전 셀 | :active / 터치 | `scale(0.985)`, `press` 180ms, transform만 | CSS transition | 유지(transform 미세, 비유해) 또는 생략 | low (CSS 몇 줄) |
| 9 | **SSE 연결 시뮬레이터** (조건부) | realtime-sse 보조 블록 | 사용자 버튼 클릭 | setTimeout 상태 머신(실제 SSE 불필요), success 토큰 연결 점 pulse + '연결 끊기' + 재연결 카운트다운 | 클라이언트 컴포넌트 | pulse 정지, 상태는 텍스트 라벨 | medium (1일, **제스처 데모 완성 후에만**) |
| 10 | **스티키 ToC 하이라이트** | 상세 좌측 레일 | IntersectionObserver | 색 전환 `hover` 150ms | CSS | 유지(색만) | low |

**공통 60fps 규칙 (컨벤션 — 빌드 노트에 공개)**:
1. 애니메이션 속성은 **transform/opacity만** — width/height/top/margin/box-shadow 직접 애니메이션 금지.
2. 스크롤 연동은 scroll 이벤트 리스너 금지, **IntersectionObserver만**.
3. 연속 입력(pointermove)은 rAF 배칭 + ref 직접 조작(React 상태 우회).
4. `will-change`는 상시 부여 금지 — 인터랙션 시작 시 부여, 종료 시 제거.
5. 검증: Chrome DevTools Performance 4× CPU 스로틀에서 모바일 60fps 확인.

---

## 6. 애니메이션 스택 최종 결정

### 결정: **framer-motion(motion) 미도입.** CSS transition/keyframes + IntersectionObserver(`use-in-view` 커스텀 훅 약 30줄) + rAF + View Transitions API로 전부 구현한다.

**근거**:
- §5의 모든 연출이 (a) 1회 트리거 등장, (b) hover/active 마이크로, (c) 사용자 직접 조작 추종, (d) 네이티브 View Transitions — 네 범주뿐이며 전부 CSS + IO + rAF로 충분하다. Emotion 환경에서 keyframes는 `@emotion/react`의 `keyframes` 헬퍼 또는 sx `'@keyframes'` 키로 createTheme 토큰과 연동된다.
- motion 도입 비용: 전역 컴포넌트 약 34KB min(LazyMotion 구성으로도 +4.6KB와 기능팩 지연 로드), 그리고 **MUI sx/모션 라이브러리로 스타일 책임이 이원화되는 유지보수 비용**. 스크롤 리빌·카운트업 수준에는 트레이드오프가 정당화되지 않는다.
- '번들 +0KB로 60fps' 자체가 성능 최적화 강점의 메타 증거가 된다(빌드 노트 공개 항목).

**재검토 조건(명문화)**: exit 애니메이션, FLIP 레이아웃 애니메이션, 스프링 물리가 실제로 필요해지는 경우에만 `LazyMotion + m + domAnimation` 조합으로 제한 도입. 현 스코프(§1.3에서 exit/모핑 제외)에서는 발생하지 않는다.

**보조 결정**: CSS scroll-driven animations(`animation-timeline`)는 Firefox 미지원 — 핵심 연출 사용 금지, 사용한다면 `@supports` 분기로 장식적 진보적 향상에만(현 스코프에서는 미사용).

---

## 7. 다이어그램 — Mermaid 테마 통일·CLS 방지

### 결정: **mermaid 런타임(클라이언트 렌더) 제거 → 빌드 타임 SVG 사전 생성.**

v1 최대 기술 리스크 해소: mermaid v11 코어 minified 약 480KB의 번들 역전, 렌더 전 높이 미상으로 인한 CLS 직격, 폰트 로드 전 렌더 시 라벨 잘림, JS 비활성 환경에서 도식 증발 — 전부 정적화로 일괄 해결한다.

**파이프라인**:
1. 도식 소스는 기존 컨벤션대로 `src/data/diagrams/*.ts` 타입드 데이터로 보관(도식별 `id / mermaid 코드 / width / height(aspect-ratio) / figNumber / caption`).
2. 빌드 스크립트(`@mermaid-js/mermaid-cli` 또는 playwright)가 SVG를 사전 생성 → 정적 자산으로 인라인 임베드. **클라이언트 번들 0KB, CLS 0.**
3. Vercel 빌드에서 Chromium 설치 시간이 부담이면 **로컬 생성 후 커밋도 허용**(트레이드오프 기록).
4. **테마 주입**: `theme: 'base'` + `themeVariables`에 MUI 토큰 hex를 **단일 토큰 파일에서** 주입 — 노드/선/화살표 색은 잉크 네이비·divider 계열, `fontFamily`에 Pretendard 명시(미지정 시 본문과 도식 폰트가 어긋남). 노드 radius·선 굵기·화살표 스타일을 '도면' 비주얼 언어와 통일. 다크 모드 없음이므로 1세트만 생성.
5. **핵심 도식 2~3개는 수작업 SVG로 승격**(watchdog 상태 전이, SSE 재연결 시퀀스): 노드별 클래스 부여 → IntersectionObserver + CSS transition으로 progressive reveal(§5 #3). mermaid 생성 SVG 내부 구조 의존(버전 업마다 깨짐)을 회피하고 reveal 통제력·가독성·LCP 모두 확보. `fill`/`stroke`는 `var(--mui-palette-*)` 직접 참조(cssVariables: true의 실익).

**CLS 방지 공통 규칙**:
- 모든 도식 컨테이너에 `aspect-ratio` 자리 예약(타입드 데이터의 width/height 사용).
- 모바일: 컨테이너 축소 렌더 금지 → 가로 스크롤 컨테이너(overflow-x).
- 모든 도식에 `FIG. n — 캡션`(figcaption variant) + 의미 전달용 대체 텍스트(`role="img"` + `aria-label` 또는 인접 설명).

**카드용 미니 도식은 별도 제작**: 벤토 소형 셀의 비주얼은 Mermaid 축소판이 아니라 카드 크기에 맞춘 3~4노드 자체 제작 SVG(§3.2). 원본 도식은 상세 페이지 전용.

---

## 8. 폰트 로딩 전략

| 항목 | Pretendard (본문/제목) | JetBrains Mono (수치/라벨/코드) |
|---|---|---|
| 소스 | `pyftsubset`으로 **KS X 1001 한글 2,574자 + ASCII 서브셋 단일 가변 woff2(수백 KB)** 자체 생성 (풀 가변 약 2MB 금지) | `next/font/google`, `subsets: ['latin']`, 필요한 weight만(400/500/700) |
| 로더 | `next/font/local` | `next/font/google` |
| 필수 옵션 | `weight: '45 920'` 명시(WebKit 가변 폰트 weight 오렌더링 회피, 공식 README), `display: 'swap'`, fallback `['Apple SD Gothic Neo','Malgun Gothic','sans-serif']` | fallback 스택에 **Pretendard 명시**(라틴 전용이므로 한글 유입 대비) + 모노 영역 영문·숫자만 콘텐츠 규칙 |
| 테마 연결 | `variable: '--font-pretendard'` → createTheme typography | `variable: '--font-mono'` → 동상 |

- 포트폴리오는 콘텐츠가 통제되므로 KS X 1001 외 희귀 한자 누락 리스크 사실상 없음. 서브셋 생성 스크립트와 글리프 커버리지 확인을 빌드 문서에 기록.
- 수치 표기 전 영역에 `font-variant-numeric: tabular-nums`(카운트업·라이브 리드아웃 자리 흔들림 방지).
- **폰트 swap + 다이어그램이 CLS 양대 원인** → 서브셋 + next/font 폴백 메트릭 + §7 정적화로 구조적으로 해결. 목표: 모바일 CLS < 0.1 (Lighthouse CI로 PR마다 검증).

**MUI/Next 필수 셋업** (FOUC·번들 방어):
1. `@mui/material-nextjs`의 **AppRouterCacheProvider** — 누락 시 SSR 스타일 주입 빠져 FOUC.
2. `createTheme({ cssVariables: true })`.
3. `next.config`의 `optimizePackageImports`로 MUI 배럴 임포트 정리.
4. MUI X 미사용(불필요 의존성 추가 금지).
5. Emotion 특성상 섹션 대부분이 클라이언트 컴포넌트가 되는 비용(베이스라인 약 70~90KB gzip + 하이드레이션)은 포트폴리오 규모에서 수용 — 빌드 노트에 인지된 트레이드오프로 기록.

---

## 9. 접근성 체크리스트

### 9.1 reduced-motion 일원화 시스템 (산발 처리 금지)

- [ ] **`use-reduced-motion` 훅 1개**(matchMedia, MVVM use-* 컨벤션)로 모든 JS 주도 애니메이션 분기 일원화: 카운트업·바 수축 → 최종값 즉시, 데모 아이들 힌트 → 비활성, View Transitions → 스킵.
- [ ] **CSS 주도 애니메이션은 전역 `@media (prefers-reduced-motion: reduce)` 오버라이드 한 곳**에서 처리(리빌·펄스·`::view-transition` 포함).
- [ ] 모든 duration/easing은 `theme.transitions` 토큰만 참조(하드코딩 lint 수준으로 점검).
- [ ] 분류 기준: **사용자 주도 직접 조작(제스처 데모)은 유지, 자동 재생·장식 모션은 전부 끔.**
- [ ] 이 시스템을 푸터 빌드 노트에 공개(토큰 집약 설계의 메타 증거).

### 9.2 일반 접근성

- [ ] 제스처 데모: 키보드 대체 조작(회전 ±15°/스케일 ±10%/리셋 버튼) + `aria-label` + 리드아웃 `aria-live="polite"`.
- [ ] 인터랙티브 요소 전부 `focus-visible` 스타일(호버와 동일 시각 피드백, §5 #7).
- [ ] 터치 타깃 44×44px 이상(데모 핸들 히트 영역 포함).
- [ ] 색 대비: 본문 `#1B2A44`/`#FAFAF8` 및 inverse 밴드 텍스트 WCAG AA(4.5:1) 이상 확인. 포인트 블루 링크도 배경 대비 확인.
- [ ] 정보 전달을 색에만 의존 금지(SSE 연결 상태 점은 텍스트 라벨 병기).
- [ ] 사전 렌더 SVG 도식: `role="img"` + `aria-label` 또는 인접 텍스트 설명. progressive reveal은 reduce 시 전체 즉시 표시.
- [ ] 시맨틱 구조: 페이지당 h1 1개, 섹션 heading 위계, sticky 헤더 `<nav>`, 랜드마크 롤.
- [ ] 키보드만으로 전 동선 완주 가능(벤토 카드 → 상세 → prev/next → Contact).
- [ ] 이미지 alt(분저장 캡처는 기능 설명형 alt).
- [ ] 검증 루틴: Lighthouse CI(모바일 CLS < 0.1, LCP) PR마다 + reduced-motion 수동 확인 항목(카운트업·리빌·데모 힌트가 즉시 최종 상태인지) + axe 자동 검사.

---

## 10. 콘텐츠·신뢰 장치 규칙

### 10.1 콘텐츠 규칙

- 케이스당 데스크톱 **3~4화면 상한**. ABSTRACT 선행, 의사결정은 비교 표.
- 훅 헤드라인은 결과·긴장감 문장(§3.2). CTA 문구는 '자세히 보기' 금지 → **'의사결정 과정 보기 →'**.
- Experience는 한 줄 요약+링크만(서술 위임). Skills는 강점 축 3분류 칩+앵커 링크.
- '5분 추천 동선' 마이크로카피 + 카드 ①②③ 번호.

### 10.2 각주 시스템 (출처 명시 제약의 시스템화 — 캡션 동시 노출의 상위 호환)

- 모든 정량 수치 옆 **위첨자 모노 번호**(`footnoteRef` variant) + **섹션 하단 각주 블록**(`footnote` variant, 1px 상단 보더).
- 표준 각주 문구: `¹ Google Play 공개 지표` / `² 합성 데이터 50만 건 시뮬레이션 기준` / `³ Dart 코드 변경 기준, Shorebird patch`.
- 번호는 페이지 단위로 채번. Hero 마이크로 스탯 3개부터 즉시 적용.
- 애니메이션되는 수치(바 수축·카운트업)도 **각주는 애니메이션 시작 전부터 정적 노출**.

### 10.3 FIG. 도판 넘버링

- 제스처 데모와 모든 도식에 `FIG. n — 설명` 모노 캡션(figcaption variant). 예: `FIG. 1 — rotation = atan2(dy, dx)`.
- 데모를 '장난감'이 아닌 **'기술 문서의 살아있는 도판'**으로 프레이밍 — 도면 언어와 정합.
- 페이지 단위 채번, `FigCaption` 공용 컴포넌트 1개.

---

## 11. 구현 컨벤션 (기존 유지 + 보강)

- Container-Presentational(`*-container` / `*-view`) + MVVM(`use-*` 훅), `src/sections`, 1파일 1컴포넌트, `any` 금지.
- 신규 훅: `use-in-view`(IO 리빌), `use-reduced-motion`, `use-gesture-transform`(데모), `use-active-section`(ToC 하이라이트).
- 커스텀 Typography variant·transitions 토큰은 모듈 보강으로 타입 확장.
- 도식·각주·수치 데이터는 `src/data` 타입드 데이터.

---

## 12. 리스크와 완화 (요약)

| 리스크 | 완화 |
|---|---|
| 데모가 안 만져지면 콘셉트 붕괴 | 'DRAG THE HANDLE' 라벨 상시 + 진입 1회 핸들 펄스(reduce 시 생략) + 수치 오버레이·수식이 정적 문서로 성립하는 이중 설계 |
| 데모 구현 품질 사고 | §4.1 체크리스트(touch-action 핸들 한정·rAF+ref·hydration 상수·pointercancel·ssr:false 금지) + 4× 스로틀 60fps를 완료 조건화 |
| 인터랙션 과잉 → 산만함 | 데모 상한 2개, 컷 순서 사전 고정(§5), 금지 목록(§1.3) |
| radius 0+플랫의 차가움 | 종이 오프화이트·모눈 모티프·잉크 네이비·한글 타이포 온기 + 보더·간격 토큰 엄격 통일. 핸들만 원형 예외 |
| View Transitions experimental 의존 | CSS 단독 구현 → 즉시 전환 자연 강등, Hero 캡션은 미발동 환경에서 숨김 |
| Emotion 전면 클라이언트화·폰트로 성능 자기모순 | AppRouterCacheProvider + cssVariables + optimizePackageImports, 폰트 서브셋, mermaid 런타임 제거. CLS<0.1 Lighthouse CI 검증 → 달성 수치를 빌드 노트에 출처와 함께 공개 |
| 회사 자산 경계 | 데모 오브젝트는 추상 도형 1개로 일반화, 키오스크·SSE·Redis는 일반화 도면만 |

---

## 13. v1 대비 변경점

1. **Highlights 섹션 삭제** → 강점 키워드는 벤토 카드 오버라인 라벨(`01 / UI ENGINEERING`)로, 정량 증거는 Hero 마이크로 스탯 3개로 흡수. (중복 제거, 홈 1화면 이상 단축)
2. **홈 6섹션 → 4섹션 압축**: Hero(2단, 증거 선행) → 벤토 Projects → 풀블리드 메트릭 밴드 → Experience+Skills+Contact(한 뷰포트). 데스크톱 4~5스크린.
3. **프로젝트 균등 4카드 → 비대칭 벤토**: 분저장 featured 2×2(실물) + 3 소형(도면), '실물 vs 도면' 2타입 카드, ①②③ 5분 추천 동선 + 마이크로카피.
4. **Hero 재설계**: 슬로건 단독 → 이름·5년차 명시·포지셔닝(엘리스 역량 연결)·각주 달린 수치 3개·CTA 2개 분리·실기기 목업 캡처.
5. **상세 템플릿 결론 선행화**: '문제 한 문장' display 오프닝 + ABSTRACT(TL;DR) 박스 + 의사결정 비교표 + 페이지별 증거 블록 차별화 + prev/next·Contact CTA(막다른 길 제거) + 케이스당 3~4화면 상한.
6. **글로벌 내비 신설**: sticky 헤더(전 페이지 공통) + 상세 좌측 스티키 ToC(모바일 칩 바) — v1에 부재.
7. **시그니처 인터랙션 신설**: 제스처 캔버스 라이브 계측 데모(홈 티저+상세 풀, 라이브 수치 오버레이·수식·aria-live·코드 비교 탭) + View Transitions 공유 요소 전환(Flutter Hero 캡션).
8. **Mermaid 클라이언트 렌더 폐기** → 빌드 타임 SVG 사전 생성(themeVariables에 MUI 토큰·Pretendard 주입), 핵심 2~3개는 수작업 SVG + progressive reveal. 번들 -480KB, CLS 0.
9. **모션 시스템 명문화**: '1 시그니처 + 절제 보조' 원칙, theme.transitions 토큰 단일 참조, 60fps 공통 규칙, 금지 목록, reduced-motion 일원화(훅 1개 + 전역 @media 한 곳).
10. **framer-motion 미도입 확정**(CSS+IO+rAF+View Transitions, 번들 +0KB) — 재검토 조건 명문화.
11. **MUI 기본 룩 전면 탈피 토큰**: shadows 전체 무효화, radius 0(핸들만 예외), 잉크 네이비 팔레트, cssVariables: true, components.styleOverrides 재정의, 모눈 도트 모티프.
12. **타이포 시스템 구체화**: clamp 유동 스케일, 커스텀 variant(metric/overline/figcaption/footnote), tabular-nums, keep-all 규칙(제목만).
13. **각주 시스템 + FIG. 넘버링 도입**(탈락안 이식) — '출처 캡션 동시 노출'의 상위 호환.
14. **폰트 전략 명문화**: Pretendard KS X 1001+ASCII 서브셋 단일 woff2 + next/font/local(weight '45 920'), JetBrains Mono는 next/font/google latin 한정.
15. **360px 모바일 전략 구체화**: 벤토 1열(featured 선두), Hero 폴드 규칙, SVG 가로 스크롤+aspect-ratio 예약, 섹션 패딩 2단계 토큰, 모바일 헤더 2액션 고정.
16. **카드 active scale(0.985) 프레스 추가**(탈락안 이식) — 터치 기기 촉각 피드백.
17. **'다크 모드 없음' 스코프 결정 명문화** + 푸터 '빌드 노트'(성능 수치·60fps 규칙·토큰/reduced-motion 시스템·트레이드오프 기록 공개).
18. **필수 셋업 추가**: AppRouterCacheProvider, optimizePackageImports, Lighthouse CI(CLS<0.1) PR 검증.
