import FailScreen from '@/components/QuestStatus/FailStatus';
import React, { Suspense } from 'react';

export default function FailStatusPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FailScreen />
    </Suspense>
  );
}
