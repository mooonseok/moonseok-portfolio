'use client';

import { useCallback, useState } from 'react';

/** 모바일 네비 Drawer 개폐 상태 (MVVM — site-header-view의 ViewModel). */
export function useMobileNav() {
  const [open, setOpen] = useState(false);
  const openNav = useCallback(() => setOpen(true), []);
  const closeNav = useCallback(() => setOpen(false), []);
  return { open, openNav, closeNav };
}
