import localFont from 'next/font/local';
import { JetBrains_Mono } from 'next/font/google';

/**
 * 본문/제목 — Pretendard.
 * 현재는 전체 Variable woff2(약 2MB). 배포 전 KS X 1001 + ASCII 서브셋으로 교체 예정
 * (design-spec.md §8). weight '45 920'은 WebKit 가변 폰트 오렌더링 회피용(공식 README).
 */
export const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
  fallback: ['Apple SD Gothic Neo', 'Malgun Gothic', 'sans-serif'],
});

/**
 * 수치/라벨/코드 — JetBrains Mono(latin 한정).
 * 모노 영역에 한글이 섞이면 theme typography의 mono 패밀리에서 Pretendard로 폴백한다.
 */
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
  variable: '--font-mono',
});
