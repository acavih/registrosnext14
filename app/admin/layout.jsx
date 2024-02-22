import { getServerSession } from 'next-auth';
import { CollapseDesktop } from './AppShell';
import { authOptions } from '@/utils/authOptions';
import { LoginForm } from '@/components/LoginForm';

export default async function RootLayout({children}) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return (
      <LoginForm />
    )
  }
  return (
    <CollapseDesktop>
        {children}
    </CollapseDesktop>
  );
}
