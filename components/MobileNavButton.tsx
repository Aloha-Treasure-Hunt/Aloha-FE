import { Button } from '@/components/ui/button';
import { MobileNavButtonProps } from '@/types/navbar.types';
import Link from 'next/link';

export function MobileNavButton({
  href,
  children,
  onClick,
}: MobileNavButtonProps) {
  return (
    <Button
      variant='ghost'
      asChild
      className='text-slate-700 w-full text-left justify-start hover:text-teal-600 hover:bg-amber-50/80 py-3'
      onClick={onClick}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}
