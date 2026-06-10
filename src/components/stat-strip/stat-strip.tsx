import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface Stat {
  value: string;
  source: string;
}

/**
 * 정량 수치 + 위첨자 각주 + 하단 각주 블록 (design-spec.md §10.2).
 * 수치와 출처를 처음부터 동시 노출한다.
 */
export function StatStrip({ stats }: { stats: readonly Stat[] }) {
  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 3, md: 5 } }}>
        {stats.map((stat, i) => (
          <Typography
            key={stat.value}
            sx={{
              fontFamily: 'var(--font-mono), var(--font-pretendard), monospace',
              fontWeight: 700,
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              fontVariantNumeric: 'tabular-nums',
              color: 'text.primary',
            }}
          >
            {stat.value}
            <Typography component="sup" variant="footnoteRef" color="text.secondary">
              {i + 1}
            </Typography>
          </Typography>
        ))}
      </Box>
      <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0, mt: 2 }}>
        {stats.map((stat, i) => (
          <Typography
            key={stat.value}
            component="li"
            variant="footnote"
            color="text.secondary"
          >
            {i + 1} {stat.source}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
