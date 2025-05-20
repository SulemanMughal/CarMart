import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <section className="py-12 bg-gray-50">
        <div className="container max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

          <div className="bg-white p-8 rounded-lg shadow-sm space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                At AutoDecar, we respect your privacy and are committed to protecting your personal data. This Privacy
                Policy explains how we collect, use, disclose, and safeguard your information when you visit our website
                or use our services.
              </p>
              <p className="text-gray-700 mb-4">
                Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy,
                please do not access the site.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                We collect several types of information from and about users of our website, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>Personal Data:</strong> Name, email address, telephone number, address, and other identifiers
                  by which you may be contacted online or offline.
                </li>
                <li>
                  <strong>Account Information:</strong> Username, password, account preferences, and profile
                  information.
                </li>
                <li>
                  <strong>Transaction Data:</strong> Details about payments to and from you, and other details of
                  products and services you have purchased or listed.
                </li>
                <li>
                  <strong>Technical Data:</strong> Internet protocol (IP) address, browser type and version, time zone
                  setting, browser plug-in types and versions, operating system and platform, and other technology on
                  the devices you use to access this website.
                </li>
                <li>
                  <strong>Usage Data:</strong> Information about how you use our website, products, and services.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">3. How We Collect Your Data</h2>
              <p className="text-gray-700 mb-4">
                We use different methods to collect data from and about you including through:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>Direct Interactions:</strong> You may provide us with your Personal Data by filling in forms,
                  creating an account, listing a vehicle, or corresponding with us.
                </li>
                <li>
                  <strong>Automated Technologies:</strong> As you interact with our website, we may automatically
                  collect Technical Data about your equipment, browsing actions, and patterns.
                </li>
                <li>
                  <strong>Third Parties:</strong> We may receive Personal Data about you from various third parties such
                  as analytics providers, advertising networks, and search information providers.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">4. How We Use Your Data</h2>
              <p className="text-gray-700 mb-4">
                We will only use your Personal Data when the law allows us to. Most commonly, we will use your Personal
                Data in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>To register you as a new customer</li>
                <li>To process and deliver your orders</li>
                <li>To manage our relationship with you</li>
                <li>To improve our website, products/services, marketing, and customer relationships</li>
                <li>To recommend products or services that may interest you</li>
                <li>To comply with legal obligations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">5. Disclosure of Your Data</h2>
              <p className="text-gray-700 mb-4">We may share your Personal Data with the following parties:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>Service Providers:</strong> Who provide IT, system administration, and other services.
                </li>
                <li>
                  <strong>Professional Advisers:</strong> Including lawyers, bankers, auditors, and insurers.
                </li>
                <li>
                  <strong>Regulatory Authorities:</strong> Government bodies that require reporting of processing
                  activities in certain circumstances.
                </li>
                <li>
                  <strong>Third Parties:</strong> To whom we may choose to sell, transfer, or merge parts of our
                  business or our assets.
                </li>
              </ul>
              <p className="text-gray-700 mt-4">
                We require all third parties to respect the security of your Personal Data and to treat it in accordance
                with the law.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">6. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We have implemented appropriate security measures to prevent your Personal Data from being accidentally
                lost, used, or accessed in an unauthorized way, altered, or disclosed. We limit access to your Personal
                Data to employees, agents, contractors, and other third parties who have a business need to know.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">7. Data Retention</h2>
              <p className="text-gray-700 mb-4">
                We will only retain your Personal Data for as long as necessary to fulfill the purposes we collected it
                for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">8. Your Legal Rights</h2>
              <p className="text-gray-700 mb-4">
                Under certain circumstances, you have rights under data protection laws in relation to your Personal
                Data, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>The right to request access to your Personal Data</li>
                <li>The right to request correction of your Personal Data</li>
                <li>The right to request erasure of your Personal Data</li>
                <li>The right to object to processing of your Personal Data</li>
                <li>The right to request restriction of processing your Personal Data</li>
                <li>The right to request transfer of your Personal Data</li>
                <li>The right to withdraw consent</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">9. Cookies</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar tracking technologies to track activity on our website and hold certain
                information. Cookies are files with small amounts of data which may include an anonymous unique
                identifier.
              </p>
              <p className="text-gray-700 mb-4">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However,
                if you do not accept cookies, you may not be able to use some portions of our Service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">10. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "Last updated" date.
              </p>
              <p className="text-gray-700 mb-4">
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy
                Policy are effective when they are posted on this page.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">11. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy, please contact us at privacy@autodecar.com.
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
