import H1 from "@/components/h1";
import H2 from "@/components/h2";

export default function PrivacyPolicyPage() {
	return (
		<main className="main-container px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
			<H1 className="text-center">Privacy Policy</H1>			
			
			<section className="section-block">
				<H2>Introduction</H2>
				<p>
					CozyPlaces values your privacy and is committed to protecting your personal information. 
					This Privacy Policy outlines how we collect, use, and protect your data. By using our website, you consent to the practices described in this policy.
				</p>
			</section>

			<section className="section-block">
				<H2>Information We Collect</H2>
				<p className="mb-3">We collect personal information in the following ways:</p>
				<ul className="common-list">
					<li>
						<strong>Account Information: </strong>
						<span>
							When you create an account, we collect your name, email address, phone number, and other relevant details.
						</span>
					</li>
					<li>
						<strong>Booking Confirmation: </strong>
						<span>
							When you book an accommodation, we collect details such as your payment information, booking dates, and number of guests.
						</span>
					</li>
					<li>
						<strong>Usage Data: </strong>
						<span>
							We collect information about how you interact with our website, including browsing patterns, device information, and IP addresses.
						</span>
					</li>
					<li>
						<strong>Cookies and Tracking: </strong>
						<span>
							We use cookies and other tracking technologies to improve user experience and analyze website traffic.
						</span>
					</li>
				</ul>
			</section>

			<section className="section-block">
				<H2>How We Use Your Information</H2>
				<p className="mb-3">We use your personal data for the following purposes:</p>
				<ul className="common-list">
					<li>
						<strong>Processing Bookings: </strong>
						<span>
							To complete your booking, process payments, and provide booking confirmations.
						</span>
					</li>
					<li>
						<strong>Customer Support: </strong>
						<span>
							To respond to inquiries and provide assistance related to your bookings.
						</span>
					</li>
					<li>
						<strong>Improvement of Services: </strong>
						<span>
							To enhance the functionality and performance of our website and services.
						</span>
					</li>
					<li>
						<strong>Marketing: </strong>
						<span>
							With your consent, we may use your information to send promotional emails or offers related to our services.
						</span>
					</li>
				</ul>
			</section>

			<section className="section-block">
				<H2>Cookies and Tracking Technologies</H2>
				<p>
					We use cookies to personalize your experience on our website, improve functionality, and track website performance. 
					By using our site, you consent to the use of cookies. You can control cookie settings through your browser.
				</p>
			</section>

			<section className="section-block">
				<H2>Data Protection</H2>
				<p>
					We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. 
					This includes encryption, secure payment processing, and access control procedures.
				</p>
			</section>

			<section className="section-block">
				<H2>Sharing Your Information</H2>
				<p className="mb-3">We may share your information with:</p>
				<ul className="common-list">
					<li>
						<strong>Third-Party Service Providers: </strong>
						<span>
							Such as payment processors and accommodation providers, to facilitate your bookings and provide services.
						</span>
					</li>
					<li>
						<strong>Legal Authorities: </strong>
						<span>
							If required by law or to comply with a legal process, we may share your data with law enforcement or regulatory authorities.
						</span>
					</li>				
				</ul>
			</section>

			<section className="section-block">
				<H2>Data Retention</H2>
				<p>
					We retain your personal data for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. 
					You can request the deletion of your data at any time, subject to applicable legal retention requirements.
				</p>
			</section>

			<section className="section-block">
				<H2>User Rights</H2>
				<p className="mb-3">You have the right to:</p>
				<ul className="common-list">
					<li>
						<strong>Access </strong>
						<span>
							your personal data that we hold.
						</span>
					</li>
					<li>
						<strong>Rectify </strong>
						<span>
							any inaccurate or incomplete information.
						</span>
					</li>
					<li>
						<strong>Request deletion </strong>
						<span>
							of your personal data, subject to legal restrictions.
						</span>
					</li>
					<li>
						<strong>Opt-out of marketing </strong>
						<span>
							communications at any time by following the instructions in our emails or contacting us directly.
						</span>
					</li>
				</ul>
			</section>

			<section className="section-block">
				<H2>International Transfers</H2>
				<p>
					Your personal data may be transferred to and stored in countries outside your own. If we do so, we will ensure that adequate safeguards are in place to protect your information.
				</p>
			</section>

			<section className="section-block">
				<H2>Changes to the Privacy Policy</H2>
				<p>
					We may update this Privacy Policy from time to time. 
					When we make significant changes, we will notify you via email or through a prominent notice on our website. 
					Continued use of the website after any modifications constitutes your acceptance of the updated policy.
				</p>
			</section>

			<section className="section-block">
				<H2>Contact Information</H2>
				<p>
					If you have any questions or concerns regarding this Privacy Policy or our data practices, please contact us.
				</p>
			</section>

			<p className="section-block mt-10">
				<strong>Last updated: </strong> 
				<span>
					{new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" })}
				</span>
			</p>
		</main>
	);
}

export const metadata = {
	title: "Hostings privacy policy",
	description: "Privacy policy",
};