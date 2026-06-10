'use client';

import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { useInView } from '@/hooks/use-in-view';

interface RevealProps {
  children: React.ReactNode;
  /** stagger 지연(ms). */
  delay?: number;
  sx?: SxProps<Theme>;
}

/**
 * 뷰포트 진입 시 1회 등장(translateY 12px + opacity).
 * transform/opacity만 변경(GPU 합성). reduced-motion은 전역 @media에서 무효화.
 * (design-spec.md §5 #6)
 */
export function Reveal({ children, delay = 0, sx }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <Box
      ref={ref}
      sx={[
        (theme) => ({
          opacity: inView ? 1 : 0,
          transform: inView ? 'none' : 'translateY(12px)',
          transition: theme.transitions.create(['opacity', 'transform'], {
            duration: theme.transitions.duration.reveal,
            easing: theme.transitions.easing.easeOut,
          }),
          transitionDelay: `${delay}ms`,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
}
