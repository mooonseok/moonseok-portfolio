import type { Metadata } from 'next';
import { SITE } from '@/data/site';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.role}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.positioning,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // ②단계에서 ThemeProvider + AppRouterCacheProvider + next/font 를 이 레이아웃에 주입한다.
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
