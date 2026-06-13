import type { ProjectSlug } from '@/data/types';

/**
 * 경력 타임라인 — 회사명·도메인 비밀 비노출(불변 제약). 기간·역할·관련 케이스만.
 * 상세 서술은 전부 프로젝트 페이지에 위임한다 (design-spec.md §3.2).
 */
export interface ExperienceItem {
  period: string;
  role: string;
  cases: ProjectSlug[];
}

export const EXPERIENCE: readonly ExperienceItem[] = [
  {
    period: '2025.10 — 현재',
    role: '모바일 · 풀스택 엔지니어',
    cases: ['kiosk-ota', 'realtime-sse', 'redis-ranking', 'ops-dashboard'],
  },
  {
    period: '2021.09 — 2025.10',
    role: '모바일 · 풀스택 엔지니어',
    cases: ['diary-canvas'],
  },
] as const;
