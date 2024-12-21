import { CluesList } from '@/components/clues/clues-list'
import { VerificationForm } from '@/components/clues/verification-form'

export default function CluesPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-amber-800">Treasure Hunt Clues</h1>
      <div className="space-y-8">
        <CluesList />
        <VerificationForm />
      </div>
    </div>
  )
} 