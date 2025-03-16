import { Button } from '@/components/ui/button';
import { NavButtonProps } from '@/types/navbar.types';
import Link from 'next/link';

export default function NavButton({ href, children }: NavButtonProps) {
  return (
    <Button
      variant='ghost'
      asChild
      className='text-slate-700 hover:text-teal-600 hover:bg-amber-50/80 font-medium transition-colors duration-200 rounded-lg'
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}
