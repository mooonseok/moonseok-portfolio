import type { Project, ProjectSlug } from '@/data/types';

/**
 * 4개 케이스 스터디의 단일 소스.
 * 표시 순서 = 5분 추천 동선(① 캔버스 → ② 키오스크 OTA → ③ SSE → ④ Redis).
 * 상세 본문(문제/의사결정 표/도식/회고)은 ③단계에서 각 프로젝트별 데이터로 확장한다.
 */
export const PROJECTS: readonly Project[] = [
  {
    slug: 'diary-canvas',
    index: 1,
    strength: 'UI ENGINEERING',
    variant: 'artifact',
    title: '분저장 — 제스처 캔버스',
    hook: '손가락 하나로 회전·확대 — atan2로 푼 커스텀 캔버스',
    metric: { value: 'Google Play 누적 약 1만', source: 'Google Play 공개 지표' },
    role: 'Flutter 앱 개발 주도',
    period: '약 1년 운영',
    org: '자사 다이어리 앱',
    stack: ['Flutter', 'CustomPainter', 'Sliver', 'Cubit', 'sqflite'],
  },
  {
    slug: 'kiosk-ota',
    index: 2,
    strength: 'ARCHITECTURE',
    variant: 'blueprint',
    title: 'APC 키오스크 — watchdog + OTA',
    hook: '키오스크가 죽어도 스스로 복귀하는 watchdog',
    metric: { value: '분 단위 OTA 반영', source: 'Dart 코드 변경 기준, Shorebird patch' },
    role: '모바일 엔지니어 (Flutter)',
    period: '재직 중',
    org: '현장 키오스크 앱',
    stack: ['Flutter', 'Shorebird', 'Device Owner', 'GitHub Actions'],
  },
  {
    slug: 'realtime-sse',
    index: 3,
    strength: 'REALTIME',
    variant: 'blueprint',
    title: 'SSE 실시간 데이터 파이프라인',
    hook: '입고-가공-출고를 지연 없이 — 끊겨도 스스로 잇는 SSE',
    metric: { value: '단방향 실시간 스트리밍', source: '연결 종료 시 자동 재연결' },
    role: '모바일·풀스택 엔지니어',
    period: '재직 중',
    org: '현장 운영 시스템',
    stack: ['SSE', 'Flutter', 'NestJS'],
  },
  {
    slug: 'redis-ranking',
    index: 4,
    strength: 'PERFORMANCE',
    variant: 'blueprint',
    title: 'Redis 랭킹 캐싱',
    hook: '매 요청 40ms 집계 쿼리를 1ms 캐시 조회로',
    metric: { value: '40ms → 1ms (약 40배)', source: '합성 데이터 50만 건 시뮬레이션 기준' },
    role: '백엔드·풀스택 엔지니어',
    period: '재직 중',
    org: 'e-커머스 백엔드',
    stack: ['Redis Sorted Set', 'NestJS', 'PostgreSQL'],
  },
] as const;

/** slug → 프로젝트 조회. 상세 페이지에서 사용. */
export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

/** generateStaticParams 용 slug 목록. */
export function getProjectSlugs(): ProjectSlug[] {
  return PROJECTS.map((project) => project.slug);
}
