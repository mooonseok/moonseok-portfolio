'use client';

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

/** 작업의 성격을 한 단어로 — 직함·이력이 아니라 '무엇을 만드는가'. 4개 케이스 축에 매핑. */
const PHRASES = ['만지는 UI', '안 죽는 운영', '끊기지 않는 실시간', '빨라지는 응답'] as const;
const INTERVAL = 2600;

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
        fontSize: 'clamp(2.5rem, 8.5vw, 5.75rem)',
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
