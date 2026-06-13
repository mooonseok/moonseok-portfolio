import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import { pretendard, jetbrainsMono } from '@/theme/fonts';
import { ThemeRegistry } from '@/theme/theme-registry';
import { SiteHeader } from '@/components/site-header/site-header';
import { SiteFooter } from '@/components/site-footer/site-footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Portfolio',
    template: '%s · Portfolio',
  },
  description:
    '제스처 캔버스 UI, 키오스크 무중단 OTA, 실시간 SSE 파이프라인, Redis 랭킹 캐싱(약 40배·합성 데이터 기준). Flutter · NestJS · Redis · Next.js.',
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
