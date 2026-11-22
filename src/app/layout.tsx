import type { Metadata } from 'next';
import './globals.css';
import './trail.css';

export const metadata: Metadata = {
  title: 'DevPath | Meu sistema de estudos',
  description: 'Organize trilhas, estude com autonomia e acompanhe sua evolução.'
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
