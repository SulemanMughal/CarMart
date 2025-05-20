import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <section className="py-12 bg-gray-50">
        <div className="container max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>

          <div className="bg-white p-8 rounded-lg shadow-sm space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Welcome to AutoDecar. These Terms and Conditions govern your use of our website and services. By
                accessing or using AutoDecar, you agree to be bound by these Terms. If you disagree with any part of the
                terms, you may not access the service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">2. Definitions</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>"Service"</strong> refers to the AutoDecar website operated by AutoDecar Inc.
                </li>
                <li>
                  <strong>"User"</strong> refers to individuals who access or use the Service, including buyers,
                  sellers, and browsers.
                </li>
                <li>
                  <strong>"Listing"</strong> refers to any vehicle advertisement posted on the Service.
                </li>
                <li>
                  <strong>"Content"</strong> refers to text, images, videos, and other materials that appear on the
                  Service.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">3. Account Registration</h2>
              <p className="text-gray-700 mb-4">
                To use certain features of the Service, you must register for an account. You agree to provide accurate,
                current, and complete information during the registration process and to update such information to keep
                it accurate, current, and complete.
              </p>
              <p className="text-gray-700 mb-4">
                You are responsible for safeguarding the password that you use to access the Service and for any
                activities or actions under your password. You agree not to disclose your password to any third party.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">4. Listings and Transactions</h2>
              <p className="text-gray-700 mb-4">
                Users who post Listings represent and warrant that they have the right to sell the vehicles listed and
                that all information provided is accurate and complete.
              </p>
              <p className="text-gray-700 mb-4">
                AutoDecar is not a party to any transaction between Users and does not transfer legal ownership of
                vehicles. AutoDecar provides a platform for Users to connect and negotiate transactions.
              </p>
              <p className="text-gray-700 mb-4">
                Users are solely responsible for all taxes, fees, and legal compliance related to their transactions.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">5. Prohibited Activities</h2>
              <p className="text-gray-700 mb-4">You may not engage in any of the following prohibited activities:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Violating any laws or regulations</li>
                <li>Posting false, inaccurate, or misleading content</li>
                <li>Impersonating another person or entity</li>
                <li>Interfering with or disrupting the Service</li>
                <li>Attempting to gain unauthorized access to the Service</li>
                <li>Harassing, threatening, or intimidating other Users</li>
                <li>Using the Service for any illegal purpose</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">6. Content Ownership</h2>
              <p className="text-gray-700 mb-4">
                Users retain ownership of the Content they post on the Service. By posting Content, you grant AutoDecar
                a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate,
                and distribute such Content for the purpose of providing and promoting the Service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">7. Termination</h2>
              <p className="text-gray-700 mb-4">
                We may terminate or suspend your account and bar access to the Service immediately, without prior notice
                or liability, under our sole discretion, for any reason whatsoever, including without limitation if you
                breach the Terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                In no event shall AutoDecar, nor its directors, employees, partners, agents, suppliers, or affiliates,
                be liable for any indirect, incidental, special, consequential or punitive damages, including without
                limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access
                to or use of or inability to access or use the Service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">9. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a
                revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
                What constitutes a material change will be determined at our sole discretion.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms, please contact us at legal@autodecar.com.
              </p>
            </div>

            <div className="pt-4 border-t">
              <p className="text-gray-500 text-sm">Last updated: May 20, 2024</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
