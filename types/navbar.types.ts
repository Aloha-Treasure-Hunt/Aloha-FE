export interface NavButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export interface MobileNavButtonProps extends NavButtonProps {
  onClick: () => void;
}

export interface MobileMenuProps {
  onClose: () => void;
}
