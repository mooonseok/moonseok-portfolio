'use client';

import { useEffect, useState } from 'react';

/**
 * 본문 섹션 중 현재 뷰포트 중앙에 있는 id를 추적 — ToC 하이라이트용.
 * scroll 이벤트 금지, IntersectionObserver만 사용 (design-spec.md §5 공통 규칙).
 */
export function useActiveSection(sectionIds: readonly string[]): string {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            return;
          }
        }
      },
      // 뷰포트 상단 35%~하단 55% 사이에 들어온 섹션을 활성으로 본다
      { rootMargin: '-35% 0px -55% 0px' },
    );
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
