import AppLayout from '@/components/layouts/AppLayout';
import { Toaster } from '@/components/ui/Sonner';
import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 100,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <div className={`${geistMono.variable} ${geistSans.variable}`}>
      <QueryClientProvider client={queryClient}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
        <Toaster position="top-center" />
      </QueryClientProvider>
    </div>
  );
}
