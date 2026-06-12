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
const OK = 'var(--mui-palette-success-main)';
const ERR = 'var(--mui-palette-error-main)';

function Message({
  y,
  fromX,
  toX,
  label,
  color = MUTED,
}: {
  y: number;
  fromX: number;
  toX: number;
  label: string;
  color?: string;
}) {
  return (
    <>
      <line x1={fromX} y1={y} x2={toX} y2={y} stroke={color} strokeWidth={1.2} markerEnd="url(#sse-arrow)" />
      <text x={(fromX + toX) / 2} y={y - 7} textAnchor="middle" fontFamily={FONT} fontSize={10} fill={color}>
        {label}
      </text>
    </>
  );
}

/**
 * SSE 재연결 시퀀스 도식 (FIG. 3) — 구독 → 스트림 → 끊김 → 재구독 순차 reveal.
 */
export function SseSequenceDiagram() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const SERVER_X = 140;
  const APP_X = 440;

  return (
    <Box component="figure" sx={{ m: 0 }}>
      <Box
        ref={ref}
        className={inView ? 'in' : undefined}
        sx={{
          border: 1,
          borderColor: 'divider',
          bgcolor: 'background.default',
          overflowX: 'auto',
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
          viewBox="0 0 580 280"
          role="img"
          aria-label="앱이 SSE를 구독해 상태 이벤트를 받다가 연결이 끊기면 재시도 타이머 후 재구독해 스트림을 복구하는 시퀀스"
          sx={{ display: 'block', minWidth: 560, width: '100%', height: 'auto', aspectRatio: '580 / 280' }}
        >
          <defs>
            <marker
              id="sse-arrow"
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

          {/* 라이프라인 */}
          <g className="step" style={{ transitionDelay: '0ms' }}>
            {[
              { x: SERVER_X, label: 'SERVER (NestJS)' },
              { x: APP_X, label: 'APP (현장 단말)' },
            ].map((col) => (
              <g key={col.label}>
                <rect x={col.x - 75} y={12} width={150} height={30} fill={PAPER} stroke={INK} strokeWidth={1.2} />
                <text x={col.x} y={31} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={700} fill={TEXT}>
                  {col.label}
                </text>
                <line x1={col.x} y1={42} x2={col.x} y2={268} stroke={MUTED} strokeWidth={1} strokeDasharray="3 4" />
              </g>
            ))}
          </g>

          <g className="step" style={{ transitionDelay: '80ms' }}>
            <Message y={72} fromX={APP_X} toX={SERVER_X + 4} label="GET /events — SSE 구독" />
          </g>
          <g className="step" style={{ transitionDelay: '160ms' }}>
            <Message y={104} fromX={SERVER_X} toX={APP_X - 4} label="event: 입고 → 가공 → 출고" color={TEXT} />
          </g>

          <g className="step" style={{ transitionDelay: '240ms' }}>
            <line x1={SERVER_X} y1={136} x2={APP_X - 4} y2={136} stroke={ERR} strokeWidth={1.2} strokeDasharray="5 4" />
            <text x={(SERVER_X + APP_X) / 2} y={129} textAnchor="middle" fontFamily={FONT} fontSize={10} fill={ERR}>
              ✕ 연결 끊김 (네트워크 단절)
            </text>
          </g>

          <g className="step" style={{ transitionDelay: '320ms' }}>
            <rect x={APP_X - 64} y={156} width={128} height={26} fill={PAPER} stroke={MUTED} strokeWidth={1} strokeDasharray="4 3" />
            <text x={APP_X} y={173} textAnchor="middle" fontFamily={FONT} fontSize={10} fill={MUTED}>
              retry 타이머
            </text>
          </g>

          <g className="step" style={{ transitionDelay: '400ms' }}>
            <Message y={210} fromX={APP_X} toX={SERVER_X + 4} label="자동 재구독" color={ACCENT} />
          </g>
          <g className="step" style={{ transitionDelay: '480ms' }}>
            <Message y={244} fromX={SERVER_X} toX={APP_X - 4} label="스트림 재개 — 사람 개입 없음" color={OK} />
          </g>
        </Box>
      </Box>
      <Box sx={{ mt: 1.5 }}>
        <FigCaption index={3}>
          SSE 자동 재연결 시퀀스 — 끊김을 전제로 한 무인 환경 설계
        </FigCaption>
      </Box>
    </Box>
  );
}
