import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms & Conditions | PTBoost",
  description: "Terms and conditions for PTBoost website services for UK personal trainers. Read our service terms, 7-day guarantee policy, and cancellation terms.",
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsPage() {
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
            Terms & Conditions
          </h1>
          <p className="text-gray-400 mb-8">
            Last Updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>

          <div className="space-y-8 text-gray-300">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
              <p className="mb-4">
                By purchasing or using any services from PTBoost ("we," "us," or "our"), you ("Client," "you," or "your") agree to be bound by these Terms and Conditions. If you do not agree to these terms, do not purchase or use our services.
              </p>
              <p className="text-sm text-gray-400">
                These terms constitute a legally binding agreement between you and PTBoost.
              </p>
            </section>

            {/* Service Description */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Service Description</h2>
              <p className="mb-4">
                PTBoost provides professional website design and development services specifically for UK personal trainers. Our service includes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>A professionally designed, psychology-driven website template customized for your personal training business</li>
                <li>Full customization (colors, text, images, branding) based on your preferences</li>
                <li>Mobile-responsive design optimized for all devices</li>
                <li>Smart lead capture system to help attract serious clients</li>
                <li>Free hosting included (hosting provider may change)</li>
                <li>Domain connection assistance (domain not included)</li>
                <li>Website deployment and setup</li>
                <li>Built-in AI website editor for future content updates</li>
                <li>SEO optimization for local discovery</li>
              </ul>
              <p className="text-sm text-yellow-400 font-semibold">
                ⚠️ IMPORTANT: While we provide the website and free hosting, we do NOT provide domain registration, marketing services, guaranteed traffic generation, or guaranteed client acquisition. We provide a professional online presence — you are responsible for driving traffic and marketing your services. We do NOT guarantee that your website will attract serious clients, generate leads, or produce business results.
              </p>
            </section>

            {/* Payment Terms */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Payment Terms</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All payments must be made in full at the time of booking</li>
                <li>Prices are subject to change without notice</li>
                <li>All prices are in GBP (£) unless otherwise stated</li>
                <li>Payment is processed through a secure third-party payment processor</li>
                <li>All sales are final unless otherwise stated in our refund policy</li>
                <li>You are responsible for any bank fees, transaction fees, or currency conversion fees</li>
              </ul>
            </section>

            {/* Refund Policy */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Refund Policy</h2>
              <p className="mb-4 font-semibold text-accent">
                Subscription Refund Policy - Refunds are available ONLY for the first month of your subscription:
              </p>
              
              <div className="bg-green-950/30 border border-green-500/30 rounded-lg p-4 mb-4">
                <p className="font-bold text-green-400 mb-2">✅ First Month Refundable:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
                  <li>
                    <strong>First Subscription Payment:</strong> Your first monthly subscription payment (£7.99/month) is fully refundable if you request a refund within 30 days of the first payment date.
                  </li>
                  <li>
                    <strong>No Questions Asked:</strong> You can request a refund for the first month for any reason - no questions asked, no explanation required.
                  </li>
                  <li>
                    <strong>Refund Processing:</strong> Refund requests for the first month will be processed within 5-7 business days and refunded to your original payment method within 10-14 business days.
                  </li>
                </ul>
              </div>

              <div className="bg-red-950/30 border border-red-500/30 rounded-lg p-4 mb-4">
                <p className="font-bold text-red-400 mb-2">❌ After Second Payment - NO REFUNDS:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
                  <li>
                    <strong>Second Payment and Beyond:</strong> Once your second subscription payment is successfully processed, ALL future payments become NON-REFUNDABLE. This means after the second payment, you cannot receive refunds for any subsequent subscription payments.
                  </li>
                  <li>
                    <strong>No Exceptions:</strong> After the second payment, refunds will NOT be provided for any reason, including but not limited to:
                    <ul className="list-disc list-inside space-y-1 ml-6 mt-2 text-sm">
                      <li>Change of mind or buyer's remorse</li>
                      <li>Website not generating leads, sales, traffic, or serious clients</li>
                      <li>Dissatisfaction with the website design or functionality</li>
                      <li>Technical issues (unless they prevent basic functionality and cannot be fixed within 30 days)</li>
                      <li>Business changes or market conditions</li>
                      <li>Inability to use or maintain the website</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Cancel Anytime:</strong> While refunds are not available after the second payment, you can cancel your subscription at any time to stop future charges. Cancellation will take effect at the end of your current billing period.
                  </li>
                </ul>
              </div>

              <div className="bg-blue-950/20 border border-blue-500/30 rounded-lg p-4 mb-4">
                <p className="font-bold text-blue-400 mb-2">Important Notes:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300 text-sm">
                  <li>The 30-day refund window for the first month begins on the date of your first subscription payment</li>
                  <li>To request a refund for the first month, you must email us at ptboost.info@gmail.com within 30 days of your first payment</li>
                  <li>After the second payment is processed, the refund window closes permanently for all future payments</li>
                  <li>If you cancel your subscription, you will continue to have access to your website until the end of your current billing period</li>
                  <li>Refunds do not cover any costs you incurred separately (domain names, third-party services, etc.)</li>
                </ul>
              </div>
              
              <p className="text-sm text-gray-400">
                To request a refund for your first month, email us at ptboost.info@gmail.com within 30 days of your first payment date. Include your order number or email address used for the subscription. Refund requests are reviewed within 5-7 business days. Approved refunds are processed within 10-14 business days to your original payment method.
              </p>
            </section>

            {/* Client Responsibilities */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Client Responsibilities</h2>
              <p className="mb-4">As the Client, you are responsible for:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Providing accurate information during the booking process</li>
                <li>Providing all required content (text, images, branding) within 7 days of purchase</li>
                <li>Reviewing the completed website and testing functionality within the first month of your subscription</li>
                <li>Communicating any concerns or issues promptly during the first month if you wish to request a refund</li>
                <li>Timely communication and responses to our requests throughout the project</li>
                <li>Purchasing and maintaining your own domain name (if you want a custom domain)</li>
                <li>Complying with all applicable laws and regulations in your use of the website</li>
                <li>Complying with our hosting provider's Terms of Service and usage policies</li>
                <li>Maintaining appropriate website content after delivery</li>
                <li>All marketing, SEO, and traffic generation efforts</li>
                <li>Ensuring your website content does not violate any laws or third-party rights</li>
              </ul>
              <p className="mt-4 text-yellow-400 font-semibold">
                ⚠️ Delays caused by failure to meet these responsibilities may result in project delays without any refund or compensation. If you wish to request a refund for the first month, you must do so within 30 days of your first payment date. After the second payment is processed, no refunds will be available.
              </p>
            </section>

            {/* Marketing & Traffic Disclaimer */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Marketing & Traffic Disclaimer</h2>
              <div className="bg-orange-950/30 border border-orange-500/30 rounded-lg p-4">
                <p className="font-bold text-orange-400 mb-3">IMPORTANT DISCLAIMER:</p>
                <p className="mb-4">
                  PTBoost provides website design and development services ONLY. We do NOT:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                  <li>Guarantee any traffic to your website</li>
                  <li>Guarantee any leads, conversions, sales, or serious clients</li>
                  <li>Guarantee that your website will attract serious clients or filter out tire-kickers</li>
                  <li>Provide ongoing marketing or advertising services</li>
                  <li>Drive traffic to your website through SEO, ads, or social media</li>
                  <li>Guarantee search engine rankings or visibility</li>
                  <li>Provide business coaching, growth consulting, or client acquisition services</li>
                  <li>Guarantee that your website will solve problems related to chasing DMs or social media reliance</li>
                </ul>
                <p className="font-semibold mb-3">
                  YOU are solely responsible for:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                  <li>Driving traffic to your website through your own marketing efforts, advertising, social media, or other promotional activities</li>
                  <li>Converting website visitors into clients</li>
                  <li>All marketing, lead generation, and client acquisition efforts</li>
                  <li>Managing your business operations, including handling inquiries and client relationships</li>
                </ul>
                <p className="font-semibold text-red-400">
                  We provide a professional online presence — we do NOT guarantee business results, client acquisition, or that your website will attract serious clients. Your website is a tool, not a guarantee of business success.
                </p>
              </div>
            </section>

            {/* Delivery Timeline */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Delivery Timeline</h2>
              <p className="mb-4">
                We aim to deliver your completed website within 7-14 business days after receiving all required materials from you. However:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Timelines are estimates and not guarantees</li>
                <li>Delays may occur due to technical issues, high demand, or client delays</li>
                <li>The timeline starts only after we receive ALL required materials</li>
                <li>Revisions and changes may extend the delivery timeline</li>
                <li>We are not liable for any losses resulting from delays</li>
              </ul>
            </section>

            {/* Revisions & Changes */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Revisions & Changes</h2>
              <p className="mb-4">
                Your purchase includes a limited number of revisions as specified in your service package. Additional revisions beyond the included amount will be charged separately at our current rates.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Minor text and image changes are typically included</li>
                <li>Major design overhauls or structural changes are NOT included</li>
                <li>Revision requests must be submitted within 30 days of delivery</li>
                <li>We reserve the right to refuse unreasonable revision requests</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Intellectual Property Rights</h2>
              <p className="mb-4">
                Upon full payment and delivery, you receive a license to use the website for your personal training business. However:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You may NOT resell, redistribute, or transfer the template to others</li>
                <li>You may NOT claim the design as your own creation</li>
                <li>PTBoost retains the right to showcase your website in our portfolio</li>
                <li>PTBoost retains ownership of the base template design</li>
                <li>You retain ownership of your content (text, images, branding)</li>
                <li>Third-party assets (fonts, images) are subject to their own licenses</li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Limitation of Liability</h2>
              <div className="bg-red-950/20 border border-red-500/20 rounded-lg p-4">
                <p className="mb-4">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, PTBoost SHALL NOT BE LIABLE FOR:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                  <li>Any indirect, incidental, consequential, or punitive damages</li>
                  <li>Loss of profits, revenue, business opportunities, or clients</li>
                  <li>Website downtime, data loss, or technical issues (including those caused by hosting providers)</li>
                  <li>Third-party service failures (hosting providers, domain providers, email providers, etc.)</li>
                  <li>Hosting service interruptions, account suspensions, or policy changes</li>
                  <li>Security breaches or hacking attempts</li>
                  <li>Content errors or inaccuracies provided by you</li>
                  <li>Legal issues arising from your content or business practices</li>
                  <li>Any damages exceeding the amount you paid for our services</li>
                </ul>
                <p className="font-semibold text-red-400">
                  OUR TOTAL LIABILITY IS LIMITED TO THE AMOUNT YOU PAID FOR THE SERVICE.
                </p>
              </div>
            </section>

            {/* Third-Party Services */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Third-Party Services & Hosting</h2>
              <p className="mb-4">
                While we provide free hosting as part of our service, your website relies on third-party platforms (hosting providers, payment processors, email services, etc.). We are NOT responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Hosting service outages, downtime, or technical issues</li>
                <li>Changes to hosting provider's terms of service or pricing structure</li>
                <li>Hosting provider's decision to suspend or terminate accounts</li>
                <li>Bandwidth or usage limitations imposed by hosting providers</li>
                <li>Data breaches or security issues with hosting providers or other third-party services</li>
                <li>Changes to third-party service terms or pricing</li>
                <li>Any third-party service fees or charges that may arise</li>
                <li>Your compliance with hosting provider's or other third-party service terms</li>
              </ul>
              <p className="text-sm text-gray-400">
                Note: While hosting is currently provided free, if our hosting provider changes their free tier or pricing in the future, you may be responsible for any hosting costs to continue service. We reserve the right to change hosting providers at any time.
              </p>
            </section>

            {/* Warranty Disclaimer */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">12. Warranty Disclaimer</h2>
              <p className="mb-4">
                EXCEPT FOR THE 30-DAY FIRST MONTH REFUND POLICY DESCRIBED IN OUR REFUND POLICY, YOUR WEBSITE IS PROVIDED "AS IS" WITHOUT ANY OTHER WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Warranties of merchantability or fitness for a particular purpose</li>
                <li>Warranties of uninterrupted or error-free operation beyond the refund window</li>
                <li>Warranties that the website will meet your specific business requirements or expectations</li>
                <li>Warranties of specific results, leads, sales, or business outcomes</li>
                <li>Warranties of compatibility with future third-party service updates</li>
                <li>Warranties of perpetual functionality without maintenance</li>
              </ul>
              <p className="mt-4 text-sm text-gray-400">
                After the first month refund period has expired (or after the second payment is processed), all services are considered final and accepted by the client.
              </p>
            </section>

            {/* Indemnification */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">13. Indemnification</h2>
              <p className="mb-4">
                You agree to indemnify, defend, and hold harmless PTBoost from any claims, damages, losses, or expenses (including legal fees) arising from:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your use of the website</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any laws or regulations</li>
                <li>Content you provide or publish on your website</li>
                <li>Any claims by your clients or third parties</li>
                <li>Infringement of third-party intellectual property rights</li>
              </ul>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">14. Termination & Cancellation</h2>
              
              <div className="bg-red-950/30 border border-red-500/30 rounded-lg p-4 mb-4">
                <p className="font-bold text-red-400 mb-3">⚠️ IMPORTANT: What Happens When You Cancel or Delete Your Account</p>
                
                <div className="mb-4">
                  <h3 className="font-bold text-white mb-2">14.1 Subscription Cancellation</h3>
                  <p className="text-sm text-gray-300 mb-2">
                    If you cancel your subscription:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-sm text-gray-300">
                    <li><strong>Your website will immediately stop being live</strong> - Your website will be taken offline and will no longer be accessible to visitors</li>
                    <li><strong>No refunds</strong> - If you cancel after the second payment, you will not receive a refund for any remaining subscription period</li>
                    <li><strong>Access ends immediately</strong> - You will lose access to your website and all associated services upon cancellation</li>
                    <li><strong>Website files remain stored</strong> - Your website files will be stored for 30 days after cancellation in case you wish to reactivate</li>
                    <li><strong>Reactivation</strong> - If you reactivate within 30 days, your website can be restored. After 30 days, website files may be permanently deleted</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h3 className="font-bold text-white mb-2">14.2 Account Deletion</h3>
                  <p className="text-sm text-gray-300 mb-2">
                    If you delete your account:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-sm text-gray-300">
                    <li><strong>All website files will be permanently deleted</strong> - This action is IRREVERSIBLE and cannot be undone</li>
                    <li><strong>Your website will be immediately taken offline</strong> - Your website will no longer be accessible</li>
                    <li><strong>All data will be permanently removed</strong> - This includes your website files, content, images, and all associated data</li>
                    <li><strong>No recovery possible</strong> - Once your account is deleted, we cannot recover your website or any data</li>
                    <li><strong>No refunds</strong> - Account deletion does not entitle you to any refunds</li>
                  </ul>
                </div>

                <div className="bg-yellow-950/30 border border-yellow-500/30 rounded-lg p-3 mt-4">
                  <p className="font-bold text-yellow-400 mb-2 text-sm">⚠️ WARNING:</p>
                  <p className="text-sm text-gray-300">
                    Before canceling your subscription or deleting your account, please ensure you have downloaded or backed up any content, images, or data you wish to keep. We are not responsible for any data loss resulting from cancellation or account deletion.
                  </p>
                </div>
              </div>

              <div className="bg-zinc-800/50 border border-accent/30 rounded-lg p-4 mb-4">
                <h3 className="font-bold text-white mb-2">14.3 Our Right to Terminate</h3>
                <p className="mb-2 text-sm text-gray-300">
                  We reserve the right to terminate or refuse service to anyone at any time for any reason, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-sm text-gray-300">
                  <li>Violation of these Terms</li>
                  <li>Fraudulent or abusive behavior</li>
                  <li>Non-payment or payment disputes</li>
                  <li>Providing false or misleading information</li>
                  <li>Illegal use of the website or services</li>
                </ul>
                <p className="mt-3 text-sm text-gray-400">
                  Upon termination by us, your website will be taken offline immediately and website files may be deleted after 30 days. You will not receive a refund unless specifically approved under our Refund Policy.
                </p>
              </div>
            </section>

            {/* Dispute Resolution */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">15. Dispute Resolution</h2>
              <p className="mb-4">
                In the event of any dispute, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>First attempt to resolve the issue through good faith communication via email</li>
                <li>Provide us with 30 days to resolve the issue before taking further action</li>
                <li>Submit to binding arbitration if informal resolution fails</li>
                <li>Waive your right to participate in class action lawsuits</li>
              </ul>
              <p className="text-gray-400">
                These Terms shall be governed by the laws of England and Wales, without regard to conflict of law principles.
              </p>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">16. Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Your continued use of our services after changes constitutes acceptance of the modified Terms.
              </p>
              <p className="text-gray-400">
                It is your responsibility to review these Terms periodically.
              </p>
            </section>

            {/* Entire Agreement */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">17. Entire Agreement</h2>
              <p>
                These Terms constitute the entire agreement between you and PTBoost regarding our services and supersede any prior agreements, communications, or understandings, whether oral or written.
              </p>
            </section>

            {/* Severability */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">18. Severability</h2>
              <p>
                If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
              </p>
            </section>

            {/* Contact Information */}
            <section className="border-t border-accent/20 pt-8 mt-8">
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="mb-4">
                If you have any questions about these Terms & Conditions, please contact us:
              </p>
              <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
                <p className="font-semibold text-white mb-2">PTBoost</p>
                <p className="text-gray-300">
                  📧 Email: <a href="mailto:ptboost.info@gmail.com" className="text-accent hover:underline">ptboost.info@gmail.com</a>
                </p>
              </div>
            </section>

            {/* Acknowledgment */}
            <section className="bg-zinc-800/50 border border-accent/30 rounded-lg p-6 mt-8">
              <p className="font-bold text-white mb-3">
                ✓ By purchasing our services, you acknowledge that:
              </p>
              <ul className="space-y-2 text-sm">
                <li>• You have read and understood these Terms & Conditions in full</li>
                <li>• You agree to be bound by these Terms</li>
                <li>• You understand the refund policy: First month subscription payment is refundable within 30 days; after the second payment, all future payments are NON-REFUNDABLE</li>
                <li>• You understand that once your second subscription payment is processed, you cannot receive refunds for any future subscription payments</li>
                <li>• You can cancel your subscription at any time to stop future charges, but refunds are only available for the first month</li>
                <li>• You accept sole responsibility for marketing and driving traffic to your website</li>
                <li>• You understand that business results (leads, sales, traffic, serious clients) are NOT guaranteed</li>
                <li>• You understand that we do NOT guarantee your website will attract serious clients or solve problems related to chasing DMs</li>
                <li>• Free hosting is provided and subject to our hosting provider's terms and availability</li>
                <li>• You understand that hosting providers may change and you may be responsible for hosting costs in the future</li>
                <li>• You understand that if you cancel your subscription, your website will immediately stop being live and will no longer be accessible</li>
                <li>• You understand that if you delete your account, all website files will be permanently deleted and cannot be recovered</li>
                <li>• You understand that you are responsible for backing up any content, images, or data you wish to keep before canceling or deleting your account</li>
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

