'use client';

import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { SITE } from '@/data/site';
import { Section } from '@/components/section/section';
import { KineticHeadline } from '@/sections/home/hero/kinetic-headline';

/**
 * Hero — 최대한 비운다. 직함·이력 없이 '무엇을 만드는가'만 키네틱 타이포로.
 * 증거(수치·케이스)는 아래 섹션이 말하게 한다.
 */
export function HeroSection() {
  return (
    <Section sx={{ pt: { xs: 9, md: 16 }, pb: { xs: 8, md: 12 } }}>
      <Box sx={{ maxWidth: 900 }}>
        <Typography variant="overline" color="text.secondary">
          만든 것들
        </Typography>
        <Box sx={{ mt: { xs: 2, md: 2.5 } }}>
          <KineticHeadline />
        </Box>
        <Box sx={{ mt: { xs: 5, md: 6 }, display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
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
        </Box>
      </Box>
    </Section>
  );
}
