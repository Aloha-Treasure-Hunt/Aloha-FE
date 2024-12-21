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

        <section className="aspect-w-16 aspect-h-9 max-w-3xl mx-auto">
          <iframe
            className="w-full h-full rounded-lg shadow-lg"
            src="YOUR_YOUTUBE_VIDEO_URL"
            title="Treasure Hunt Introduction"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </section>

        <section className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-amber-800 mb-6 text-center">
            Join the Hunt
          </h2>
          <RegistrationForm />
        </section>

        <section className="max-w-4xl mx-auto">
          <FAQ />
        </section>
      </div>
    </main>
  )
}

export default Page 