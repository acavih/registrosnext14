import { CollapseDesktop } from './AppShell';

export default function RootLayout({children}) {
  return (
    <CollapseDesktop>
        {children}
    </CollapseDesktop>
  );
}
