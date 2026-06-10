'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * 뷰포트 진입 1회 감지 (스크롤 리빌용). scroll 이벤트 금지, IntersectionObserver만 사용.
 * (design-spec.md §5 공통 60fps 규칙). 미지원/SSR 환경은 즉시 visible 처리.
 */
export function useInView<T extends HTMLElement>(
  options?: IntersectionObserverInit,
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, ...options },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return { ref, inView };
}
