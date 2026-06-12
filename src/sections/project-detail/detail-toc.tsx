'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useActiveSection } from '@/sections/project-detail/use-active-section';

export interface TocItem {
  id: string;
  label: string;
}

interface DetailTocProps {
  items: readonly TocItem[];
}

/**
 * 상세 페이지 ToC (design-spec.md §3.3).
 * md+: 좌측 스티키 레일 세로 목록 / xs: 앱바 아래 가로 스크롤 칩 바.
 */
export function DetailToc({ items }: DetailTocProps) {
  const activeId = useActiveSection(items.map((item) => item.id));

  return (
    <Box
      component="nav"
      aria-label="본문 목차"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'row', md: 'column' },
        gap: { xs: 1, md: 0.5 },
        overflowX: { xs: 'auto', md: 'visible' },
        // 모바일: sticky 칩 바 (앱바 높이 아래)
        position: 'sticky',
        top: { xs: 56, md: 96 },
        bgcolor: { xs: 'background.default', md: 'transparent' },
        zIndex: 1,
        py: { xs: 1, md: 0 },
      }}
    >
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <Typography
            key={item.id}
            component="a"
            href={`#${item.id}`}
            variant="figcaption"
            sx={{
              whiteSpace: 'nowrap',
              px: { xs: 1.5, md: 0 },
              py: { xs: 0.5, md: 0.5 },
              border: { xs: 1, md: 0 },
              borderColor: { xs: active ? 'text.primary' : 'divider' },
              color: active ? 'secondary.main' : 'text.secondary',
              fontWeight: active ? 700 : 400,
              transition: 'color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': { color: 'text.primary' },
            }}
          >
            {item.label}
          </Typography>
        );
      })}
    </Box>
  );
}
