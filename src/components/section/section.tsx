import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import type { SxProps, Theme } from '@mui/material/styles';

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  /** 컨테이너 없이 풀블리드로 렌더(메트릭 밴드 등). */
  disableContainer?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | false;
  sx?: SxProps<Theme>;
}

/**
 * 섹션 수직 패딩을 sectionSpacing 토큰으로 통일(64px/120px). (design-spec.md §2.4)
 */
export function Section({
  id,
  children,
  disableContainer,
  maxWidth = 'lg',
  sx,
}: SectionProps) {
  return (
    <Box
      component="section"
      id={id}
      // sectionSpacing 토큰(xs:8 / md:15)과 동일. 서버 컴포넌트라 함수 sx 대신 리터럴 사용.
      sx={[{ py: { xs: 8, md: 15 } }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {disableContainer ? children : <Container maxWidth={maxWidth}>{children}</Container>}
    </Box>
  );
}
