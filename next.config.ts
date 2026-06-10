import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // MUI 배럴 임포트 정리로 번들·하이드레이션 비용 절감 (design-spec.md §8)
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  },
};

export default nextConfig;
