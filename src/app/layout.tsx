import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import { SITE } from '@/data/site';
import { pretendard, jetbrainsMono } from '@/theme/fonts';
import { ThemeRegistry } from '@/theme/theme-registry';
import { SiteHeader } from '@/components/site-header/site-header';
import { SiteFooter } from '@/components/site-footer/site-footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: `${SITE.role} · Portfolio`,
    template: `%s · ${SITE.role}`,
  },
  description:
    '모바일 · 프로덕트 엔지니어 5년차 포트폴리오. 앱 5종 출시 — 제스처 캔버스 UI, 키오스크 무중단 OTA, 실시간 SSE 파이프라인, Redis 랭킹 캐싱(약 40배·합성 데이터 기준). Flutter · NestJS · Redis · Next.js.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <ThemeRegistry>
          <Box
            sx={{
              minHeight: '100dvh',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <SiteHeader />
            {children}
            <SiteFooter />
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
