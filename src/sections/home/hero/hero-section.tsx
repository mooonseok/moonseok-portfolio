'use client';

import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { SITE, HERO_STATS } from '@/data/site';
import { Section } from '@/components/section/section';
import { StatStrip } from '@/components/stat-strip/stat-strip';
import { DOT_GRID } from '@/theme/theme';

/**
 * Hero — 증거 선행, 텍스트 최소화 (이름·소개 산문 없음).
 * 좌: 역할 + 마이크로 스탯 3개 + CTA / 우: 분저장 비주얼 (캡처 교체 예정).
 */
export function HeroSection() {
  return (
    <Section sx={{ pt: { xs: 6, md: 9 } }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1.05fr 0.95fr' },
          gap: { xs: 5, md: 6 },
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography variant="overline" color="text.secondary">
            MOBILE · PRODUCT ENGINEER
          </Typography>
          <Typography variant="h1" sx={{ mt: 1 }}>
            {SITE.role}
            <Box component="span" sx={{ color: 'secondary.main' }}>
              {' · '}
              {SITE.years}
            </Box>
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 2.5, maxWidth: '48ch', wordBreak: 'keep-all' }}
          >
            {SITE.tagline}
          </Typography>

          <Box sx={{ mt: 4 }}>
            <StatStrip stats={HERO_STATS} />
          </Box>

          <Box sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            <Button
              component={Link}
              href="/projects/diary-canvas"
              variant="contained"
              color="primary"
            >
              케이스 보기
            </Button>
            <Button
              component="a"
              href={`mailto:${SITE.email}`}
              variant="outlined"
              color="primary"
            >
              연락
            </Button>
            {SITE.resumeUrl && (
              <Button component="a" href={SITE.resumeUrl} variant="text" color="primary">
                이력서
              </Button>
            )}
          </Box>
        </Box>

        {/* 분저장 비주얼 — 실기기 캡처 자리. 실제 이미지는 추후 /public 에서 교체 */}
        <Box
          sx={{
            aspectRatio: '4 / 5',
            border: 1,
            borderColor: 'divider',
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            justifyContent: 'center',
            ...DOT_GRID,
          }}
        >
          <Typography variant="figcaption" color="text.secondary">
            분저장 스크린샷 (교체 예정)
          </Typography>
        </Box>
      </Box>
    </Section>
  );
}
