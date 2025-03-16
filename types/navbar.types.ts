export interface NavButtonProps {
  href: string;
  children: React.ReactNode;
}

export interface MobileNavButtonProps extends NavButtonProps {
  onClick: () => void;
}

export interface MobileMenuProps {
  onClose: () => void;
}
