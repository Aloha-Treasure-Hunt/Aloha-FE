export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <p>We collect minimal information to provide our treasure hunt services:</p>
          <ul className="list-disc ml-6 mb-4">
            <li>Temporary location data during active treasure hunts (with your permission)</li>
            <li>Basic game progress for active hunts</li>
          </ul>
          <p>All hunt data is temporary and is not stored after the hunt ends.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p>We use this temporary information only to:</p>
          <ul className="list-disc ml-6 mb-4">
            <li>Operate the current treasure hunt experience</li>
            <li>Verify hunt completion</li>
            <li>Ensure fair play during active hunts</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Data Retention</h2>
          <p>We do not store any personal information. All hunt-related data is temporary and is automatically deleted when your hunt ends.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p className="mt-2">Email: alohavietnamretreat@gmail.com</p>
        </section>
      </div>
    </div>
  )
} 