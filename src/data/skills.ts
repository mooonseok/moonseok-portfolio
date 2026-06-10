import type { ProjectSlug } from '@/data/types';

/**
 * 스킬 — 강점 축으로 분류, 각 칩은 '어디서 썼는지' 케이스에 연결 (design-spec.md §3.2).
 * 숙련도 게이지·별점 금지.
 */
export interface SkillChip {
  label: string;
  /** 연결할 케이스 (있으면 칩이 해당 상세로 링크). */
  slug?: ProjectSlug;
}

export interface SkillGroup {
  title: string;
  items: SkillChip[];
}

export const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    title: 'UI / 렌더링',
    items: [
      { label: 'CustomPainter', slug: 'diary-canvas' },
      { label: 'Sliver', slug: 'diary-canvas' },
      { label: 'Gesture / Pointer', slug: 'diary-canvas' },
      { label: 'Cubit' },
      { label: 'sqflite' },
    ],
  },
  {
    title: '배포 · 운영',
    items: [
      { label: 'Shorebird OTA', slug: 'kiosk-ota' },
      { label: 'Device Owner', slug: 'kiosk-ota' },
      { label: 'GitHub Actions' },
      { label: 'Docker' },
    ],
  },
  {
    title: '데이터 · 성능',
    items: [
      { label: 'SSE', slug: 'realtime-sse' },
      { label: 'Redis Sorted Set', slug: 'redis-ranking' },
      { label: 'NestJS' },
      { label: 'PostgreSQL' },
    ],
  },
] as const;
