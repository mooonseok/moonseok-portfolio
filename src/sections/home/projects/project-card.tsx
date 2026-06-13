'use client';

import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Project } from '@/data/types';
import { DOT_GRID } from '@/theme/theme';
import { GestureDemoContainer } from '@/components/gesture-demo/gesture-demo-container';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

// duration.hover(150ms) + easing.standard 토큰과 동일 값
const HOVER_TRANSITION =
  'border-color 150ms cubic-bezier(0.4, 0, 0.2, 1), transform 150ms cubic-bezier(0.4, 0, 0.2, 1)';

const cardBaseSx = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  bgcolor: 'background.paper',
  border: 1,
  borderColor: 'divider',
  color: 'text.primary',
  transition: HOVER_TRANSITION,
  '&:hover': { borderColor: 'text.primary' },
} as const;

function CardMeta({ project }: { project: Project }) {
  return (
    <Box
      sx={{
        mt: 'auto',
        pt: 2,
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      <Typography variant="figcaption" color="text.secondary">
        {project.metric.value}
      </Typography>
      <Typography
        variant="figcaption"
        color="secondary.main"
        sx={{ whiteSpace: 'nowrap' }}
      >
        의사결정 보기 →
      </Typography>
    </Box>
  );
}

/**
 * 벤토 프로젝트 카드 (design-spec.md §3.2).
 * - featured(분저장): 제스처 데모 티저 내장 — 데모 조작과 충돌하지 않게 카드 전체가 아닌
 *   헤드라인·CTA만 링크
 * - 일반(도면형): 카드 전체 링크 + 모눈 도트 배경
 */
export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const num = String(project.index).padStart(2, '0');
  const href = `/projects/${project.slug}`;

  if (featured) {
    return (
      <Box sx={{ ...cardBaseSx, p: { xs: 3, md: 4 } }}>
        <Typography variant="overline" color="text.secondary">
          {num} / {project.strength}
        </Typography>
        <Typography
          component={Link}
          href={href}
          variant="h3"
          sx={{
            mt: 1,
            // 훅이 3어절 초단문이라 featured는 한 단계 낮춰 휑함 방지
            fontSize: 'clamp(1.5rem, 2.8vw, 1.9rem)',
            fontWeight: 700,
            wordBreak: 'keep-all',
            color: 'text.primary',
            '&:hover': { color: 'secondary.main' },
          }}
        >
          {project.hook}
        </Typography>

        <Box sx={{ mt: 3, flexGrow: 1 }}>
          <GestureDemoContainer variant="teaser" />
        </Box>

        <Box component={Link} href={href} sx={{ display: 'block' }}>
          <CardMeta project={project} />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      component={Link}
      href={href}
      sx={{
        ...cardBaseSx,
        p: 3,
        ...DOT_GRID,
        '&:hover': { borderColor: 'text.primary', transform: 'translateY(-2px)' },
        '&:active': { transform: 'scale(0.985)' },
      }}
    >
      <Typography variant="overline" color="text.secondary">
        {num} / {project.strength}
      </Typography>
      <Typography
        variant="h6"
        component="p"
        sx={{ mt: 1, fontWeight: 700, wordBreak: 'keep-all' }}
      >
        {project.hook}
      </Typography>
      <CardMeta project={project} />
    </Box>
  );
}
