/**
 * 사이트 전역 메타·연락처의 단일 소스.
 * 표현 원칙: 이름·소개 산문 비노출, 텍스트 최소화 — 증거(수치·케이스)가 말하게 한다.
 */
export const SITE = {
  /** 무명 워드마크 (헤더 브랜드). 이름 대신 역할로 표기. */
  brand: 'FLUTTER ENGINEER',
  role: 'Flutter 엔지니어',
  years: '5년차',
  email: 'moonseokp96@gmail.com',
  /** 실제 URL은 추후 교체. 비우면 노출하지 않는다. */
  githubUrl: '',
  /** /public 에 배치할 이력서 PDF 경로. 추후 교체. */
  resumeUrl: '',
} as const;

/** Hero 마이크로 스탯 3개 — 각주 번호와 함께 즉시 노출 (design-spec.md §3.2 / §10.2). */
export const HERO_STATS: readonly { value: string; source: string }[] = [
  { value: 'Google Play 누적 약 1만', source: 'Google Play 공개 지표' },
  { value: '40ms → 1ms', source: '합성 데이터 50만 건 시뮬레이션 기준' },
  { value: 'OTA 분 단위 반영', source: 'Dart 코드 변경 기준, Shorebird patch' },
] as const;
