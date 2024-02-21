"use client"
import { ActionIcon, Anchor, AppShell, Burger, Button, Flex, Group, NavLink, Skeleton, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link'
import LogoutButton from './LogoutButton'
import { IconMenu2 } from "@tabler/icons-react";

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
          <Flex justify={'space-between'} style={{width: '100%'}}>
            <Group style={{flexGrow: 1}}>
              <ActionIcon variant='transparent' onClick={toggleMobile} color='black' hiddenFrom="sm" size="sm" ><IconMenu2 /></ActionIcon>
              <ActionIcon variant='transparent' onClick={toggleDesktop} color='black' visibleFrom="sm" size="sm" ><IconMenu2 /></ActionIcon>
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
            <NavLink variant='filled' component={Link} href="/admin/partners" label="Socios" />
            <NavLink variant='filled' component={Link} href="/admin/resources/nacionalidads" label="Recursos" />
          </div>
        </Flex>
      </AppShell.Navbar>
      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}