'use client';

import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Project } from '@/data/types';
import { DOT_GRID } from '@/theme/theme';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

/**
 * 벤토 프로젝트 카드. 텍스트 최소화 — 강점 라벨 / 훅 헤드라인 / 수치 / CTA만.
 * artifact(분저장)는 데모 스테이지, blueprint(내부 시스템)는 모눈 도면 배경.
 * (design-spec.md §1.1 / §3.2)
 */
export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const num = String(project.index).padStart(2, '0');
  const isBlueprint = project.variant === 'blueprint';

  return (
    <Box
      component={Link}
      href={`/projects/${project.slug}`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        p: { xs: 3, md: featured ? 4 : 3 },
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'divider',
        color: 'text.primary',
        ...(isBlueprint ? DOT_GRID : {}),
        // duration.hover(150ms) + easing.standard 토큰과 동일. 서버 컴포넌트라 리터럴 사용.
        transition:
          'border-color 150ms cubic-bezier(0.4, 0, 0.2, 1), transform 150ms cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': { borderColor: 'text.primary', transform: 'translateY(-2px)' },
        '&:active': { transform: 'scale(0.985)' },
      }}
    >
      <Typography variant="overline" color="text.secondary">
        {num} / {project.strength}
      </Typography>
      <Typography
        variant={featured ? 'h3' : 'h6'}
        sx={{ mt: 1, fontWeight: 700, wordBreak: 'keep-all' }}
      >
        {project.hook}
      </Typography>

      {featured && (
        <Box
          sx={{
            mt: 3,
            flexGrow: 1,
            minHeight: 180,
            border: 1,
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
            ...DOT_GRID,
          }}
        >
          <Typography variant="figcaption" color="text.secondary">
            제스처 데모 (준비 중)
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          mt: featured ? 3 : 'auto',
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
    </Box>
  );
}
