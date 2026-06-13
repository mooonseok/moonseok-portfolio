/**
 * 사이트 전역 연락처의 단일 소스.
 * 표현 원칙: 이름·직함·이력 라벨 비노출. 메인은 최대한 비우고, 증거는 케이스가 말하게 한다.
 */
export const SITE = {
  email: 'moonseokp96@gmail.com',
  /** 실제 URL은 추후 교체. 비우면 노출하지 않는다. */
  githubUrl: '',
  /** /public 에 배치할 이력서 PDF 경로. 추후 교체. */
  resumeUrl: '',
} as const;
