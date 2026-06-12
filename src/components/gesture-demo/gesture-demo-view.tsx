'use client';

import type { RefObject } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DOT_GRID } from '@/theme/theme';
import { FigCaption } from '@/components/fig-caption/fig-caption';
import {
  toTransformCss,
  type GestureTransform,
} from '@/components/gesture-demo/use-gesture-transform';

export type GestureDemoVariant = 'teaser' | 'full';

interface GestureDemoViewProps {
  variant: GestureDemoVariant;
  objectRef: RefObject<HTMLDivElement | null>;
  rotationReadoutRef: RefObject<HTMLSpanElement | null>;
  scaleReadoutRef: RefObject<HTMLSpanElement | null>;
  committed: GestureTransform;
  hintActive: boolean;
  onBodyPointerDown: (event: React.PointerEvent) => void;
  onHandlePointerDown: (event: React.PointerEvent) => void;
  onPointerMove: (event: React.PointerEvent) => void;
  onPointerEnd: () => void;
  onRotate: (deg: number) => void;
  onScale: (factor: number) => void;
  onReset: () => void;
}

const VISUALLY_HIDDEN = {
  position: 'absolute',
  width: 1,
  height: 1,
  overflow: 'hidden',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
} as const;

/**
 * 제스처 캔버스 데모 View (design-spec.md §4.1).
 * 몸체 드래그=이동, 우하단 핸들 드래그=회전(atan2)+스케일(거리비).
 * touch-action: none은 오브젝트·핸들에만 — 스테이지에 걸면 모바일 페이지 스크롤이 막힌다.
 */
export function GestureDemoView({
  variant,
  objectRef,
  rotationReadoutRef,
  scaleReadoutRef,
  committed,
  hintActive,
  onBodyPointerDown,
  onHandlePointerDown,
  onPointerMove,
  onPointerEnd,
  onRotate,
  onScale,
  onReset,
}: GestureDemoViewProps) {
  const isFull = variant === 'full';
  const objectSize = isFull ? 150 : 116;
  const dragHandlers = {
    onPointerMove,
    onPointerUp: onPointerEnd,
    onPointerCancel: onPointerEnd,
    onLostPointerCapture: onPointerEnd,
  };

  return (
    <Box component="figure" sx={{ m: 0 }}>
      {/* 스테이지 */}
      <Box
        sx={{
          position: 'relative',
          aspectRatio: isFull ? '16 / 10' : '4 / 3',
          border: 1,
          borderColor: 'divider',
          bgcolor: 'background.default',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          userSelect: 'none',
          ...DOT_GRID,
        }}
      >
        {/* 오브젝트 — 분저장 스티커를 일반화한 추상 도형 1개 (실제 UI 모방 금지) */}
        <Box
          ref={objectRef}
          onPointerDown={onBodyPointerDown}
          {...dragHandlers}
          style={{ transform: toTransformCss(committed) }}
          sx={{
            position: 'relative',
            width: objectSize,
            height: objectSize,
            bgcolor: 'background.paper',
            border: '1.5px solid',
            borderColor: 'primary.main',
            // 데모 아티팩트(스티커 일반화)라 radius 0 규칙의 예외 — UI 크롬이 아님 (§4.1)
            borderRadius: '12px',
            cursor: 'grab',
            touchAction: 'none',
            '&:active': { cursor: 'grabbing' },
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              width: 12,
              height: 12,
              borderRadius: '50%',
              bgcolor: 'secondary.main',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              left: 12,
              right: 34,
              bottom: 24,
              height: 2,
              bgcolor: 'divider',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              left: 12,
              right: 50,
              bottom: 14,
              height: 2,
              bgcolor: 'divider',
            }}
          />

          {/* 제어점 핸들 — 시각 28px, 히트 영역 44px (radius 0 규칙의 유일한 UI 예외) */}
          <Box
            onPointerDown={onHandlePointerDown}
            {...dragHandlers}
            aria-hidden
            sx={{
              position: 'absolute',
              right: -22,
              bottom: -22,
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              touchAction: 'none',
              cursor: 'grab',
              '&:active': { cursor: 'grabbing' },
              '&::after': {
                content: '""',
                position: 'absolute',
                width: 28,
                height: 28,
                borderRadius: '50%',
                border: '2px solid',
                borderColor: 'secondary.main',
                opacity: 0,
                // 아이들 힌트 펄스 — transform/opacity만, 2회·1초 이내 (reduced-motion 시 비활성)
                animation: hintActive
                  ? 'gestureHint 500ms ease-out 2'
                  : 'none',
              },
              '@keyframes gestureHint': {
                from: { transform: 'scale(1)', opacity: 0.6 },
                to: { transform: 'scale(1.7)', opacity: 0 },
              },
            }}
          >
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                bgcolor: 'secondary.main',
                border: '2px solid',
                borderColor: 'background.paper',
              }}
            />
          </Box>
        </Box>

        {/* 라벨/리드아웃 오버레이 */}
        {isFull ? (
          <Typography
            variant="figcaption"
            sx={{
              position: 'absolute',
              top: 10,
              left: 12,
              color: 'text.secondary',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            rotation{' '}
            <Box component="span" ref={rotationReadoutRef} sx={{ color: 'secondary.main' }}>
              {committed.rotation.toFixed(1)}°
            </Box>
            {' · '}scale{' '}
            <Box component="span" ref={scaleReadoutRef} sx={{ color: 'secondary.main' }}>
              ×{committed.scale.toFixed(2)}
            </Box>
          </Typography>
        ) : (
          <Typography
            variant="overline"
            sx={{
              position: 'absolute',
              bottom: 8,
              left: 12,
              color: 'text.secondary',
            }}
          >
            DRAG THE HANDLE
          </Typography>
        )}
      </Box>

      {/* 수식 캡션 + 대응표 + 키보드 대체 조작 (full 전용) */}
      {isFull && (
        <>
          <Box sx={{ mt: 1.5 }}>
            <FigCaption index={1}>
              rotation = atan2(dy, dx) · scale = |P−C| / |P₀−C|
            </FigCaption>
            <Typography
              variant="figcaption"
              component="p"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              Flutter: RenderBox.localToGlobal ↔ Web: getBoundingClientRect
            </Typography>
          </Box>
          <Box sx={{ mt: 1.5, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Button size="small" variant="outlined" onClick={() => onRotate(-15)} aria-label="15도 반시계 회전">
              −15°
            </Button>
            <Button size="small" variant="outlined" onClick={() => onRotate(15)} aria-label="15도 시계 회전">
              +15°
            </Button>
            <Button size="small" variant="outlined" onClick={() => onScale(0.9)} aria-label="10퍼센트 축소">
              −10%
            </Button>
            <Button size="small" variant="outlined" onClick={() => onScale(1.1)} aria-label="10퍼센트 확대">
              +10%
            </Button>
            <Button size="small" variant="text" onClick={onReset} aria-label="초기 상태로 리셋">
              리셋
            </Button>
          </Box>
          {/* 커밋 시점에만 갱신되는 스크린리더용 리드아웃 (드래그 중 폭주 방지) */}
          <Box component="span" aria-live="polite" sx={VISUALLY_HIDDEN}>
            회전 {committed.rotation.toFixed(0)}도, 크기 {committed.scale.toFixed(2)}배
          </Box>
        </>
      )}
    </Box>
  );
}
