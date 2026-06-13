'use client';

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

/** 5개 케이스를 명사구로 — 형용·은유 0, 케이스 1:1 매핑(오글거림 제거). */
const PHRASES = [
  '변형 제스처 캔버스',
  '키오스크 자동복구 + OTA',
  'SSE 실시간 파이프라인',
  'Redis 집계 캐싱',
  '3계층 운영 대시보드',
] as const;
const INTERVAL = 2200;

/**
 * 키네틱 타이포 헤드라인 — 문구 로테이션 + 글자 stagger + Pretendard 가변폰트
 * weight 모핑(300→800) + blur-in. transform/opacity/filter만 사용(GPU 합성).
 * reduced-motion 시 모션 제거하고 문구만 교체.
 */
export function KineticHeadline() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % PHRASES.length),
      INTERVAL,
    );
    return () => clearInterval(id);
  }, []);

  const chars = [...PHRASES[index]];

  return (
    <Box
      aria-label={PHRASES.join(', ')}
      sx={{
        fontWeight: 800,
        // 가장 긴 '키오스크 자동복구 + OTA'가 데스크톱 한 줄에 들어가도록 max 축소
        fontSize: 'clamp(2.25rem, 7vw, 4.75rem)',
        lineHeight: 1.05,
        letterSpacing: '-0.03em',
        // 가장 긴 문구가 줄바꿈돼도 CTA가 밀리지 않게 높이 예약 (모바일 2줄 / 데스크톱 1줄)
        minHeight: { xs: '2.4em', md: '1.2em' },
        color: 'text.primary',
      }}
    >
      {/* key 변경 시 글자 애니메이션 재생 */}
      <Box key={index} aria-hidden sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {chars.map((ch, i) => (
          <Box
            component="span"
            key={`${index}-${i}`}
            sx={{
              display: 'inline-block',
              whiteSpace: 'pre',
              willChange: 'transform, opacity, filter',
              ...(reduced
                ? {}
                : {
                    animation: 'charIn 620ms cubic-bezier(0.2, 0.7, 0.2, 1) both',
                    animationDelay: `${i * 38}ms`,
                  }),
              '@keyframes charIn': {
                '0%': {
                  opacity: 0,
                  transform: 'translateY(0.5em)',
                  filter: 'blur(10px)',
                  fontVariationSettings: "'wght' 300",
                },
                '60%': { filter: 'blur(0)' },
                '100%': {
                  opacity: 1,
                  transform: 'translateY(0)',
                  filter: 'blur(0)',
                  fontVariationSettings: "'wght' 800",
                },
              },
            }}
          >
            {ch}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
