'use client';

import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { Project } from '@/data/types';
import { SITE } from '@/data/site';

interface DetailNavProps {
  prev?: Project;
  next?: Project;
}

/**
 * 상세 하단 prev/next + Contact CTA — 막다른 길 제거 (design-spec.md §3.3 #8).
 */
export function DetailNav({ prev, next }: DetailNavProps) {
  return (
    <Box sx={{ mt: 8, pt: 4, borderTop: 1, borderColor: 'divider' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 2,
        }}
      >
        {prev ? (
          <Box
            component={Link}
            href={`/projects/${prev.slug}`}
            sx={{
              p: 2,
              border: 1,
              borderColor: 'divider',
              transition: 'border-color 150ms cubic-bezier(0.4,0,0.2,1)',
              '&:hover': { borderColor: 'text.primary' },
            }}
          >
            <Typography variant="overline" color="text.secondary">
              ← PREV
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, mt: 0.5 }}>
              {prev.title}
            </Typography>
          </Box>
        ) : (
          <Box />
        )}
        {next && (
          <Box
            component={Link}
            href={`/projects/${next.slug}`}
            sx={{
              p: 2,
              border: 1,
              borderColor: 'divider',
              textAlign: 'right',
              transition: 'border-color 150ms cubic-bezier(0.4,0,0.2,1)',
              '&:hover': { borderColor: 'text.primary' },
            }}
          >
            <Typography variant="overline" color="text.secondary">
              NEXT →
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, mt: 0.5 }}>
              {next.title}
            </Typography>
          </Box>
        )}
      </Box>
      <Box sx={{ mt: 3, display: 'flex', gap: 1.5 }}>
        <Button component="a" href={`mailto:${SITE.email}`} variant="contained" color="primary">
          연락
        </Button>
        <Button component={Link} href="/" variant="text" color="primary">
          홈으로
        </Button>
      </Box>
    </Box>
  );
}
