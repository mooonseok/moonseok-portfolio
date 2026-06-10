import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { PROJECTS } from '@/data/projects';
import { Section } from '@/components/section/section';
import { Reveal } from '@/components/reveal/reveal';
import { ProjectCard } from '@/sections/home/projects/project-card';

/**
 * 비대칭 벤토 그리드 (design-spec.md §3.2).
 * 분저장 featured(좌, 크게) + 키오스크·SSE 소형(우 2단) + Redis 와이드(하단).
 */
export function ProjectsSection() {
  const [featured, ...rest] = PROJECTS;

  return (
    <Section id="projects">
      <Typography variant="overline" color="text.secondary">
        SELECTED WORK
      </Typography>
      <Typography variant="h2" sx={{ mt: 1 }}>
        케이스 스터디
      </Typography>
      <Typography
        variant="footnote"
        color="text.secondary"
        sx={{ display: 'block', mt: 1.5, mb: 4 }}
      >
        5분이라면 ① 캔버스 → ② 키오스크 → ③ Experience 순서를 권합니다.
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' },
          gridAutoRows: { md: 'minmax(160px, auto)' },
        }}
      >
        <Reveal
          sx={{
            display: 'flex',
            gridColumn: { md: 'span 7' },
            gridRow: { md: 'span 2' },
          }}
        >
          <ProjectCard project={featured} featured />
        </Reveal>
        {rest.map((project, i) => (
          <Reveal
            key={project.slug}
            delay={60 * (i + 1)}
            sx={{
              display: 'flex',
              gridColumn: { md: i < 2 ? 'span 5' : 'span 12' },
            }}
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
