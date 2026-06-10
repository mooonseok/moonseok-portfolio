import { createTheme, type Theme } from '@mui/material/styles';

/**
 * 「만지는 설계도」 디자인 토큰 (design-spec.md §2).
 * 색·타이포·간격·모션·서피스 규칙의 단일 소스. 컴포넌트는 sx에서 이 토큰만 참조한다.
 */

const FONT_SANS =
  'var(--font-pretendard), "Apple SD Gothic Neo", "Malgun Gothic", sans-serif';
// 모노 영역에 한글 유입 시 Pretendard로 폴백 (design-spec.md §2.3 모노 콘텐츠 규칙)
const FONT_MONO = `var(--font-mono), ${FONT_SANS}`;

// elevation 그림자 전면 무효화 — '도면' 언어, 카드는 1px 보더로 (design-spec.md §2.2)
const NO_SHADOWS = Array(25).fill('none') as unknown as Theme['shadows'];

/** 모눈 도트 모티프 — 도면형 카드·데모 스테이지 배경 한정 (design-spec.md §2.6). */
export const DOT_GRID = {
  backgroundImage:
    'radial-gradient(var(--mui-palette-divider) 1px, transparent 1px)',
  backgroundSize: '16px 16px',
} as const;

export const theme = createTheme({
  cssVariables: true, // 사전 렌더 SVG·커스텀 도식이 var(--mui-palette-*) 직접 참조
  sectionSpacing: { xs: 8, md: 15 }, // 64px / 120px

  palette: {
    mode: 'light',
    background: { default: '#FAFAF8', paper: '#FFFFFF' }, // 종이 질감 오프화이트
    text: { primary: '#1B2A44', secondary: '#51607A' }, // 순흑 대신 잉크 네이비
    primary: { main: '#13294B', contrastText: '#FAFAF8' }, // MUI 기본 블루와 확실히 구분
    secondary: { main: '#2563EB' }, // 포인트 블루 — CTA·링크·데이터 강조 전용
    success: { main: '#16A34A' }, // SSE 연결 상태 점 전용
    divider: '#E3E1D8', // 종이 톤 보더
  },

  shape: { borderRadius: 0 }, // 직각 — '도면' 언어
  shadows: NO_SHADOWS,

  transitions: {
    duration: {
      hover: 150,
      press: 180,
      reveal: 240,
      shared: 250,
      bar: 700,
      diagramNode: 80,
    },
    easing: {
      standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    },
  },

  typography: {
    fontFamily: FONT_SANS,
    h1: {
      fontWeight: 800,
      fontSize: 'clamp(2.25rem, 6vw, 4.25rem)',
      letterSpacing: '-0.02em',
      lineHeight: 1.12,
      wordBreak: 'keep-all',
    },
    h2: {
      fontWeight: 700,
      fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
      wordBreak: 'keep-all',
    },
    h3: {
      fontWeight: 700,
      fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
      letterSpacing: '-0.01em',
      lineHeight: 1.3,
      wordBreak: 'keep-all',
    },
    body1: { fontSize: '1.0625rem', lineHeight: 1.7 }, // 17px
    body2: { fontSize: '0.875rem', lineHeight: 1.6 },
    button: { textTransform: 'none', fontWeight: 600 },
    overline: {
      fontFamily: FONT_MONO,
      fontWeight: 500,
      fontSize: '0.75rem',
      letterSpacing: '0.08em',
      lineHeight: 1.5,
      textTransform: 'none',
    },
    // ── 커스텀 variant ──
    metric: {
      fontFamily: FONT_MONO,
      fontWeight: 700,
      fontSize: 'clamp(2.5rem, 7vw, 5rem)',
      lineHeight: 1,
      fontVariantNumeric: 'tabular-nums',
    },
    figcaption: {
      fontFamily: FONT_MONO,
      fontWeight: 400,
      fontSize: '0.75rem',
      letterSpacing: '0.02em',
    },
    footnote: {
      fontFamily: FONT_MONO,
      fontWeight: 400,
      fontSize: '0.8rem',
      lineHeight: 1.5,
    },
    footnoteRef: {
      fontFamily: FONT_MONO,
      fontWeight: 500,
      fontSize: '0.65em',
      verticalAlign: 'super',
    },
  },

  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          metric: 'p',
          figcaption: 'figcaption',
          footnote: 'p',
          footnoteRef: 'sup',
        },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: { root: { backgroundImage: 'none' } },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: ({ theme }) => ({
          border: `1px solid ${theme.palette.divider}`,
          backgroundImage: 'none',
        }),
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { borderRadius: 0 } },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 0,
          border: `1px solid ${theme.palette.divider}`,
        }),
      },
    },
  },
});
