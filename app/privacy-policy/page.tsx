export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <p>We collect the following types of information:</p>
          <ul className="list-disc ml-6 mb-4">
            <li>Account information (name, email, profile picture)</li>
            <li>Location data during treasure hunts (with your permission)</li>
            <li>Game progress and achievement data</li>
            <li>Photos and content you share during hunts</li>
            <li>Instagram content when using hashtags related to our hunts</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc ml-6 mb-4">
            <li>Operate and improve the treasure hunt experience</li>
            <li>Track game progress and maintain leaderboards</li>
            <li>Display user-generated content in our Instagram feed</li>
            <li>Ensure fair play and prevent cheating</li>
            <li>Send important updates about hunts and your participation</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information, including:</p>
          <ul className="list-disc ml-6 mb-4">
            <li>Encryption of sensitive data</li>
            <li>Regular security assessments</li>
            <li>Secure access controls</li>
            <li>Regular backups</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc ml-6 mb-4">
            <li>Access your personal data</li>
            <li>Request data correction or deletion</li>
            <li>Opt-out of marketing communications</li>
            <li>Request your data in a portable format</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p className="mt-2">Email: privacy@treasurehunt.com</p>
        </section>
      </div>
    </div>
  )
} 