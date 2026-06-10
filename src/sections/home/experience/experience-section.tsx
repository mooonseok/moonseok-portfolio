'use client';

import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { EXPERIENCE } from '@/data/experience';
import { SKILL_GROUPS } from '@/data/skills';
import { getProject } from '@/data/projects';
import { Section } from '@/components/section/section';

/**
 * 경력 타임라인 + 스킬 — 회사명 없이 기간·역할·연결 케이스만, 텍스트 최소화.
 * (design-spec.md §3.2)
 */
export function ExperienceSection() {
  return (
    <Section id="experience">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '0.9fr 1.1fr' },
          gap: { xs: 5, md: 8 },
        }}
      >
        {/* 타임라인 */}
        <Box>
          <Typography variant="overline" color="text.secondary">
            EXPERIENCE
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
            {EXPERIENCE.map((item) => (
              <Box
                key={item.period}
                sx={{ borderLeft: 2, borderColor: 'divider', pl: 2 }}
              >
                <Typography
                  variant="figcaption"
                  color="text.secondary"
                  component="p"
                >
                  {item.period}
                </Typography>
                <Typography sx={{ fontWeight: 700, mt: 0.5 }}>
                  {item.role}
                </Typography>
                <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {item.cases.map((slug) => {
                    const project = getProject(slug);
                    if (!project) return null;
                    return (
                      <Chip
                        key={slug}
                        component={Link}
                        href={`/projects/${slug}`}
                        clickable
                        size="small"
                        variant="outlined"
                        label={project.title}
                      />
                    );
                  })}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* 스킬 */}
        <Box>
          <Typography variant="overline" color="text.secondary">
            STACK
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {SKILL_GROUPS.map((group) => (
              <Box key={group.title}>
                <Typography variant="figcaption" color="text.secondary" component="p">
                  {group.title}
                </Typography>
                <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {group.items.map((item) =>
                    item.slug ? (
                      <Chip
                        key={item.label}
                        component={Link}
                        href={`/projects/${item.slug}`}
                        clickable
                        size="small"
                        label={item.label}
                      />
                    ) : (
                      <Chip
                        key={item.label}
                        size="small"
                        variant="outlined"
                        label={item.label}
                      />
                    ),
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Section>
  );
}
