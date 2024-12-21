import { CluesList } from '@/components/clues/clues-list'
import { VerificationForm } from '@/components/clues/verification-form'
import { cluesData } from '@/lib/clues-data'

export default function CluesPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-amber-800 mb-8">
        Treasure Hunt Clues
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <VerificationForm />
        </div>
        
        <div className="lg:col-span-2">
          <CluesList clues={cluesData} />
        </div>
      </div>
    </main>
  )
} 