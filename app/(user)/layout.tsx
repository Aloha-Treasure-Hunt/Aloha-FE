import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import type { Metadata } from 'next';
import '@/app/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'Aloha Treasure Hunt',
  description: 'Explore Danang through an exciting treasure hunt adventure',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <ToastContainer />
      <div className='flex justify-center flex-col'>{children}</div>
      <Footer />
    </>
  );
}
