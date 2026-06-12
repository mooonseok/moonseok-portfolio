import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { getProject, getProjectSlugs, PROJECTS } from '@/data/projects';
import { PROJECT_DETAILS } from '@/data/project-details';
import { AbstractBox } from '@/sections/project-detail/abstract-box';
import { DecisionTable } from '@/sections/project-detail/decision-table';
import { EvidenceBlock } from '@/sections/project-detail/evidence-block';
import { DetailToc, type TocItem } from '@/sections/project-detail/detail-toc';
import { DetailNav } from '@/sections/project-detail/detail-nav';

/** 4개 slug를 빌드 타임에 정적 생성 (SSG). */
export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<'/projects/[slug]'>,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.hook };
}

const TOC_ITEMS: readonly TocItem[] = [
  { id: 'problem', label: '문제' },
  { id: 'decision', label: '의사결정' },
  { id: 'result', label: '결과' },
  { id: 'retro', label: '회고' },
];

const SECTION_TITLE_SX = { mb: 3, fontSize: '1.25rem' } as const;
const PROSE_SX = { maxWidth: '70ch', wordBreak: 'keep-all' } as const;

/**
 * 프로젝트 상세 — 결론 선행 템플릿 (design-spec.md §3.3).
 * 오프닝(문제 한 문장) → ABSTRACT → [좌: 스티키 ToC+메타 / 우: 본문] → prev/next.
 */
export default async function ProjectDetailPage(
  props: PageProps<'/projects/[slug]'>,
) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();
  const detail = PROJECT_DETAILS[project.slug];

  const order = PROJECTS.findIndex((item) => item.slug === project.slug);
  const prev = order > 0 ? PROJECTS[order - 1] : undefined;
  const next = order < PROJECTS.length - 1 ? PROJECTS[order + 1] : undefined;

  let footnoteNumber = 0;
  const resultFootnotes = detail.results
    .filter((item) => item.source)
    .map((item) => item.source as string);

  return (
    <Box component="main">
      <Container maxWidth="lg" sx={{ pt: { xs: 5, md: 8 }, pb: { xs: 8, md: 12 } }}>
        {/* 오프닝 — 문제 한 문장이 페이지를 연다 */}
        <Typography variant="overline" color="text.secondary">
          {String(project.index).padStart(2, '0')} / {project.strength}
        </Typography>
        <Typography variant="h3" component="h1" sx={{ mt: 1, maxWidth: '24ch' }}>
          {detail.problemStatement}
        </Typography>

        <Box sx={{ mt: 4, maxWidth: '78ch' }}>
          <AbstractBox {...detail.abstract} />
        </Box>

        <Box
          sx={{
            mt: { xs: 4, md: 7 },
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '200px 1fr' },
            gap: { xs: 3, md: 7 },
            alignItems: 'start',
          }}
        >
          {/* 좌측 레일 — 스티키 ToC + 개요 메타 */}
          <Box sx={{ position: { md: 'sticky' }, top: { md: 96 } }}>
            <DetailToc items={TOC_ITEMS} />
            <Box sx={{ display: { xs: 'none', md: 'block' }, mt: 3 }}>
              <Typography variant="figcaption" component="p" color="text.secondary">
                {project.role}
              </Typography>
              <Typography variant="figcaption" component="p" color="text.secondary" sx={{ mt: 0.5 }}>
                {project.period} · {project.org}
              </Typography>
              <Box sx={{ mt: 1.5, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {project.stack.map((tech) => (
                  <Chip key={tech} size="small" variant="outlined" label={tech} />
                ))}
              </Box>
            </Box>
          </Box>

          {/* 본문 */}
          <Box component="article">
            <Box component="section" id="problem">
              <Typography variant="h2" sx={SECTION_TITLE_SX}>
                문제
              </Typography>
              {detail.problem.map((paragraph) => (
                <Typography key={paragraph.slice(0, 20)} sx={{ ...PROSE_SX, mb: 2 }}>
                  {paragraph}
                </Typography>
              ))}
            </Box>

            <Box component="section" id="decision" sx={{ mt: 7 }}>
              <Typography variant="h2" sx={SECTION_TITLE_SX}>
                의사결정 · 트레이드오프
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {detail.decisions.map((table) => (
                  <DecisionTable key={table.title} data={table} />
                ))}
                <EvidenceBlock slug={project.slug} />
              </Box>
            </Box>

            <Box component="section" id="result" sx={{ mt: 7 }}>
              <Typography variant="h2" sx={SECTION_TITLE_SX}>
                결과
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                {detail.results.map((item) => {
                  if (item.source) footnoteNumber += 1;
                  const num = item.source ? footnoteNumber : undefined;
                  return (
                    <Box key={item.value} sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                      <Typography
                        sx={{
                          fontFamily: 'var(--font-mono), var(--font-pretendard), monospace',
                          fontWeight: 700,
                          fontSize: '1.35rem',
                          fontVariantNumeric: 'tabular-nums',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {item.value}
                        {num && (
                          <Typography component="sup" variant="footnoteRef" color="text.secondary">
                            {num}
                          </Typography>
                        )}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'keep-all' }}>
                        {item.description}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
              {resultFootnotes.length > 0 && (
                <Box
                  component="ol"
                  sx={{ listStyle: 'none', m: 0, p: 0, mt: 3, pt: 1.5, borderTop: 1, borderColor: 'divider' }}
                >
                  {resultFootnotes.map((source, i) => (
                    <Typography key={source} component="li" variant="footnote" color="text.secondary">
                      {i + 1} {source}
                    </Typography>
                  ))}
                </Box>
              )}
            </Box>

            <Box component="section" id="retro" sx={{ mt: 7 }}>
              <Typography variant="h2" sx={SECTION_TITLE_SX}>
                회고
              </Typography>
              <Typography sx={PROSE_SX} color="text.secondary">
                {detail.retrospective}
              </Typography>
            </Box>

            <DetailNav prev={prev} next={next} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
