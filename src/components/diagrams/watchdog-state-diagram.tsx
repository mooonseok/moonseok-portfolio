'use client';

import Box from '@mui/material/Box';
import { useInView } from '@/hooks/use-in-view';
import { FigCaption } from '@/components/fig-caption/fig-caption';

const FONT = 'var(--font-mono), var(--font-pretendard), monospace';
const INK = 'var(--mui-palette-primary-main)';
const TEXT = 'var(--mui-palette-text-primary)';
const MUTED = 'var(--mui-palette-text-secondary)';
const PAPER = 'var(--mui-palette-background-paper)';
const ACCENT = 'var(--mui-palette-secondary-main)';

function NodeRect({
  x,
  y,
  w,
  label,
  sub,
  dashed,
}: {
  x: number;
  y: number;
  w: number;
  label: string;
  sub?: string;
  dashed?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={48}
        fill={PAPER}
        stroke={INK}
        strokeWidth={1.2}
        strokeDasharray={dashed ? '4 3' : undefined}
      />
      <text
        x={x + w / 2}
        y={y + (sub ? 21 : 28)}
        textAnchor="middle"
        fontFamily={FONT}
        fontSize={12}
        fontWeight={700}
        fill={TEXT}
      >
        {label}
      </text>
      {sub && (
        <text
          x={x + w / 2}
          y={y + 37}
          textAnchor="middle"
          fontFamily={FONT}
          fontSize={9.5}
          fill={MUTED}
        >
          {sub}
        </text>
      )}
    </g>
  );
}

/**
 * 키오스크 watchdog 상태 전이 도식 (FIG. 2) — 수작업 SVG + 노드 순차 reveal.
 * 핵심: 의도적 해제(OTA 플래그)와 비정상 해제의 분기 (design-spec.md §3.3).
 */
export function WatchdogStateDiagram() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <Box component="figure" sx={{ m: 0 }}>
      <Box
        ref={ref}
        className={inView ? 'in' : undefined}
        sx={{
          border: 1,
          borderColor: 'divider',
          bgcolor: 'background.default',
          overflowX: 'auto', // 모바일: 축소 렌더 대신 가로 스크롤 (CLS 방지)
          // 노드→엣지 순차 reveal — transform/opacity만, stagger 80ms(diagramNode 토큰)
          '& .step': {
            opacity: 0,
            transform: 'translateY(4px)',
            transition:
              'opacity 240ms cubic-bezier(0,0,0.2,1), transform 240ms cubic-bezier(0,0,0.2,1)',
          },
          '&.in .step': { opacity: 1, transform: 'none' },
        }}
      >
        <Box
          component="svg"
          viewBox="0 0 580 250"
          role="img"
          aria-label="키오스크 모드 이탈 감지 후 의도적 해제는 OTA 설치 완료를 기다려 재진입하고, 비정상 해제는 즉시 재진입하는 watchdog 상태 전이도"
          sx={{ display: 'block', minWidth: 560, width: '100%', height: 'auto', aspectRatio: '580 / 250' }}
        >
          <defs>
            <marker
              id="wd-arrow"
              viewBox="0 0 8 8"
              refX={7}
              refY={4}
              markerWidth={7}
              markerHeight={7}
              orient="auto-start-reverse"
            >
              <path d="M0,0 L8,4 L0,8 z" fill={MUTED} />
            </marker>
          </defs>

          <g className="step" style={{ transitionDelay: '0ms' }}>
            <NodeRect x={20} y={101} w={140} label="키오스크 모드" sub="Device Owner" />
          </g>

          <g className="step" style={{ transitionDelay: '80ms' }}>
            <line x1={160} y1={125} x2={213} y2={125} stroke={MUTED} strokeWidth={1.2} markerEnd="url(#wd-arrow)" />
            <text x={187} y={114} textAnchor="middle" fontFamily={FONT} fontSize={9.5} fill={MUTED}>
              이탈 이벤트
            </text>
            <NodeRect x={215} y={101} w={120} label="해제 감지" dashed />
          </g>

          <g className="step" style={{ transitionDelay: '160ms' }}>
            <line x1={335} y1={113} x2={388} y2={62} stroke={MUTED} strokeWidth={1.2} markerEnd="url(#wd-arrow)" />
            <text x={355} y={73} textAnchor="middle" fontFamily={FONT} fontSize={9.5} fill={ACCENT}>
              플래그 ON
            </text>
            <NodeRect x={390} y={28} w={170} label="의도적 해제" sub="OTA 설치 중" />
          </g>

          <g className="step" style={{ transitionDelay: '240ms' }}>
            <path
              d="M 475 28 L 475 12 L 90 12 L 90 99"
              fill="none"
              stroke={MUTED}
              strokeWidth={1.2}
              markerEnd="url(#wd-arrow)"
            />
            <text x={282} y={8} textAnchor="middle" fontFamily={FONT} fontSize={9.5} fill={MUTED}>
              설치 완료 후 재진입
            </text>
          </g>

          <g className="step" style={{ transitionDelay: '320ms' }}>
            <line x1={335} y1={137} x2={388} y2={188} stroke={MUTED} strokeWidth={1.2} markerEnd="url(#wd-arrow)" />
            <text x={355} y={180} textAnchor="middle" fontFamily={FONT} fontSize={9.5} fill={MUTED}>
              플래그 OFF
            </text>
            <NodeRect x={390} y={174} w={170} label="비정상 해제" sub="외부 강제 해제" />
          </g>

          <g className="step" style={{ transitionDelay: '400ms' }}>
            <path
              d="M 475 222 L 475 240 L 90 240 L 90 151"
              fill="none"
              stroke={ACCENT}
              strokeWidth={1.4}
              markerEnd="url(#wd-arrow)"
            />
            <text x={282} y={236} textAnchor="middle" fontFamily={FONT} fontSize={9.5} fontWeight={700} fill={ACCENT}>
              watchdog 즉시 재진입
            </text>
          </g>
        </Box>
      </Box>
      <Box sx={{ mt: 1.5 }}>
        <FigCaption index={2}>
          watchdog 상태 전이 — 의도적 해제(OTA)와 비정상 해제의 플래그 분리
        </FigCaption>
      </Box>
    </Box>
  );
}
