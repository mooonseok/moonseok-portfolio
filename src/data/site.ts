/**
 * 사이트 전역 메타·연락처·포지셔닝 카피의 단일 소스.
 */
export const SITE = {
  name: '박문석',
  role: 'Flutter 모바일 엔지니어',
  yearsLabel: '5년차',
  /** Hero 포지셔닝 한 줄 (design-spec.md §3.2 — 엘리스 역량과 자연 연결, 회사명 비노출). */
  positioning:
    '사용자가 매일 쓰는 앱의 UI 품질과 무중단 운영을 책임져 온 Flutter 엔지니어',
  email: 'moonseokp96@gmail.com',
  /** 실제 URL은 추후 교체. 비워두면 헤더에서 노출하지 않는다. */
  githubUrl: '',
  /** /public 에 배치할 이력서 PDF 경로. 추후 교체. */
  resumeUrl: '',
} as const;

/** Hero 마이크로 스탯 3개 — 각주 번호와 함께 즉시 노출 (design-spec.md §3.2 / §10.2). */
export const HERO_STATS: readonly { value: string; source: string }[] = [
  { value: 'Google Play 누적 약 1만 DL', source: 'Google Play 공개 지표' },
  { value: '40ms → 1ms', source: '합성 데이터 50만 건 시뮬레이션 기준' },
  { value: 'OTA 분 단위 반영', source: 'Dart 코드 변경 기준, Shorebird patch' },
] as const;
