import Link from "next/link";
import H1 from "@/components/h1";
import H2 from "@/components/h2";

export default function TermsAndConditiosnPage() {
	return (
		<main className="px-3 py-3 sm:px-9 sm:py-13">
				<H1 className="text-center">Terms and Conditions</H1>			

				<section className="mt-8">
					<H2>Introduction</H2>
					<p>
						Welcome to CozyPlaces, a platform that allows users to book accommodations and other related services. 
						By accessing or using our website, you agree to comply with and be bound by these Terms and Conditions. Please read them carefully.
					</p>
				</section>

				<section className="mt-8">
					<H2>Acceptance of Terms</H2>
					<p>
						By using our website, creating an account, or making a booking, you acknowledge that you have read, understood, and agreed to these Terms and Conditions. 
						If you do not agree with these terms, you should not use the website.	
					</p>
				</section>

				<section className="mt-8">
					<H2>Services Provided</H2>
					<p>
						CozyPlaces provides a service that allows users to search for, book, and manage accommodations, as well as other related travel services. 
						The availability of properties and services may vary depending on location, season, and availability.
					</p>
				</section>

				<section className="mt-8">
					<H2>Eligibility</H2>
					<p>
						To use our booking service, you must be at least 18 years of age or the legal age of majority in your jurisdiction. 
						By accessing or using the website, you represent that you are at least 18 years old.
					</p>
				</section>

				<section className="mt-8">
					<H2>Account Creation and Security</H2>
					<p>
						To book a stay, users may be required to create an account. 
						You agree to provide accurate and complete information and keep your account details confidential. 
						You are responsible for all activities that occur under your account and agree to notify us immediately of any unauthorized use.
					</p>
				</section>

				<section className="mt-8">
					<H2>Booking Process</H2>
					<ul className="common-list">
						<li>
							<strong>How to Book: </strong>
							<span>
								Users can search for accommodations, select a property, and complete the booking by providing necessary details (e.g., dates, number of guests, payment information).
							</span>
						</li>
						<li>
							<strong>Booking Confirmation: </strong>
							<span>
								Once a booking is successfully made, users will receive a confirmation email with the details of the booking.
							</span>
						</li>
						<li>
							<strong>Payment: </strong>
							<span>
								Payments are processed through third-party payment processors, and users agree to pay the full amount at the time of booking, including any applicable taxes, fees, or additional charges.
							</span>
						</li>
					</ul>
				</section>

				<section className="mt-8">
					<H2>User Responsibilities</H2>
					<p className="mb-3">You agree to:</p>
					<ul className="common-list">
						<li>Provide accurate and complete information during the booking process.</li>
						<li>Honor the booking and fulfill any contractual obligations with the accommodation provider.</li>
						<li>Comply with all applicable laws, regulations, and policies during your stay.</li>
					</ul>
				</section>

				<section className="mt-8">
					<H2>Cancellations, Refunds, and Modifications</H2>
					<ul className="common-list">
						<li>
							<strong>Cancellations: </strong>
							<span>
								Cancellation policies vary by accommodation and will be specified during the booking process. 
								Users must follow the specified cancellation guidelines to receive a refund.
							</span>
						</li>
						<li>
							<strong>Refunds: </strong>
							<span>
								Refunds, if applicable, will be processed according to the accommodation provider’s policies. 
								Users are responsible for checking the refund conditions at the time of booking.
							</span>
						</li>
						<li>
							<strong>Modifications: </strong>
							<span>
								Users may modify their booking subject to availability and any applicable fees.
							</span>
						</li>
					</ul>
				</section>

				<section className="mt-8">
					<H2>Liabilities and Disclaimers</H2>
					<p>
						CozyPlaces acts as an intermediary between users and accommodation providers. 
						We are not responsible for any issues that may arise during your stay, including but not limited to property damage, personal injury, or loss of personal belongings. 
						All accommodations are provided "as is," and any complaints should be addressed directly to the accommodation provider.
					</p>
				</section>

				<section className="mt-8">
					<H2>Force Majeure</H2>
					<p>
						We are not liable for any failure or delay in performance due to circumstances beyond our control, including but not limited to natural disasters, strikes, war, or other unforeseen events.
					</p>
				</section>

				<section className="mt-8">
					<H2>Intellectual Property</H2>
					<p>
						All content on CozyPlaces, including text, images, logos, and software, is owned by us or our licensors and is protected by copyright laws. 
						You may not use any content without our express permission.
					</p>
				</section>

				<section className="mt-8">
					<H2>Privacy and Data Protection</H2>
					<p>
						By using our website, you consent to the collection and use of your personal information in accordance with our <Link href="/privacy-policy">Privacy Policy.</Link>
					</p>
				</section>

				<section className="mt-8">
					<H2>Dispute Resolution and Governing Law</H2>
					<p>
						Any disputes arising out of or related to these Terms and Conditions will be resolved through arbitration or mediation, in accordance with the laws, without regard to its conflict of laws principles.
					</p>
				</section>

				<section className="mt-8">
					<H2>Changes to Terms</H2>
					<p>
						We reserve the right to update these Terms and Conditions at any time. 
						You will be notified of any significant changes via email or prominent notice on the website. 
						Continued use of the site after any modifications constitutes your acceptance of the updated terms.
					</p>
				</section>

				<section className="mt-8">
					<H2>Contact Information</H2>
					<p>
						If you have any questions or concerns regarding these Terms and Conditions, please contact us.
					</p>
				</section>

				<p className="mt-10">
					<strong>Last updated: </strong> 
					<span>
						{new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" })}
					</span>
				</p>			
		</main>
	);
}

export const metadata = {
	title: "Hostings terms and conditions",
	description: "Terms and conditions",
};
