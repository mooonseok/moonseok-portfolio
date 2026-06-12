# Flutter 엔지니어 포트폴리오

Flutter 모바일 엔지니어 포트폴리오 웹사이트 — 콘셉트 **「만지는 설계도」: 설명하지 않고 증명한다.**

분저장 제스처 캔버스(atan2 회전·거리비 스케일)를 웹에서 직접 조작하는 라이브 데모와,
"문제 → 의사결정/트레이드오프 → 결과" 흐름의 케이스 스터디 4편으로 구성됩니다.
전체 디자인 결정은 [docs/design-spec.md](docs/design-spec.md)에 기록되어 있습니다.

## 스택

- **Next.js 16** (App Router) + **TypeScript** — 전 페이지 SSG (`generateStaticParams`)
- **MUI 9** 단독 스타일링 (`sx` + `styled`, Tailwind 미사용) — 디자인 토큰은 `createTheme` 집약, `cssVariables: true`
- 애니메이션 라이브러리 **없음** — CSS transition/keyframes + IntersectionObserver + rAF (번들 +0KB)
- 다이어그램: 수작업 SVG (테마 토큰 `var(--mui-palette-*)` 직접 참조)
- 폰트: Pretendard(`next/font/local`) + JetBrains Mono(`next/font/google`)

## 시작하기

```bash
npm install
npm run dev     # http://localhost:3000
```

```bash
npm run build   # 프로덕션 빌드 — 8개 정적 페이지 생성 확인
npm run lint
```

## 프로젝트 구조

```
src/
├─ app/                      # 라우팅만 얇게 (/, /projects/[slug] 4종 SSG)
├─ theme/                    # createTheme 토큰 · 폰트 · ThemeRegistry(Emotion SSR)
├─ data/                     # 모든 콘텐츠의 단일 소스 (타입드)
│  ├─ projects.ts            #   케이스 4종 메타 (제목·훅·수치·스택)
│  ├─ project-details.ts     #   상세 본문 (ABSTRACT·의사결정 비교표·결과·회고)
│  ├─ site.ts                #   연락처·Hero 스탯 (이메일·GitHub·이력서 URL)
│  └─ experience.ts, skills.ts
├─ components/               # 공용 (gesture-demo, diagrams, fig-caption …)
├─ sections/                 # 화면 섹션 (home/*, project-detail/*)
└─ hooks/                    # use-in-view, use-reduced-motion
```

**컨벤션**: Container-Presentational(`*-container` / `*-view`) + MVVM(`use-*` 훅) ·
1파일 1컴포넌트 · `any` 금지 · 모든 색/타이포/모션 값은 theme 토큰만 참조 ·
애니메이션은 transform/opacity만 · 스크롤 감지는 IntersectionObserver만.

## 콘텐츠 수정

문구·수치·도식을 고칠 때 컴포넌트를 건드릴 필요가 없습니다 — `src/data/`만 수정하면 됩니다.

| 무엇을 | 어디서 |
|---|---|
| 케이스 카드 문구·수치 | `src/data/projects.ts` |
| 상세 본문(비교표·결과·회고) | `src/data/project-details.ts` |
| 이메일·GitHub·이력서 링크 | `src/data/site.ts` (`githubUrl`/`resumeUrl`은 비우면 미노출) |
| 분저장 스크린샷 | `/public`에 이미지 추가 후 `hero-section.tsx`의 placeholder 교체 |

## 배포 — Vercel (권장)

전 페이지 정적 생성이라 서버 비용 없이 **Hobby(무료) 플랜**으로 충분합니다.

1. [vercel.com/new](https://vercel.com/new) 접속 → GitHub 계정 연결
2. `moonseok-portfolio` repo **Import**
3. Framework Preset이 **Next.js**로 자동 인식됨 — 설정 변경 없이 **Deploy**
4. 이후 `main`에 push할 때마다 자동 배포, PR마다 Preview URL 생성

### 커스텀 도메인 (선택)

Vercel 대시보드 → 프로젝트 → **Settings → Domains**에서 도메인 추가 후,
도메인 업체 DNS에 안내되는 CNAME(또는 A 레코드) 한 줄만 등록하면 됩니다. HTTPS는 자동 발급.

### 다른 호스팅 (선택)

GitHub Pages 등 순수 정적 호스팅이 필요하면 `next.config.ts`에 `output: 'export'`를
추가해 `out/` 폴더를 배포하면 됩니다. 현 구성에서는 Vercel이 관리 비용이 가장 적습니다.

## 배포 전 체크리스트

- [ ] `/public`에 분저장 실제 스크린샷 추가 및 placeholder 교체
- [ ] `src/data/site.ts`의 `githubUrl` · `resumeUrl` 채우기 (이력서 PDF는 `/public`에)
- [ ] 폰트 최적화: 현재 Pretendard 전체 Variable(약 2MB) → KS X 1001+ASCII 서브셋(수백 KB) 교체
      ([design-spec.md §8](docs/design-spec.md) 참고 — `pyftsubset` 사용, `src/theme/fonts.ts` 경로만 교체)
- [ ] Lighthouse 모바일 측정 (목표 CLS < 0.1)
