'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useInView } from '@/hooks/use-in-view';
import { FigCaption } from '@/components/fig-caption/fig-caption';

interface PathRow {
  label: string;
  flow: string;
  value: string;
  /** 1 = 풀 너비. 시각 길이는 선형 비율, 수치 라벨 병기 필수. */
  ratio: number;
  accent?: boolean;
  /** true면 inView 시 1 → ratio로 수축 (40ms→1ms 서사). */
  animated?: boolean;
}

const ROWS: readonly PathRow[] = [
  {
    label: 'BEFORE — 매 요청 집계',
    flow: '요청 → orderItem groupBy 풀스캔 → 정렬 → 응답',
    value: '40ms',
    ratio: 1,
  },
  {
    label: 'AFTER — 사전 계산 캐시',
    flow: '매시간 스케줄러 → ZADD · 요청 → ZREVRANGE → 응답',
    value: '1ms',
    ratio: 0.025,
    accent: true,
    animated: true,
  },
] as const;

/**
 * Redis 캐싱 before/after 비교 (FIG. 4) — 40ms 바가 1ms로 수축하는 애니메이션.
 * width 애니메이션 금지 규칙 준수: transform scaleX만 사용 (design-spec.md §5 #4).
 * 출처 각주는 애니메이션 시작 전부터 정적 노출.
 */
export function RedisCompare() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <Box component="figure" sx={{ m: 0 }}>
      <Box
        ref={ref}
        sx={{ border: 1, borderColor: 'divider', bgcolor: 'background.default', p: { xs: 2, md: 3 } }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {ROWS.map((row) => (
            <Box key={row.label}>
              <Typography variant="overline" color={row.accent ? 'secondary.main' : 'text.secondary'}>
                {row.label}
              </Typography>
              <Typography
                variant="figcaption"
                component="p"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                {row.flow}
              </Typography>
              <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ flex: 1, height: 20, position: 'relative', overflow: 'hidden' }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      bgcolor: row.accent ? 'secondary.main' : 'primary.main',
                      transformOrigin: 'left center',
                      // bar 토큰(700ms) + easeOut. 수축 = '집계 → 캐시' 서사
                      transform: row.animated
                        ? `scaleX(${inView ? row.ratio : 1})`
                        : `scaleX(${row.ratio})`,
                      transition: row.animated
                        ? 'transform 700ms cubic-bezier(0,0,0.2,1) 150ms'
                        : 'none',
                    }}
                  />
                </Box>
                <Typography
                  variant="figcaption"
                  sx={{
                    minWidth: 56,
                    textAlign: 'right',
                    fontWeight: 700,
                    fontVariantNumeric: 'tabular-nums',
                    color: row.accent ? 'secondary.main' : 'text.primary',
                  }}
                >
                  {row.value}
                  <Typography component="sup" variant="footnoteRef" color="text.secondary">
                    1
                  </Typography>
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
        <Typography
          variant="footnote"
          component="p"
          color="text.secondary"
          sx={{ mt: 2.5, pt: 1.5, borderTop: 1, borderColor: 'divider' }}
        >
          1 합성 데이터 50만 건 시뮬레이션 기준 — 시각 길이는 선형 비율(1/40), 조회 부하는 DB에서 Redis로 분리
        </Typography>
      </Box>
      <Box sx={{ mt: 1.5 }}>
        <FigCaption index={4}>
          매 요청 Postgres 집계 → 매시간 사전 계산 Redis Sorted Set 조회
        </FigCaption>
      </Box>
    </Box>
  );
}
