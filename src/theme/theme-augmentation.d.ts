import type { CSSProperties } from 'react';

/**
 * MUI 테마 모듈 증강 (design-spec.md §2).
 * 커스텀 Typography variant·모션 토큰·섹션 간격 토큰을 타입 안전하게 노출한다. (any 금지 컨벤션)
 */
declare module '@mui/material/styles' {
  interface TypographyVariants {
    metric: CSSProperties;
    figcaption: CSSProperties;
    footnote: CSSProperties;
    footnoteRef: CSSProperties;
  }
  interface TypographyVariantsOptions {
    metric?: CSSProperties;
    figcaption?: CSSProperties;
    footnote?: CSSProperties;
    footnoteRef?: CSSProperties;
  }

  /** 시그니처/보조 모션 duration 토큰 (ms). MUI 기본 키에 더한다. */
  interface Duration {
    hover: number;
    press: number;
    reveal: number;
    shared: number;
    bar: number;
    diagramNode: number;
  }

  /** 등장·수축용 커스텀 easing. */
  interface Easing {
    standard: string;
  }

  /** 섹션 수직 패딩 2단계 토큰(spacing 단위). */
  interface Theme {
    sectionSpacing: { xs: number; md: number };
  }
  interface ThemeOptions {
    sectionSpacing?: { xs: number; md: number };
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    metric: true;
    figcaption: true;
    footnote: true;
    footnoteRef: true;
  }
}
