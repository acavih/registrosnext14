import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ColorSchemeScript, Container, MantineProvider } from '@mantine/core';
import { getServerSession } from 'next-auth';
import SessionProvider from './SessionProvider';
import { theme } from './theme';
import TRPCProvider from './_trpc/TRPCProvider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession()
  return (
    <html lang="es">
      <head>
        <ColorSchemeScript />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body className={inter.className}>
        <MantineProvider theme={theme}>
          <Container fluid>
            <SessionProvider session={session}>
              <TRPCProvider>
                {children}
              </TRPCProvider>
            </SessionProvider>
          </Container>
        </MantineProvider>
      </body>
    </html>
  );
}
