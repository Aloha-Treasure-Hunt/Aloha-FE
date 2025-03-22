import { Button } from '@/components/ui/button';
import { MobileNavButtonProps } from '@/types/navbar.types';
import Link from 'next/link';

export function MobileNavButton({
  href,
  children,
  className,
  onClick,
}: MobileNavButtonProps) {
  return (
    <Button
      variant='ghost'
      asChild
      className={`hover:bg-[#d3eafa] ${className ?? ''}`}
      onClick={onClick}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}
