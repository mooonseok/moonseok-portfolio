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
    'Flutter 모바일 엔지니어 포트폴리오 — 제스처 캔버스, 키오스크 OTA, 실시간 SSE, Redis 캐싱.',
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
