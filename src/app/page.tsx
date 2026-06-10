import Link from 'next/link';
import { PROJECTS } from '@/data/projects';
import { SITE } from '@/data/site';

/**
 * 홈 (원페이지).
 * ①단계에서는 라우팅 검증용 골격만 둔다.
 * ③단계에서 Hero / 벤토 Projects / 메트릭 밴드 / Experience+Contact 섹션 컴포넌트로 교체한다.
 */
export default function HomePage() {
  return (
    <main>
      <h1>
        {SITE.name} — {SITE.role} {SITE.yearsLabel}
      </h1>
      <p>{SITE.positioning}</p>

      <nav aria-label="프로젝트 케이스 스터디">
        <ol>
          {PROJECTS.map((project) => (
            <li key={project.slug}>
              <Link href={`/projects/${project.slug}`}>
                {String(project.index).padStart(2, '0')} / {project.strength} —{' '}
                {project.title}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </main>
  );
}
