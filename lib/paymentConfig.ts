import { Map, ArrowLeftCircle } from 'lucide-react';

export const getStatusConfig = (status: 'success' | 'failed', router: any) =>
  ({
    success: {
      title: 'Payment Success!',
      message: 'Your adventure awaits!',
      bgColor: 'bg-gradient-to-b from-teal-600 to-teal-700',
      textColor: 'text-teal-600',
      iconColor: 'border-teal-500 text-teal-500',
      btnClass: 'btn-teal',
      btnText: 'My Clues',
      btnIcon: <Map size={18} />,
      onClick: () => router.push('/clues'),
    },
    failed: {
      title: 'Payment Failed!',
      message: "We couldn't process your payment",
      bgColor: 'bg-gradient-to-b from-red-100 to-red-200',
      textColor: 'text-red-600',
      iconColor: 'border-red-500 text-red-500',
      btnClass: 'btn-red',
      btnText: 'Try Again',
      btnIcon: <ArrowLeftCircle size={18} />,
      onClick: () => router.back(),
    },
  }[status]);
