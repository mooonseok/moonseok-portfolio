import type { Project, ProjectSlug } from '@/data/types';

/**
 * 5개 케이스 스터디의 단일 소스. 표시 순서 = 5분 추천 동선.
 * (프론트엔드·백엔드 도메인 전문가 팀이 실제 구현 내용에서 심화 작성)
 */
export const PROJECTS: readonly Project[] = [
  {
    "slug": "diary-canvas",
    "index": 1,
    "strength": "UI ENGINEERING",
    "variant": "artifact",
    "title": "분저장 — 제스처 캔버스",
    "hook": "한 손가락 캔버스",
    "metric": {
      "value": "Google Play 누적 약 1만",
      "source": "Google Play 공개 지표"
    },
    "role": "Flutter 앱 개발 주도",
    "period": "약 1년 운영",
    "org": "자사 다이어리 앱",
    "stack": [
      "Flutter",
      "GestureDetector",
      "RenderBox",
      "Sliver",
      "Cubit",
      "sqflite"
    ]
  },
  {
    "slug": "kiosk-ota",
    "index": 2,
    "strength": "ARCHITECTURE",
    "variant": "blueprint",
    "title": "현장 키오스크 — watchdog + 무중단 OTA",
    "hook": "안 죽는 키오스크",
    "metric": {
      "value": "분 단위 OTA 반영",
      "source": "Dart 코드 변경 기준, Shorebird patch"
    },
    "role": "모바일·플랫폼 리드 (Flutter · 디바이스/배포/복원력)",
    "period": "재직 중 운영",
    "org": "현장 무인 키오스크 앱",
    "stack": [
      "Flutter",
      "Shorebird OTA",
      "Device Owner / Device Admin",
      "Kiosk Mode (Lock Task)",
      "GitHub Actions",
      "CustomPainter / Sliver"
    ]
  },
  {
    "slug": "realtime-sse",
    "index": 3,
    "strength": "REALTIME",
    "variant": "blueprint",
    "title": "SSE 실시간 데이터 파이프라인",
    "hook": "단방향에 맞춘 SSE",
    "metric": {
      "value": "단방향 실시간 스트리밍",
      "source": "연결 종료 시 자동 재연결 (NestJS 서버 + fetch-event-source 클라이언트)"
    },
    "role": "백엔드·풀스택 엔지니어 — 서버 측 스트리밍 설계·구현",
    "period": "재직 중",
    "org": "현장 운영 시스템",
    "stack": [
      "NestJS",
      "SSE",
      "@microsoft/fetch-event-source",
      "Redis Pub/Sub",
      "Flutter",
      "Next.js"
    ]
  },
  {
    "slug": "redis-ranking",
    "index": 4,
    "strength": "PERFORMANCE",
    "variant": "blueprint",
    "title": "Redis 랭킹·집계 캐싱",
    "hook": "40배 빨라진 집계",
    "metric": {
      "value": "약 40배 (40ms→~1ms)",
      "source": "합성 주문 50만 건 시뮬레이션, order_items 풀스캔 집계 vs Redis 캐시 단건 조회"
    },
    "role": "백엔드 — 캐싱·동시성·성능 설계 및 구현",
    "period": "재직 중",
    "org": "커머스 플랫폼",
    "stack": [
      "Node.js",
      "NestJS",
      "PostgreSQL",
      "Redis",
      "Prisma",
      "Bull/스케줄러"
    ]
  },
  {
    "slug": "ops-dashboard",
    "index": 5,
    "strength": "FRONTEND",
    "variant": "blueprint",
    "title": "Next.js 운영 대시보드",
    "hook": "상태를 나눈 대시보드",
    "metric": {
      "value": "3계층 일관 구조",
      "source": "담당 섹션 Container-Presentational + MVVM(use-*) 적용"
    },
    "role": "프론트엔드 엔지니어 (Next.js)",
    "period": "재직 중",
    "org": "현장 운영 대시보드",
    "stack": [
      "Next.js (App Router)",
      "React Query",
      "Zustand",
      "TypeScript",
      "Container/Presentational",
      "Cypress"
    ]
  }
] as const;

/** slug → 프로젝트 조회. 상세 페이지에서 사용. */
export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

/** generateStaticParams 용 slug 목록. */
export function getProjectSlugs(): ProjectSlug[] {
  return PROJECTS.map((project) => project.slug);
}
