import { Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ClueProps {
  title: string
  content: string
  isLocked: boolean
}

export function Clue({ title, content, isLocked }: ClueProps) {
  return (
    <div className={cn(
      "p-6 rounded-lg border",
      isLocked 
        ? "bg-gray-50 border-gray-200" 
        : "bg-amber-50 border-amber-200"
    )}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-amber-800">{title}</h3>
        {isLocked && (
          <Lock className="text-gray-400" size={20} />
        )}
      </div>
      {isLocked ? (
        <p className="text-gray-500">This clue is locked. Complete the previous challenges to unlock.</p>
      ) : (
        <p className="text-amber-900">{content}</p>
      )}
    </div>
  )
} 