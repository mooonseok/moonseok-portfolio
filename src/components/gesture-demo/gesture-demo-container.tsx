'use client';

import { useCallback, useRef } from 'react';
import Box from '@mui/material/Box';
import { useInView } from '@/hooks/use-in-view';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import {
  useGestureTransform,
  type GestureTransform,
} from '@/components/gesture-demo/use-gesture-transform';
import {
  GestureDemoView,
  type GestureDemoVariant,
} from '@/components/gesture-demo/gesture-demo-view';

interface GestureDemoContainerProps {
  variant: GestureDemoVariant;
}

/**
 * 제스처 데모 Container — 훅(ViewModel) 결합 + 라이브 리드아웃 DOM 직접 갱신.
 * 일반 클라이언트 컴포넌트로 SSG 초기 마크업 유지 (next/dynamic ssr:false 금지 — §4.1).
 */
export function GestureDemoContainer({ variant }: GestureDemoContainerProps) {
  const reducedMotion = useReducedMotion();
  const { ref: rootRef, inView } = useInView<HTMLDivElement>();

  const rotationReadoutRef = useRef<HTMLSpanElement>(null);
  const scaleReadoutRef = useRef<HTMLSpanElement>(null);

  // 드래그 중 setState 금지 — rAF 프레임에서 리드아웃 textContent 직접 기록
  const handleLiveUpdate = useCallback((t: GestureTransform) => {
    if (rotationReadoutRef.current) {
      rotationReadoutRef.current.textContent = `${t.rotation.toFixed(1)}°`;
    }
    if (scaleReadoutRef.current) {
      scaleReadoutRef.current.textContent = `×${t.scale.toFixed(2)}`;
    }
  }, []);

  const gesture = useGestureTransform({
    onLiveUpdate: variant === 'full' ? handleLiveUpdate : undefined,
  });

  // 아이들 힌트 — 뷰포트 진입 + 미조작 + 모션 허용일 때만 1회
  const hintActive = inView && !gesture.hasInteracted && !reducedMotion;

  return (
    <Box ref={rootRef}>
      <GestureDemoView
        variant={variant}
        objectRef={gesture.objectRef}
        rotationReadoutRef={rotationReadoutRef}
        scaleReadoutRef={scaleReadoutRef}
        committed={gesture.committed}
        hintActive={hintActive}
        onBodyPointerDown={gesture.onBodyPointerDown}
        onHandlePointerDown={gesture.onHandlePointerDown}
        onPointerMove={gesture.onPointerMove}
        onPointerEnd={gesture.onPointerEnd}
        onRotate={gesture.rotateBy}
        onScale={gesture.scaleBy}
        onReset={gesture.reset}
      />
    </Box>
  );
}
