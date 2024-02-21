"use client"
import { Anchor, AppShell, Burger, Button, Group, NavLink, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link'
import LogoutButton from './LogoutButton'

export function CollapseDesktop({children}) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
          <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
          Registros
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavLink variant='filled' component={Link} href="/admin/partners" label="Socios" />
        <NavLink variant='filled' component={Link} href="/admin/resources/nacionalidads" label="Recursos" />
        <LogoutButton />
      </AppShell.Navbar>
      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}