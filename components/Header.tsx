import Link from 'next/link'
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-amber-100 py-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-amber-800">Danang Treasure Hunt</Link>
        <div className="space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/clues">Clues</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/challenges">Challenges</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/mini-tasks">Mini-Tasks</Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}

