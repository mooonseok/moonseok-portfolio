import Typography from '@mui/material/Typography';

interface FigCaptionProps {
  index: number;
  children: React.ReactNode;
}

/** 'FIG. n — 설명' 도판 캡션 (design-spec.md §10.3). 데모·도식 공용. */
export function FigCaption({ index, children }: FigCaptionProps) {
  return (
    <Typography
      variant="figcaption"
      component="figcaption"
      color="text.secondary"
    >
      FIG. {index} — {children}
    </Typography>
  );
}
