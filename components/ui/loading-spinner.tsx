interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

export function LoadingSpinner({ size = 'medium' }: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-6 w-6',
    large: 'h-8 w-8',
  };
  return (
    <div className='flex items-center justify-center'>
      <div
        className={`animate-spin rounded-full border-b-2 border-amber-800 ${sizeClasses[size]}`}
      />
      <span className='sr-only'>Loading...</span>
    </div>
  );
}
