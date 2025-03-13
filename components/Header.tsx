import Link from 'next/link'
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-white/70 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center py-4">
        <Link href="/homepage" className="text-2xl font-semibold gradient-text">
          Danang Treasure Hunt
        </Link>
        <div className="space-x-2">
          <Button variant="ghost" asChild className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button variant="ghost" asChild className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50">
            <Link href="/clues">Clues</Link>
          </Button>
          <Button variant="ghost" asChild className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50">
            <Link href="/challenges">Side Quests</Link>
          </Button>
          <Button variant="ghost" asChild className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50">
            <Link href="/landing">Q&A</Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}

