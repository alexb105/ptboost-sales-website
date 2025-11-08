import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms & Conditions | PTBoost",
  description: "Terms and conditions for PTBoost website services",
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
            Last Updated: November 8, 2025
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
                PTBoost provides pre-designed website templates and customization services for personal trainers. Our service includes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>A professionally designed website template</li>
                <li>Basic customization (colors, text, images)</li>
                <li>Free hosting via Netlify</li>
                <li>Domain connection assistance (domain not included)</li>
                <li>Website deployment</li>
              </ul>
              <p className="text-sm text-yellow-400 font-semibold">
                ⚠️ IMPORTANT: While we provide the website and free hosting via Netlify, we do NOT provide domain registration, marketing services, SEO optimization, or traffic generation services unless explicitly stated in your purchase.
              </p>
            </section>

            {/* Payment Terms */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Payment Terms</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All payments must be made in full at the time of booking</li>
                <li>Prices are subject to change without notice</li>
                <li>All prices are in GBP (£) unless otherwise stated</li>
                <li>Payment is processed through Stripe, a third-party payment processor</li>
                <li>All sales are final unless otherwise stated in our refund policy</li>
                <li>You are responsible for any bank fees, transaction fees, or currency conversion fees</li>
              </ul>
            </section>

            {/* Refund Policy */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Refund Policy</h2>
              <p className="mb-4 font-semibold text-accent">
                Limited Refund Eligibility - Refunds are ONLY available under the following strict conditions:
              </p>
              <div className="bg-red-950/30 border border-red-500/30 rounded-lg p-4 mb-4">
                <p className="font-bold text-red-400 mb-2">Refund Conditions:</p>
                <ul className="list-disc list-inside space-y-3 ml-4 text-gray-300">
                  <li>
                    <strong>Post-Delivery Dissatisfaction:</strong> Refund available ONLY if you are not satisfied with the completed website within 7 days AFTER we have officially handed over the finished website to you. You must clearly communicate your dissatisfaction and the specific reasons within this 7-day window. After 7 days from handover, NO REFUNDS will be provided.
                  </li>
                  <li>
                    <strong>Serious Technical Issues:</strong> Refund available only if the delivered website has serious technical defects that prevent basic functionality (e.g., website won't load, forms completely broken, site is unusable) AND we are unable to fix these issues within 30 days of you reporting them.
                  </li>
                </ul>
              </div>
              
              <div className="bg-zinc-800/50 border border-accent/30 rounded-lg p-4 mb-4">
                <p className="font-bold text-white mb-2">NO REFUNDS will be provided for:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Refund requests made after the 7-day post-delivery window has expired</li>
                  <li>Change of mind or buyer's remorse after accepting the completed website</li>
                  <li>Minor design preferences or subjective aesthetic opinions</li>
                  <li>Website not generating leads, sales, or traffic (we do not guarantee business results)</li>
                  <li>Technical issues caused by third-party services (Netlify hosting, domain providers, email services, etc.)</li>
                  <li>Netlify service outages, downtime, or account issues</li>
                  <li>Minor technical issues or bugs that do not prevent basic website functionality</li>
                  <li>Delays caused by client not providing required materials or information</li>
                  <li>Client's inability to use, update, or maintain the website after delivery</li>
                  <li>Market changes, business changes, or external factors</li>
                  <li>Issues with content or images provided by the client</li>
                  <li>Failure to review and provide feedback during the development process</li>
                </ul>
              </div>

              <div className="bg-blue-950/20 border border-blue-500/30 rounded-lg p-4 mb-4">
                <p className="font-bold text-blue-400 mb-2">Important Notes:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300 text-sm">
                  <li>The 7-day refund window begins when we officially notify you that your website is complete and hand it over to you</li>
                  <li>You are responsible for thoroughly reviewing the website during this 7-day period</li>
                  <li>For technical issues, you must report them immediately and provide clear documentation of the problem</li>
                  <li>Refunds do not cover any costs you incurred separately (domain names, third-party services, etc.)</li>
                </ul>
              </div>

              <p className="text-sm text-gray-400">
                To request a refund, you must email us at ptboost.info@gmail.com within the applicable timeframe with your order number and detailed explanation. Refund requests are reviewed within 5-7 business days. Approved refunds are processed within 10-14 business days to your original payment method.
              </p>
            </section>

            {/* Client Responsibilities */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Client Responsibilities</h2>
              <p className="mb-4">As the Client, you are responsible for:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Providing accurate information during the booking process</li>
                <li>Providing all required content (text, images, branding) within 7 days of purchase</li>
                <li>Thoroughly reviewing the completed website within the 7-day post-delivery refund window</li>
                <li>Communicating any concerns or issues promptly during the review period</li>
                <li>Timely communication and responses to our requests throughout the project</li>
                <li>Purchasing and maintaining your own domain name (if you want a custom domain)</li>
                <li>Complying with all applicable laws and regulations in your use of the website</li>
                <li>Complying with Netlify's Terms of Service and usage policies</li>
                <li>Maintaining appropriate website content after delivery</li>
                <li>All marketing, SEO, and traffic generation efforts</li>
                <li>Ensuring your website content does not violate any laws or third-party rights</li>
              </ul>
              <p className="mt-4 text-yellow-400 font-semibold">
                ⚠️ Delays caused by failure to meet these responsibilities may result in project delays without any refund or compensation. Failure to review your website within the 7-day window means you forfeit your right to a refund based on dissatisfaction.
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
                  <li>Guarantee any leads, conversions, or sales</li>
                  <li>Provide ongoing marketing or advertising services</li>
                  <li>Drive traffic to your website through SEO, ads, or social media</li>
                  <li>Guarantee search engine rankings or visibility</li>
                  <li>Provide business coaching or growth consulting</li>
                </ul>
                <p className="font-semibold">
                  YOU are solely responsible for driving traffic to your website through your own marketing efforts, advertising, social media, or other promotional activities.
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
                  <li>Website downtime, data loss, or technical issues (including those caused by Netlify)</li>
                  <li>Third-party service failures (Netlify hosting, domain providers, email providers, etc.)</li>
                  <li>Netlify service interruptions, account suspensions, or policy changes</li>
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
              <h2 className="text-2xl font-bold text-white mb-4">11. Third-Party Services & Netlify Hosting</h2>
              <p className="mb-4">
                While we provide free hosting via Netlify as part of our service, your website relies on third-party platforms (Netlify, payment processors, email services, etc.). We are NOT responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Netlify service outages, downtime, or technical issues</li>
                <li>Changes to Netlify's terms of service or pricing structure</li>
                <li>Netlify's decision to suspend or terminate accounts</li>
                <li>Bandwidth or usage limitations imposed by Netlify</li>
                <li>Data breaches or security issues with Netlify or other third-party services</li>
                <li>Changes to third-party service terms or pricing</li>
                <li>Any third-party service fees or charges that may arise</li>
                <li>Your compliance with Netlify's or other third-party service terms</li>
              </ul>
              <p className="text-sm text-gray-400">
                Note: While hosting is currently provided free via Netlify, if Netlify changes their free tier or pricing in the future, you may be responsible for any hosting costs to continue service.
              </p>
            </section>

            {/* Warranty Disclaimer */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">12. Warranty Disclaimer</h2>
              <p className="mb-4">
                EXCEPT FOR THE 7-DAY POST-DELIVERY SATISFACTION GUARANTEE AND 30-DAY SERIOUS TECHNICAL ISSUE WARRANTY DESCRIBED IN OUR REFUND POLICY, YOUR WEBSITE IS PROVIDED "AS IS" WITHOUT ANY OTHER WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
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
                After the applicable refund periods have expired, all services are considered final and accepted by the client.
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
              <h2 className="text-2xl font-bold text-white mb-4">14. Termination</h2>
              <p className="mb-4">
                We reserve the right to terminate or refuse service to anyone at any time for any reason, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Violation of these Terms</li>
                <li>Fraudulent or abusive behavior</li>
                <li>Non-payment or payment disputes</li>
                <li>Providing false or misleading information</li>
              </ul>
              <p className="mt-4 text-gray-400">
                Upon termination, you will not receive a refund unless specifically approved under our Refund Policy.
              </p>
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
                <li>• You understand the refund policy: 7 days post-delivery for dissatisfaction, 30 days for serious technical issues only</li>
                <li>• You are responsible for thoroughly reviewing your website within the 7-day post-delivery window</li>
                <li>• After the 7-day window expires, you forfeit your right to a refund based on dissatisfaction</li>
                <li>• You accept sole responsibility for marketing and driving traffic to your website</li>
                <li>• You understand that business results (leads, sales, traffic) are NOT guaranteed</li>
                <li>• Free hosting is provided via Netlify and subject to their terms and availability</li>
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

