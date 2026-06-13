import Box from '@mui/material/Box';
import type { ProjectSlug } from '@/data/types';
import { GestureDemoContainer } from '@/components/gesture-demo/gesture-demo-container';
import { CodeCompareTabs } from '@/components/code-compare/code-compare-tabs';
import { WatchdogStateDiagram } from '@/components/diagrams/watchdog-state-diagram';
import { SseSequenceDiagram } from '@/components/diagrams/sse-sequence-diagram';
import { RedisCompare } from '@/components/diagrams/redis-compare';
import { DashboardArchitectureDiagram } from '@/components/diagrams/dashboard-architecture-diagram';
import { FigCaption } from '@/components/fig-caption/fig-caption';

interface EvidenceBlockProps {
  slug: ProjectSlug;
}

/**
 * 페이지별 핵심 증거 블록 — 동일 템플릿 4연속의 스캔 피로 방지를 위해
 * 케이스마다 증거 형식을 다르게 (design-spec.md §3.3).
 */
export function EvidenceBlock({ slug }: EvidenceBlockProps) {
  switch (slug) {
    case 'diary-canvas':
      return (
        <Box>
          <GestureDemoContainer variant="full" />
          <Box sx={{ mt: 4 }}>
            <CodeCompareTabs />
          </Box>
        </Box>
      );
    case 'kiosk-ota':
      return <WatchdogStateDiagram />;
    case 'realtime-sse':
      return <SseSequenceDiagram />;
    case 'redis-ranking':
      return <RedisCompare />;
    case 'ops-dashboard':
      return <DashboardArchitectureDiagram />;
    default:
      return <FigCaption index={0}>도식 준비 중</FigCaption>;
  }
}
