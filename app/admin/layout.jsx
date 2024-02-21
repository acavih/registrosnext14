import { getServerSession } from 'next-auth';
import { CollapseDesktop } from './AppShell';
import LoginButton from './LoginButton'
import { authOptions } from '@/utils/authOptions';

export default async function RootLayout({children}) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return (
      <LoginButton />
    )
  }
  return (
    <CollapseDesktop>
        {children}
    </CollapseDesktop>
  );
}
