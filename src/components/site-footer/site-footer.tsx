import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { SITE } from '@/data/site';

/**
 * 공통 푸터. '빌드 노트'(성능 수치·60fps 규칙·트레이드오프 공개)는 ③단계에서 확장한다.
 * (design-spec.md §3.2 — 설계·성능 서사의 메타 증거)
 */
export function SiteFooter() {
  return (
    <Box
      component="footer"
      sx={{ borderTop: 1, borderColor: 'divider', mt: 'auto' }}
    >
      <Container
        maxWidth="lg"
        sx={{
          py: 4,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {SITE.name} · {SITE.role}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Link href={`mailto:${SITE.email}`} color="text.secondary" variant="body2">
            {SITE.email}
          </Link>
          {SITE.githubUrl && (
            <Link
              href={SITE.githubUrl}
              color="text.secondary"
              variant="body2"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
          )}
        </Box>
      </Container>
    </Box>
  );
}
