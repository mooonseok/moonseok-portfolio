import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface AbstractBoxProps {
  problem: string;
  decision: string;
  result: string;
}

/**
 * ABSTRACT(TL;DR) 박스 — 문제/선택/결과 3행 고정, 결론 선행 (design-spec.md §3.3).
 * 끝까지 읽지 않는 면접관에게도 설득 포인트가 전달되게 최상단에 둔다.
 */
export function AbstractBox({ problem, decision, result }: AbstractBoxProps) {
  const rows = [
    { label: 'PROBLEM', text: problem },
    { label: 'DECISION', text: decision },
    { label: 'RESULT', text: result },
  ];

  return (
    <Box sx={{ border: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
      {rows.map((row, i) => (
        <Box
          key={row.label}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '92px 1fr', md: '120px 1fr' },
            gap: 2,
            p: 2,
            borderTop: i === 0 ? 0 : 1,
            borderColor: 'divider',
          }}
        >
          <Typography variant="overline" color="text.secondary">
            {row.label}
          </Typography>
          <Typography variant="body2" sx={{ wordBreak: 'keep-all' }}>
            {row.text}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
