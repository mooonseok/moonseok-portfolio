import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const INVERSE_MUTED = 'rgba(250, 250, 248, 0.72)';

/**
 * 풀블리드 메트릭 밴드 (inverse) — 가장 강한 단일 수치에 집중 (design-spec.md §3.3 #3).
 * 출처 각주는 수치와 동시 노출.
 */
export function MetricsBand() {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="overline" sx={{ color: INVERSE_MUTED }}>
          PERFORMANCE
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            gap: { xs: 1.5, md: 3 },
            mt: 2,
          }}
        >
          <Typography variant="metric" component="p">
            40ms → 1ms
            <Typography component="sup" variant="footnoteRef">
              1
            </Typography>
          </Typography>
          <Typography variant="h3" sx={{ color: INVERSE_MUTED }}>
            약 40배 단축
          </Typography>
        </Box>
        <Typography
          variant="footnote"
          sx={{ display: 'block', mt: 2.5, color: INVERSE_MUTED }}
        >
          1 합성 데이터 50만 건 시뮬레이션 기준 · Postgres 집계 → Redis Sorted Set 캐시
        </Typography>
      </Container>
    </Box>
  );
}
