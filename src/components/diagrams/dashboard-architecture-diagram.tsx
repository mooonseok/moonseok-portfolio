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

function Node({
  x,
  y,
  w,
  label,
  sub,
}: {
  x: number;
  y: number;
  w: number;
  label: string;
  sub?: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={52} fill={PAPER} stroke={INK} strokeWidth={1.2} />
      <text
        x={x + w / 2}
        y={y + (sub ? 22 : 30)}
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
          y={y + 39}
          textAnchor="middle"
          fontFamily={FONT}
          fontSize={9}
          fill={MUTED}
        >
          {sub}
        </text>
      )}
    </g>
  );
}

function Edge({
  d,
  color = MUTED,
  dashed,
  label,
  lx,
  ly,
}: {
  d: string;
  color?: string;
  dashed?: boolean;
  label?: string;
  lx?: number;
  ly?: number;
}) {
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={1.3}
        strokeDasharray={dashed ? '5 4' : undefined}
        markerEnd="url(#dash-arrow)"
      />
      {label && lx != null && ly != null && (
        <text x={lx} y={ly} textAnchor="middle" fontFamily={FONT} fontSize={9.5} fill={color}>
          {label}
        </text>
      )}
    </g>
  );
}

/**
 * 운영 대시보드 3계층 + 상태 이원화 데이터 흐름 (FIG. 5) — 수작업 SVG + 노드 순차 reveal.
 * 좌(외부 소스) → 중(React Query / Zustand 상태) → 우(Container→ViewModel→View) + 무효화 회귀.
 */
export function DashboardArchitectureDiagram() {
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
          viewBox="0 0 640 340"
          role="img"
          aria-label="좌측 SERVER·BROWSER 외부 소스가 중앙 React Query(서버 상태)·Zustand(전역 상태)로 들어가고, 두 상태가 우측 Container→ViewModel(use-*)→View 3계층으로 흐른 뒤, View의 변경이 invalidateQueries로 React Query에 되돌아가 폴링·무효화로 갱신되는 데이터 흐름도"
          sx={{ display: 'block', minWidth: 600, width: '100%', height: 'auto', aspectRatio: '640 / 340' }}
        >
          <defs>
            <marker id="dash-arrow" viewBox="0 0 8 8" refX={7} refY={4} markerWidth={7} markerHeight={7} orient="auto-start-reverse">
              <path d="M0,0 L8,4 L0,8 z" fill={MUTED} />
            </marker>
          </defs>

          {/* 외부 소스 */}
          <g className="step" style={{ transitionDelay: '0ms' }}>
            <Node x={16} y={52} w={132} label="SERVER" sub="REST · SSE" />
            <Node x={16} y={196} w={132} label="BROWSER" sub="인증 · UI 상태" />
          </g>

          {/* 상태 계층 */}
          <g className="step" style={{ transitionDelay: '80ms' }}>
            <Node x={238} y={44} w={156} label="React Query" sub="queryKey · staleTime" />
            <Edge d="M 148 78 L 234 70" color={ACCENT} label="fetch · poll" lx={193} ly={60} />
          </g>
          <g className="step" style={{ transitionDelay: '160ms' }}>
            <Node x={238} y={196} w={156} label="Zustand store" sub="인증 / 레이아웃 / 알림" />
            <Edge d="M 148 222 L 234 222" label="set" lx={193} ly={214} />
          </g>

          {/* 3계층 */}
          <g className="step" style={{ transitionDelay: '240ms' }}>
            <Node x={478} y={24} w={146} label="Container" sub="데이터 연결" />
            <Edge d="M 394 66 L 474 50" label="useQuery" lx={432} ly={40} />
            <Edge d="M 394 206 L 474 62" label="store 구독" lx={426} ly={150} />
          </g>
          <g className="step" style={{ transitionDelay: '320ms' }}>
            <Node x={478} y={132} w={146} label="ViewModel (use-*)" sub="계산 · 이벤트" />
            <Edge d="M 551 76 L 551 128" />
          </g>
          <g className="step" style={{ transitionDelay: '400ms' }}>
            <Node x={478} y={240} w={146} label="View" sub="SVG 차트 · 테이블" />
            <Edge d="M 551 184 L 551 236" />
            <text x={628} y={216} textAnchor="end" fontFamily={FONT} fontSize={8.5} fill={MUTED}>
              useMemo · useCallback
            </text>
          </g>

          {/* 무효화 회귀 */}
          <g className="step" style={{ transitionDelay: '480ms' }}>
            <Edge
              d="M 478 266 L 452 266 L 452 314 L 316 314 L 316 100"
              color={ACCENT}
              dashed
              label="invalidateQueries · 폴링·무효화"
              lx={384}
              ly={307}
            />
          </g>
        </Box>
      </Box>
      <Box sx={{ mt: 1.5 }}>
        <FigCaption index={5}>
          3계층(Container→ViewModel→View)과 서버/전역 상태 이원화 데이터 흐름
        </FigCaption>
      </Box>
    </Box>
  );
}
