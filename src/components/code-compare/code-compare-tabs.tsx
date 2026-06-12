'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

const FLUTTER_SNIPPET = `// Flutter — GestureDetector + Matrix4
final center = box.localToGlobal(
  box.size.center(Offset.zero));      // 전역 좌표 변환
final v = pointer - center;           // 중심-제어점 벡터

rotation = baseRotation + (v.direction - baseAngle); // atan2
scale = (v.distance / baseDistance).clamp(0.4, 2.5); // 거리 비율`;

const WEB_SNIPPET = `// Web — Pointer Events + CSS transform
const r = el.getBoundingClientRect(); // 전역 좌표 변환
const dx = e.clientX - (r.left + r.width / 2);
const dy = e.clientY - (r.top + r.height / 2);

rotation = base + (Math.atan2(dy, dx) - baseAngle) * 180 / Math.PI;
scale = clamp(baseScale * Math.hypot(dx, dy) / baseDist);`;

const PANELS = [
  { label: 'Flutter', code: FLUTTER_SNIPPET },
  { label: 'Web (이 데모)', code: WEB_SNIPPET },
] as const;

/**
 * Flutter ↔ Web 코드 비교 탭 — 같은 수학을 두 플랫폼으로 (design-spec.md §4.1).
 * 크로스 플랫폼 사고의 증거 장치.
 */
export function CodeCompareTabs() {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Tabs
        value={tab}
        onChange={(_, value: number) => setTab(value)}
        sx={{ borderBottom: 1, borderColor: 'divider', minHeight: 40 }}
      >
        {PANELS.map((panel) => (
          <Tab key={panel.label} label={panel.label} sx={{ minHeight: 40 }} />
        ))}
      </Tabs>
      <Box
        component="pre"
        sx={{
          m: 0,
          p: 2,
          border: 1,
          borderTop: 0,
          borderColor: 'divider',
          bgcolor: 'background.paper',
          overflowX: 'auto',
          fontFamily: 'var(--font-mono), var(--font-pretendard), monospace',
          fontSize: '0.8rem',
          lineHeight: 1.7,
          color: 'text.primary',
        }}
      >
        {PANELS[tab].code}
      </Box>
      <Typography variant="figcaption" component="p" color="text.secondary" sx={{ mt: 1 }}>
        같은 수식, 다른 플랫폼 — GestureDetector ↔ Pointer Events
      </Typography>
    </Box>
  );
}
