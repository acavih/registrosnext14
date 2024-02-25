"use client"
import { ActionIcon, Anchor, AppShell, Burger, Button, Flex, Group, NavLink, Skeleton, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link'
import LogoutButton from './LogoutButton'
import { CiMenuBurger } from "react-icons/ci";
import { usePathname } from 'next/navigation';

export function CollapseDesktop({children}) {
  const pathName = usePathname()
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
          <Flex justify={'space-between'} style={{width: '100%'}}>
            <Group style={{flexGrow: 1}}>
              <ActionIcon variant='transparent' onClick={toggleMobile} color='black' hiddenFrom="sm" size="sm" ><CiMenuBurger /></ActionIcon>
              <ActionIcon variant='transparent' onClick={toggleDesktop} color='black' visibleFrom="sm" size="sm" ><CiMenuBurger /></ActionIcon>
              <Text>Registros</Text>
            </Group>
            <Group>
              <LogoutButton />
            </Group>
          </Flex>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Title order={2}>Menú</Title>
        <Flex justify={'space-between'} direction={'column'} style={{height: '100%'}}>
          <div style={{flexGrow: 1}}>
            <NavLink active={pathName.includes('partners')} variant={pathName === '/admin/partners' ? 'filled' : 'light'} component={Link} href="/admin/partners" label="Socios" />
            <NavLink active={pathName.includes('resources')} variant={'light'} component={Link} href="/admin/resources/nacionalidads" label="Recursos" />
            <NavLink active={pathName.includes('stats')} variant={'filled'} component={Link} href="/admin/stats" label="Estadísticas" />
          </div>
        </Flex>
      </AppShell.Navbar>
      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}