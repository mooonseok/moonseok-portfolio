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
    default: `${SITE.name} — ${SITE.role}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.positioning,
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
