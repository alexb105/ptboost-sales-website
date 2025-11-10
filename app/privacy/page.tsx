import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy | PTBoost",
  description: "Privacy policy and data protection information for PTBoost website services for UK personal trainers. Learn how we protect your data and handle personal information.",
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      {/* Header */}
      <div className="border-b border-accent/20 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Back to Home
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-zinc-900/50 border border-accent/20 rounded-2xl p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-accent via-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-400 mb-8">
            Last Updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>

          <div className="space-y-8 text-gray-300">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
              <p className="mb-4">
                PTBoost ("we," "us," or "our") is committed to protecting your privacy and personal data. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our website services at <span className="text-accent">ptboost.co.uk</span>.
              </p>
              <p className="mb-4">
                This policy complies with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018. By using our services, you consent to the collection and use of information in accordance with this policy.
              </p>
              <p className="text-sm text-gray-400">
                If you have any questions about this Privacy Policy, please contact us at <a href="mailto:ptboost.info@gmail.com" className="text-accent hover:underline">ptboost.info@gmail.com</a>.
              </p>
            </section>

            {/* Data Controller */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Data Controller</h2>
              <p className="mb-4">
                PTBoost is the data controller responsible for your personal data. Our contact details are:
              </p>
              <div className="bg-zinc-800/50 border border-accent/30 rounded-lg p-4">
                <p className="font-semibold text-white mb-2">PTBoost</p>
                <p className="text-gray-300">
                  📧 Email: <a href="mailto:ptboost.info@gmail.com" className="text-accent hover:underline">ptboost.info@gmail.com</a>
                </p>
                <p className="text-gray-300 mt-2">
                  🌐 Website: <a href="https://ptboost.co.uk" className="text-accent hover:underline">ptboost.co.uk</a>
                </p>
              </div>
            </section>

            {/* What Data We Collect */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. What Personal Data We Collect</h2>
              <p className="mb-4">
                When you use our services, we collect the following types of personal data:
              </p>
              
              <div className="bg-zinc-800/50 border border-accent/30 rounded-lg p-4 mb-4">
                <h3 className="font-bold text-white mb-3">3.1 Information You Provide to Us</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Personal Information:</strong> Full name, email address, phone number</li>
                  <li><strong>Business Information:</strong> Business name, location, specialization</li>
                  <li><strong>Website Preferences:</strong> Preferred colors, website goals, additional notes</li>
                  <li><strong>Images:</strong> Photos you upload for your website (if provided)</li>
                  <li><strong>Payment Information:</strong> Processed securely through our payment processor (we do not store card details)</li>
                </ul>
              </div>

              <div className="bg-zinc-800/50 border border-accent/30 rounded-lg p-4 mb-4">
                <h3 className="font-bold text-white mb-3">3.2 Information Collected Automatically</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Technical Data:</strong> IP address, browser type, device information, operating system</li>
                  <li><strong>Usage Data:</strong> Pages visited, time spent on pages, click patterns</li>
                  <li><strong>Cookies:</strong> We use essential cookies for website functionality (see Cookie Policy below)</li>
                </ul>
              </div>

              <div className="bg-zinc-800/50 border border-accent/30 rounded-lg p-4">
                <h3 className="font-bold text-white mb-3">3.3 Information from Third Parties</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Payment Processors:</strong> Payment transaction data, customer ID (for subscription management)</li>
                  <li><strong>Data Storage Services:</strong> Data stored securely in our database (hosted in EU/UK)</li>
                </ul>
              </div>
            </section>

            {/* How We Use Your Data */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. How We Use Your Personal Data</h2>
              <p className="mb-4">
                We use your personal data for the following purposes:
              </p>
              
              <div className="space-y-4">
                <div className="bg-zinc-800/50 border border-accent/30 rounded-lg p-4">
                  <h3 className="font-bold text-white mb-2">4.1 Service Delivery</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li>Process and fulfill your website order</li>
                    <li>Create and customize your website</li>
                    <li>Communicate with you about your order and website development</li>
                    <li>Send order confirmations and updates</li>
                    <li>Provide customer support</li>
                  </ul>
                </div>

                <div className="bg-zinc-800/50 border border-accent/30 rounded-lg p-4">
                  <h3 className="font-bold text-white mb-2">4.2 Payment Processing</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li>Process payments securely through our payment processor</li>
                    <li>Manage subscriptions and recurring payments</li>
                    <li>Handle refunds and cancellations</li>
                    <li>Maintain payment records for accounting purposes</li>
                  </ul>
                </div>

                <div className="bg-zinc-800/50 border border-accent/30 rounded-lg p-4">
                  <h3 className="font-bold text-white mb-2">4.3 Legal Basis for Processing</h3>
                  <p className="text-sm mb-2">We process your data based on:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li><strong>Contract:</strong> To fulfill our service agreement with you</li>
                    <li><strong>Legal Obligation:</strong> To comply with tax, accounting, and legal requirements</li>
                    <li><strong>Legitimate Interest:</strong> To improve our services and prevent fraud</li>
                    <li><strong>Consent:</strong> Where you have given explicit consent (e.g., marketing emails)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Third-Party Services */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Third-Party Services & Data Sharing</h2>
              <p className="mb-4">
                We use trusted third-party service providers to operate our business and deliver our services. These services may process your personal data:
              </p>
              
              <div className="space-y-4">
                <div className="bg-zinc-800/50 border border-accent/30 rounded-lg p-4">
                  <h3 className="font-bold text-white mb-2">5.1 Payment Processing</h3>
                  <p className="text-sm mb-2">
                    <strong>Purpose:</strong> Secure payment processing and subscription management
                  </p>
                  <p className="text-sm mb-2">
                    <strong>Data Shared:</strong> Name, email, payment information (card details are never stored by us)
                  </p>
                  <p className="text-sm">
                    <strong>Location:</strong> Data processed in UK/EU (GDPR compliant)
                  </p>
                </div>

                <div className="bg-zinc-800/50 border border-accent/30 rounded-lg p-4">
                  <h3 className="font-bold text-white mb-2">5.2 Data Storage</h3>
                  <p className="text-sm mb-2">
                    <strong>Purpose:</strong> Secure storage of your booking and customer data
                  </p>
                  <p className="text-sm mb-2">
                    <strong>Data Stored:</strong> All information you provide in the booking form
                  </p>
                  <p className="text-sm">
                    <strong>Location:</strong> Data stored in EU/UK (GDPR compliant)
                  </p>
                </div>

                <div className="bg-zinc-800/50 border border-accent/30 rounded-lg p-4">
                  <h3 className="font-bold text-white mb-2">5.3 Email Service</h3>
                  <p className="text-sm mb-2">
                    <strong>Purpose:</strong> Sending order confirmations, updates, and customer communications
                  </p>
                  <p className="text-sm mb-2">
                    <strong>Data Shared:</strong> Name, email address, order details
                  </p>
                  <p className="text-sm">
                    <strong>Location:</strong> Data processed in EU/UK (GDPR compliant)
                  </p>
                </div>

                <div className="bg-zinc-800/50 border border-accent/30 rounded-lg p-4">
                  <h3 className="font-bold text-white mb-2">5.4 Website Hosting</h3>
                  <p className="text-sm mb-2">
                    <strong>Purpose:</strong> Hosting your website and our main website
                  </p>
                  <p className="text-sm mb-2">
                    <strong>Data Shared:</strong> Website content, technical logs (IP addresses, access logs)
                  </p>
                  <p className="text-sm">
                    <strong>Location:</strong> Data processed in EU/UK (GDPR compliant)
                  </p>
                </div>
              </div>

              <div className="bg-blue-950/20 border border-blue-500/30 rounded-lg p-4 mt-4">
                <p className="font-bold text-blue-400 mb-2">Important:</p>
                <p className="text-sm text-gray-300">
                  We do NOT sell, rent, or trade your personal data to third parties for marketing purposes. We only share data with trusted service providers that are necessary to provide our services to you. All third-party services we use are GDPR-compliant and process data within the UK/EU where possible.
                </p>
              </div>
            </section>

            {/* Data Storage & Retention */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Data Storage & Retention</h2>
              <p className="mb-4">
                <strong>Where We Store Your Data:</strong> Your personal data is stored securely in databases located in the EU/UK, ensuring compliance with UK GDPR requirements.
              </p>
              
              <div className="bg-zinc-800/50 border border-accent/30 rounded-lg p-4 mb-4">
                <h3 className="font-bold text-white mb-3">6.1 How Long We Keep Your Data</h3>
                <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                  <li><strong>Active Customers:</strong> We retain your data for as long as you have an active subscription with us</li>
                  <li><strong>Completed Orders:</strong> We retain order data for 7 years after order completion (for tax and accounting purposes as required by UK law)</li>
                  <li><strong>Pending Orders:</strong> We retain incomplete booking data for 30 days, then automatically delete it</li>
                  <li><strong>Marketing Data:</strong> If you've consented to marketing, we retain your data until you withdraw consent or unsubscribe</li>
                </ul>
              </div>

              <div className="bg-zinc-800/50 border border-accent/30 rounded-lg p-4">
                <h3 className="font-bold text-white mb-3">6.2 Data Security</h3>
                <p className="text-sm mb-2">
                  We implement appropriate technical and organizational measures to protect your personal data:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                  <li>Encrypted data transmission (HTTPS/SSL)</li>
                  <li>Secure database storage with access controls</li>
                  <li>Regular security updates and monitoring</li>
                  <li>Limited access to personal data (only authorized personnel)</li>
                  <li>Secure payment processing (we never store card details)</li>
                </ul>
              </div>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Your Data Protection Rights (UK GDPR)</h2>
              <p className="mb-4">
                Under UK GDPR, you have the following rights regarding your personal data:
              </p>
              
              <div className="space-y-4">
                <div className="bg-green-950/20 border border-green-500/30 rounded-lg p-4">
                  <h3 className="font-bold text-green-400 mb-2">7.1 Right to Access</h3>
                  <p className="text-sm text-gray-300">
                    You have the right to request a copy of all personal data we hold about you. We will provide this within 30 days of your request.
                  </p>
                </div>

                <div className="bg-green-950/20 border border-green-500/30 rounded-lg p-4">
                  <h3 className="font-bold text-green-400 mb-2">7.2 Right to Rectification</h3>
                  <p className="text-sm text-gray-300">
                    You can request correction of any inaccurate or incomplete personal data we hold about you.
                  </p>
                </div>

                <div className="bg-green-950/20 border border-green-500/30 rounded-lg p-4">
                  <h3 className="font-bold text-green-400 mb-2">7.3 Right to Erasure ("Right to be Forgotten")</h3>
                  <p className="text-sm text-gray-300">
                    You can request deletion of your personal data, subject to legal obligations (e.g., we must retain payment records for 7 years for tax purposes).
                  </p>
                </div>

                <div className="bg-green-950/20 border border-green-500/30 rounded-lg p-4">
                  <h3 className="font-bold text-green-400 mb-2">7.4 Right to Restrict Processing</h3>
                  <p className="text-sm text-gray-300">
                    You can request that we limit how we use your personal data in certain circumstances.
                  </p>
                </div>

                <div className="bg-green-950/20 border border-green-500/30 rounded-lg p-4">
                  <h3 className="font-bold text-green-400 mb-2">7.5 Right to Data Portability</h3>
                  <p className="text-sm text-gray-300">
                    You can request a copy of your data in a structured, machine-readable format.
                  </p>
                </div>

                <div className="bg-green-950/20 border border-green-500/30 rounded-lg p-4">
                  <h3 className="font-bold text-green-400 mb-2">7.6 Right to Object</h3>
                  <p className="text-sm text-gray-300">
                    You can object to processing of your personal data for direct marketing purposes at any time.
                  </p>
                </div>

                <div className="bg-green-950/20 border border-green-500/30 rounded-lg p-4">
                  <h3 className="font-bold text-green-400 mb-2">7.7 Right to Withdraw Consent</h3>
                  <p className="text-sm text-gray-300">
                    Where processing is based on consent, you can withdraw consent at any time. This does not affect the lawfulness of processing before withdrawal.
                  </p>
                </div>
              </div>

              <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mt-4">
                <p className="font-bold text-accent mb-2">How to Exercise Your Rights</p>
                <p className="text-sm text-gray-300 mb-2">
                  To exercise any of these rights, please contact us at:
                </p>
                <p className="text-sm">
                  📧 Email: <a href="mailto:ptboost.info@gmail.com" className="text-accent hover:underline font-semibold">ptboost.info@gmail.com</a>
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  We will respond to your request within 30 days. If you're not satisfied with our response, you can contact the UK Information Commissioner's Office (ICO) at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">ico.org.uk</a>.
                </p>
              </div>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Cookies & Tracking Technologies</h2>
              <p className="mb-4">
                We use essential cookies to provide basic website functionality. We do NOT use tracking cookies, advertising cookies, or analytics cookies that collect personal data without your consent.
              </p>
              
              <div className="bg-zinc-800/50 border border-accent/30 rounded-lg p-4">
                <h3 className="font-bold text-white mb-3">8.1 Types of Cookies We Use</h3>
                <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                  <li><strong>Essential Cookies:</strong> Required for the website to function (e.g., session management, form submissions). These cannot be disabled.</li>
                  <li><strong>Local Storage:</strong> We use browser localStorage to temporarily store your booking ID during the payment process. This is automatically cleared after payment completion.</li>
                </ul>
              </div>

              <div className="bg-zinc-800/50 border border-accent/30 rounded-lg p-4 mt-4">
                <h3 className="font-bold text-white mb-3">8.2 Managing Cookies</h3>
                <p className="text-sm text-gray-300">
                  You can control cookies through your browser settings. However, disabling essential cookies may affect website functionality. Most browsers allow you to:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm mt-2">
                  <li>See what cookies are stored and delete them individually</li>
                  <li>Block third-party cookies</li>
                  <li>Block all cookies from specific sites</li>
                  <li>Block all cookies</li>
                  <li>Delete all cookies when you close your browser</li>
                </ul>
              </div>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Children's Privacy</h2>
              <p className="mb-4">
                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal data from children. If you believe we have collected data from a child, please contact us immediately and we will delete such information.
              </p>
            </section>

            {/* International Transfers */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. International Data Transfers</h2>
              <p className="mb-4">
                Your personal data is primarily stored and processed within the UK and EU. Our third-party service providers are GDPR-compliant and process data within the UK/EU where possible.
              </p>
              <p className="mb-4">
                If any data is transferred outside the UK/EU, we ensure appropriate safeguards are in place (e.g., Standard Contractual Clauses approved by the UK/EU) to protect your data in accordance with UK GDPR requirements.
              </p>
            </section>

            {/* Data Breaches */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Data Breaches</h2>
              <p className="mb-4">
                In the unlikely event of a data breach that poses a risk to your rights and freedoms, we will:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Notify the UK Information Commissioner's Office (ICO) within 72 hours</li>
                <li>Notify affected individuals without undue delay if the breach poses a high risk</li>
                <li>Take immediate steps to contain and remediate the breach</li>
                <li>Document the breach and our response</li>
              </ul>
            </section>

            {/* Changes to Policy */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">12. Changes to This Privacy Policy</h2>
              <p className="mb-4">
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Posting the updated policy on this page with a new "Last Updated" date</li>
                <li>Sending an email notification to active customers (if changes are significant)</li>
              </ul>
              <p className="mt-4 text-sm text-gray-400">
                Your continued use of our services after changes constitutes acceptance of the updated Privacy Policy.
              </p>
            </section>

            {/* Contact Information */}
            <section className="border-t border-accent/20 pt-8 mt-8">
              <h2 className="text-2xl font-bold text-white mb-4">13. Contact Us</h2>
              <p className="mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:
              </p>
              <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
                <p className="font-semibold text-white mb-2">PTBoost</p>
                <p className="text-gray-300">
                  📧 Email: <a href="mailto:ptboost.info@gmail.com" className="text-accent hover:underline">ptboost.info@gmail.com</a>
                </p>
                <p className="text-gray-300 mt-2">
                  🌐 Website: <a href="https://ptboost.co.uk" className="text-accent hover:underline">ptboost.co.uk</a>
                </p>
                <p className="text-sm text-gray-400 mt-4">
                  We aim to respond to all privacy-related inquiries within 30 days.
                </p>
              </div>
            </section>

            {/* Acknowledgment */}
            <section className="bg-zinc-800/50 border border-accent/30 rounded-lg p-6 mt-8">
              <p className="font-bold text-white mb-3">
                ✓ By using our services, you acknowledge that:
              </p>
              <ul className="space-y-2 text-sm">
                <li>• You have read and understood this Privacy Policy</li>
                <li>• You consent to the collection and use of your personal data as described</li>
                <li>• You understand your rights under UK GDPR and how to exercise them</li>
                <li>• You understand that we may share your data with third-party service providers necessary to deliver our services</li>
                <li>• You understand that payment records must be retained for 7 years for legal/accounting purposes</li>
              </ul>
            </section>
          </div>

          {/* Back Button */}
          <div className="mt-12 text-center">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-orange-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-accent/50 transition-all duration-300"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

