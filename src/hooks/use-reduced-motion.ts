'use client';

import { useEffect, useState } from 'react';

/**
 * prefers-reduced-motion 감지 — JS 주도 애니메이션 분기 일원화 (design-spec.md §9.1).
 * CSS 주도는 globals.css 전역 @media 한 곳에서 처리하므로 여기서는 JS 트리거만 분기한다.
 * SSR/초기 렌더는 false(모션 허용)로 두고 마운트 후 동기화한다.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
