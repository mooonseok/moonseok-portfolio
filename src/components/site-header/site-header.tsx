'use client';

import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { SITE } from '@/data/site';
import { useMobileNav } from '@/components/site-header/use-mobile-nav';

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: readonly NavLink[] = [
  { label: 'Projects', href: '/#projects' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Contact', href: '/#contact' },
];

/**
 * 전 페이지 공통 sticky 헤더 (design-spec.md §3.1).
 * 데스크톱: 풀 네비 + 이력서. 모바일: 이력서·연락 2액션 고정 + 햄버거 Drawer.
 */
export function SiteHeader() {
  const { open, openNav, closeNav } = useMobileNav();

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
        bgcolor: 'background.default',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <Typography
            component={Link}
            href="/"
            sx={{
              fontWeight: 800,
              letterSpacing: '-0.02em',
              fontSize: '1.125rem',
              color: 'text.primary',
              mr: 'auto',
            }}
          >
            {SITE.name}
          </Typography>

          {/* 데스크톱 네비 */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            {NAV_LINKS.map((link) => (
              <Button
                key={link.href}
                component={Link}
                href={link.href}
                color="inherit"
                sx={{ color: 'text.secondary' }}
              >
                {link.label}
              </Button>
            ))}
            {SITE.resumeUrl && (
              <Button
                component="a"
                href={SITE.resumeUrl}
                variant="outlined"
                color="primary"
                sx={{ ml: 1 }}
              >
                이력서
              </Button>
            )}
          </Box>

          {/* 모바일: 2액션 고정 + 햄버거 */}
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <Button
              component="a"
              href={`mailto:${SITE.email}`}
              color="inherit"
              size="small"
              sx={{ color: 'text.secondary' }}
            >
              연락
            </Button>
            {SITE.resumeUrl && (
              <Button
                component="a"
                href={SITE.resumeUrl}
                variant="outlined"
                color="primary"
                size="small"
              >
                이력서
              </Button>
            )}
            <IconButton
              edge="end"
              aria-label="메뉴 열기"
              onClick={openNav}
              sx={{ color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={open}
        onClose={closeNav}
        slotProps={{ paper: { sx: { width: 260 } } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton aria-label="메뉴 닫기" onClick={closeNav}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {NAV_LINKS.map((link) => (
            <ListItemButton
              key={link.href}
              component={Link}
              href={link.href}
              onClick={closeNav}
            >
              {link.label}
            </ListItemButton>
          ))}
          <ListItemButton component="a" href={`mailto:${SITE.email}`}>
            연락
          </ListItemButton>
          {SITE.resumeUrl && (
            <ListItemButton component="a" href={SITE.resumeUrl}>
              이력서 다운로드
            </ListItemButton>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
}
