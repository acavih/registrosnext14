import { getServerSession } from 'next-auth';
import { CollapseDesktop } from './AppShell';
import { authOptions } from '../api/auth/[...nextauth]/route';
import LoginButton from './LoginButton'

export default async function RootLayout({children, ...props}) {
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
