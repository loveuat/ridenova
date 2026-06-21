import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Atulya IT Solutions",
  description:
    "Terms and Conditions governing the use of Atulya IT Solutions website and services.",
};

export  function TermsOfServicePage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">
          Terms of Service
        </h1>

        <p className="text-gray-400 mb-10">
          Last Updated: June 2026
        </p>

        <div className="space-y-10 text-gray-300 leading-8">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using the Atulya IT Solutions website and
              services, you agree to be bound by these Terms of Service. If
              you do not agree with any part of these terms, please do not use
              our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              2. Services
            </h2>
            <p>
              Atulya IT Solutions provides website development, WordPress
              maintenance, SEO services, AI solutions, consulting, and related
              digital services. Service scope, timelines, and deliverables may
              vary based on individual agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              3. Client Responsibilities
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate project requirements.</li>
              <li>Supply content, credentials, and assets when required.</li>
              <li>Review deliverables within agreed timelines.</li>
              <li>Ensure legal ownership of submitted content.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              4. Payments
            </h2>
            <p>
              Project fees, maintenance plans, and service charges are agreed
              upon before work begins. Failure to make payments may result in
              suspension or termination of services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              5. Intellectual Property
            </h2>
            <p>
              Upon full payment, ownership of completed project deliverables
              transfers to the client unless otherwise stated in writing.
              Atulya IT Solutions retains ownership of proprietary tools,
              frameworks, and reusable components.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              6. Website Availability
            </h2>
            <p>
              We strive to maintain uninterrupted access to our website and
              services but do not guarantee continuous availability or
              error-free operation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              7. Limitation of Liability
            </h2>
            <p>
              Atulya IT Solutions shall not be liable for any indirect,
              incidental, special, or consequential damages arising from the
              use of our services or website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              8. Third-Party Services
            </h2>
            <p>
              Projects may involve third-party platforms, hosting providers,
              plugins, APIs, or software. We are not responsible for issues
              caused by third-party services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              9. Termination
            </h2>
            <p>
              We reserve the right to suspend or terminate services for
              violations of these terms, non-payment, abuse, or unlawful
              activities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              10. Changes to Terms
            </h2>
            <p>
              We may update these Terms of Service at any time. Continued use
              of our website or services constitutes acceptance of the updated
              terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              11. Contact Information
            </h2>
            <p>
              For questions regarding these Terms of Service, please contact
              Atulya IT Solutions through our Contact page.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}