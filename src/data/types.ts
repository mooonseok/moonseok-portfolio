/**
 * 포트폴리오 콘텐츠 도메인 타입.
 * 모든 서술·수치·도식은 이 타입을 따르는 데이터로 분리해, 컴포넌트는 표현만 담당한다.
 * (design-spec.md §11 — 도식·각주·수치 데이터는 src/data 타입드 데이터)
 */

/** 프로젝트 상세 라우트 slug. /projects/[slug] 의 정적 경로 소스. */
export type ProjectSlug =
  | 'diary-canvas'
  | 'kiosk-ota'
  | 'realtime-sse'
  | 'redis-ranking'
  | 'ops-dashboard';

/**
 * 카드 비주얼 2타입 (design-spec.md §1.1).
 * - artifact: 분저장 — 실기기 목업 캡처 + 인터랙티브 데모 (공개 출시 앱)
 * - blueprint: 내부 시스템 — 토큰 색 모노라인 도식 + 모눈 도트 배경 (캡처 금지)
 */
export type CardVariant = 'artifact' | 'blueprint';

/** 강점 축 — 벤토 카드 오버라인 라벨과 Skills 분류의 단일 소스. */
export type Strength =
  | 'UI ENGINEERING'
  | 'ARCHITECTURE'
  | 'REALTIME'
  | 'PERFORMANCE'
  | 'FRONTEND';

/** 정량 수치 + 출처 각주 (불변 제약 4 — 수치는 출처와 동시 노출). */
export interface Metric {
  /** 표기값. 예: '40ms → 1ms', 'Google Play 누적 약 1만' */
  value: string;
  /** 출처 각주. 예: '합성 데이터 50만 건 시뮬레이션 기준' */
  source: string;
}

/** 프로젝트 케이스 스터디 한 건. */
export interface Project {
  slug: ProjectSlug;
  /** 5분 추천 동선·채번용 순번 (1-based). */
  index: number;
  strength: Strength;
  variant: CardVariant;
  /** 카드·헤더 제목. */
  title: string;
  /** 결과·긴장감이 있는 훅 헤드라인 (design-spec.md §3.2). */
  hook: string;
  /** 카드에 노출할 대표 수치 1개. */
  metric: Metric;
  /** 한 줄 역할. */
  role: string;
  /** 기간(일반화 표기). */
  period: string;
  /** 소속(일반화 — 회사명 비노출 원칙상 표기는 케이스별 최소화). */
  org: string;
  /** 스택 칩. */
  stack: string[];
}
