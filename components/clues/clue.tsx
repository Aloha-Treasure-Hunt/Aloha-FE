import { Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ClueData {
  title: string
  description: string
  location?: string
}

export interface ClueProps {
  number: number
  isLocked: boolean
  data: ClueData
}

export function Clue({ number, isLocked, data }: ClueProps) {
  return (
    <div className={`p-4 rounded-lg border transition-colors ${
      isLocked ? 'bg-gray-100 border-gray-200' : 'bg-white border-amber-200'
    }`}>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex items-center md:w-1/4">
          <h3 className={`text-lg font-medium ${
            isLocked ? 'text-gray-400' : 'text-amber-800'
          }`}>
            {data.title} {isLocked && '🔒'}
          </h3>
        </div>
        
        <div className="md:w-3/4">
          {isLocked ? (
            <p className="text-gray-400">
              This clue is locked. Enter the verification code to unlock it.
            </p>
          ) : (
            <div className="space-y-2">
              <p className="text-gray-700">{data.description}</p>
              {data.location && (
                <p className="text-sm text-gray-500">Location: {data.location}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export type { ClueData } 