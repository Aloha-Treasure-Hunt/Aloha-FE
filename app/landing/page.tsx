import { FC } from 'react'
import { RegistrationForm } from '@/components/landing/registration-form'
import { FAQ } from '@/components/landing/faq'

export const metadata = {
  title: 'City Treasure Hunt - Join the Adventure',
  description: 'Explore the city, solve clues, and win prizes in this exciting two-day treasure hunt adventure!',
}

const Page: FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4 py-12 space-y-16">
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-800">
            City Treasure Hunt
          </h1>
          <p className="text-xl text-amber-700 max-w-2xl mx-auto">
            Explore the city, solve clues, and win prizes in this exciting two-day adventure!
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-amber-800 mb-6 text-center">
              Join the Hunt
            </h2>
            <RegistrationForm />
          </section>

          <section className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg shadow-lg relative">
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg">
              <div className="text-gray-500 text-center">
                <svg 
                  className="w-16 h-16 mx-auto mb-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                <p>Video Preview</p>
              </div>
            </div>
            <iframe
              className="w-full h-full rounded-lg"
              src="YOUR_YOUTUBE_VIDEO_URL"
              title="Treasure Hunt Introduction"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </section>
        </div>

        <section className="max-w-4xl mx-auto">
          <FAQ />
        </section>
      </div>
    </main>
  )
}

export default Page 