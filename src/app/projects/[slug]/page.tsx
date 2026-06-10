import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProject, getProjectSlugs, PROJECTS } from '@/data/projects';

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

/**
 * 프로젝트 상세.
 * ①단계에서는 라우팅·정적생성 검증용 골격만 둔다.
 * ③단계에서 ABSTRACT 박스 / 문제 / 의사결정 비교표 / 도식 / 결과 / 회고 + prev·next 로 교체한다.
 */
export default async function ProjectDetailPage(
  props: PageProps<'/projects/[slug]'>,
) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const order = PROJECTS.findIndex((item) => item.slug === project.slug);
  const prev = order > 0 ? PROJECTS[order - 1] : undefined;
  const next = order < PROJECTS.length - 1 ? PROJECTS[order + 1] : undefined;

  return (
    <main>
      <p>
        {String(project.index).padStart(2, '0')} / {project.strength}
      </p>
      <h1>{project.title}</h1>
      <p>{project.hook}</p>

      <dl>
        <dt>역할</dt>
        <dd>{project.role}</dd>
        <dt>기간</dt>
        <dd>{project.period}</dd>
        <dt>스택</dt>
        <dd>{project.stack.join(' · ')}</dd>
      </dl>

      <nav aria-label="케이스 스터디 이동">
        {prev && <Link href={`/projects/${prev.slug}`}>← {prev.title}</Link>}
        {next && <Link href={`/projects/${next.slug}`}>{next.title} →</Link>}
        <Link href="/">홈</Link>
      </nav>
    </main>
  );
}
