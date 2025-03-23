import SuccessScreen from '@/components/QuestStatus/SuccessStatus';
import React, { Suspense } from 'react';

export default function SuccessStatusPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessScreen />
    </Suspense>
  );
}
