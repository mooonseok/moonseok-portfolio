import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { DecisionTableData } from '@/data/project-details';

interface DecisionTableProps {
  data: DecisionTableData;
}

/**
 * 의사결정 비교표 — '고려한 대안 vs 선택안 vs 이유'를 스캔 가능하게 (design-spec.md §3.3).
 * 선택안은 좌측 보더와 SELECTED 라벨로 구분. 모바일에서도 행 단위 그리드 유지.
 */
export function DecisionTable({ data }: DecisionTableProps) {
  return (
    <Box>
      <Typography variant="figcaption" component="p" color="text.secondary">
        {data.title}
      </Typography>
      <Box sx={{ mt: 1, border: 1, borderColor: 'divider' }}>
        {data.rows.map((row, i) => (
          <Box
            key={row.option}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '220px 1fr' },
              gap: { xs: 0.5, md: 2 },
              p: 2,
              borderTop: i === 0 ? 0 : 1,
              borderColor: 'divider',
              bgcolor: row.chosen ? 'background.paper' : 'transparent',
              borderLeft: row.chosen ? 3 : 3,
              borderLeftColor: row.chosen ? 'secondary.main' : 'transparent',
            }}
          >
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: row.chosen ? 700 : 500 }}
              >
                {row.option}
              </Typography>
              {row.chosen && (
                <Typography variant="overline" color="secondary.main">
                  SELECTED
                </Typography>
              )}
            </Box>
            <Typography
              variant="body2"
              color={row.chosen ? 'text.primary' : 'text.secondary'}
              sx={{ wordBreak: 'keep-all' }}
            >
              {row.reason}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
