import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { SITE } from '@/data/site';
import { Section } from '@/components/section/section';

/** 연락 — 텍스트 최소화. 이메일·GitHub·이력서 액션만. */
export function ContactSection() {
  return (
    <Section id="contact" sx={{ borderTop: 1, borderColor: 'divider' }}>
      <Typography variant="overline" color="text.secondary">
        CONTACT
      </Typography>
      <Typography variant="h2" sx={{ mt: 1, mb: 3 }}>
        연락
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
        <Button
          component="a"
          href={`mailto:${SITE.email}`}
          variant="contained"
          color="primary"
        >
          {SITE.email}
        </Button>
        {SITE.githubUrl && (
          <Button
            component="a"
            href={SITE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            color="primary"
          >
            GitHub
          </Button>
        )}
        {SITE.resumeUrl && (
          <Button component="a" href={SITE.resumeUrl} variant="text" color="primary">
            이력서 다운로드
          </Button>
        )}
      </Box>
    </Section>
  );
}
