import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-amber-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-6">
          <Link 
            href="/privacy-policy"
            className="text-amber-800 hover:text-amber-600"
          >
            Privacy Policy
          </Link>
          <Link 
            href="/terms"
            className="text-amber-800 hover:text-amber-600"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  )
} 