'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/** 데모 오브젝트의 변환 상태. rotation은 deg. */
export interface GestureTransform {
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

/** 초기 transform — 반드시 상수 (난수/Date 금지: hydration mismatch 방지, design-spec.md §4.1). */
export const INITIAL_TRANSFORM: GestureTransform = {
  x: 0,
  y: 0,
  rotation: -8,
  scale: 1,
};

const SCALE_MIN = 0.4;
const SCALE_MAX = 2.5;
const clampScale = (value: number) =>
  Math.min(SCALE_MAX, Math.max(SCALE_MIN, value));

export const toTransformCss = (t: GestureTransform) =>
  `translate(${t.x}px, ${t.y}px) rotate(${t.rotation}deg) scale(${t.scale})`;

type DragState =
  | {
      mode: 'move';
      startX: number;
      startY: number;
      baseX: number;
      baseY: number;
    }
  | {
      mode: 'handle';
      centerX: number;
      centerY: number;
      baseAngle: number;
      baseDist: number;
      baseRotation: number;
      baseScale: number;
    };

interface UseGestureTransformOptions {
  /** rAF 프레임마다 호출 — 라이브 리드아웃을 DOM 직접 갱신(드래그 중 setState 금지 규칙). */
  onLiveUpdate?: (t: GestureTransform) => void;
}

/**
 * 제스처 데모 ViewModel (design-spec.md §4.1).
 * - 몸체 드래그 = 이동 / 핸들 드래그 = 중심-제어점 벡터의 atan2 회전 + 거리 비율 스케일
 * - pointermove마다 setState 금지: ref에 누적 → rAF에서 style.transform 직접 기록,
 *   pointerup 시점에만 React state(committed) 커밋
 * - 좌표 변환: getBoundingClientRect ↔ Flutter RenderBox.localToGlobal 대응
 */
export function useGestureTransform({
  onLiveUpdate,
}: UseGestureTransformOptions = {}) {
  const objectRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<GestureTransform>({ ...INITIAL_TRANSFORM });
  const dragRef = useRef<DragState | null>(null);
  const rafRef = useRef(0);
  const [committed, setCommitted] =
    useState<GestureTransform>(INITIAL_TRANSFORM);
  const [hasInteracted, setHasInteracted] = useState(false);

  const applyFrame = useCallback(() => {
    rafRef.current = 0;
    const el = objectRef.current;
    if (!el) return;
    el.style.transform = toTransformCss(stateRef.current);
    onLiveUpdate?.(stateRef.current);
  }, [onLiveUpdate]);

  const scheduleFrame = useCallback(() => {
    if (rafRef.current === 0) {
      rafRef.current = requestAnimationFrame(applyFrame);
    }
  }, [applyFrame]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const commit = useCallback(() => {
    setCommitted({ ...stateRef.current });
    onLiveUpdate?.(stateRef.current);
  }, [onLiveUpdate]);

  const startDrag = useCallback(
    (event: React.PointerEvent, mode: 'move' | 'handle') => {
      const el = objectRef.current;
      if (!el) return;
      event.preventDefault();
      event.stopPropagation();
      try {
        (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
      } catch {
        // 합성(untrusted) 이벤트 등 캡처 불가 환경은 무시 — 버블링으로도 동작
      }
      // will-change는 인터랙션 시작 시 부여, 종료 시 제거 (상시 부여 금지)
      el.style.willChange = 'transform';
      const s = stateRef.current;
      if (mode === 'move') {
        dragRef.current = {
          mode: 'move',
          startX: event.clientX,
          startY: event.clientY,
          baseX: s.x,
          baseY: s.y,
        };
      } else {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = event.clientX - centerX;
        const dy = event.clientY - centerY;
        dragRef.current = {
          mode: 'handle',
          centerX,
          centerY,
          baseAngle: Math.atan2(dy, dx),
          baseDist: Math.hypot(dx, dy) || 1,
          baseRotation: s.rotation,
          baseScale: s.scale,
        };
      }
      setHasInteracted(true);
    },
    [],
  );

  const onBodyPointerDown = useCallback(
    (event: React.PointerEvent) => startDrag(event, 'move'),
    [startDrag],
  );
  const onHandlePointerDown = useCallback(
    (event: React.PointerEvent) => startDrag(event, 'handle'),
    [startDrag],
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent) => {
      const drag = dragRef.current;
      if (!drag) return;
      const s = stateRef.current;
      if (drag.mode === 'move') {
        s.x = drag.baseX + (event.clientX - drag.startX);
        s.y = drag.baseY + (event.clientY - drag.startY);
      } else {
        const dx = event.clientX - drag.centerX;
        const dy = event.clientY - drag.centerY;
        // rotation = atan2(dy, dx) · scale = |P−C| / |P₀−C|
        s.rotation =
          drag.baseRotation +
          (Math.atan2(dy, dx) - drag.baseAngle) * (180 / Math.PI);
        s.scale = clampScale(
          drag.baseScale * (Math.hypot(dx, dy) / drag.baseDist),
        );
      }
      scheduleFrame();
    },
    [scheduleFrame],
  );

  const onPointerEnd = useCallback(() => {
    if (!dragRef.current) return;
    dragRef.current = null;
    const el = objectRef.current;
    if (el) el.style.willChange = '';
    commit();
  }, [commit]);

  /** 키보드 대체 조작 — 즉시 적용 후 커밋 (aria-live 갱신 시점). */
  const mutate = useCallback(
    (fn: (s: GestureTransform) => void) => {
      fn(stateRef.current);
      const el = objectRef.current;
      if (el) el.style.transform = toTransformCss(stateRef.current);
      setHasInteracted(true);
      commit();
    },
    [commit],
  );

  const rotateBy = useCallback(
    (deg: number) =>
      mutate((s) => {
        s.rotation += deg;
      }),
    [mutate],
  );
  const scaleBy = useCallback(
    (factor: number) =>
      mutate((s) => {
        s.scale = clampScale(s.scale * factor);
      }),
    [mutate],
  );
  const reset = useCallback(
    () =>
      mutate((s) => {
        Object.assign(s, INITIAL_TRANSFORM);
      }),
    [mutate],
  );

  return {
    objectRef,
    committed,
    hasInteracted,
    onBodyPointerDown,
    onHandlePointerDown,
    onPointerMove,
    onPointerEnd,
    rotateBy,
    scaleBy,
    reset,
  };
}
