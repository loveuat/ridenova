import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Atulya IT Solutions",
  description:
    "Read our Privacy Policy to understand how Atulya IT Solutions collects, uses, and protects your information.",
};

export  function PrivacyPolicyPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">
          Privacy Policy
        </h1>

        <p className="text-gray-300 mb-8">
          Last Updated: June 2026
        </p>

        <div className="space-y-10 text-gray-300 leading-8">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Introduction
            </h2>
            <p>
              Atulya IT Solutions respects your privacy and is committed to
              protecting your personal information. This Privacy Policy explains
              how we collect, use, and safeguard your data when you visit our
              website or use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Information We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name and contact details</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Business information shared through forms</li>
              <li>Website usage and analytics data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide our services</li>
              <li>To respond to inquiries and support requests</li>
              <li>To improve website performance and user experience</li>
              <li>To send service-related communications</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Cookies & Analytics
            </h2>
            <p>
              Our website may use cookies and analytics tools such as Google
              Analytics to understand visitor behavior and improve website
              performance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Data Protection
            </h2>
            <p>
              We implement appropriate security measures to protect your
              personal information from unauthorized access, disclosure, or
              misuse.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Third-Party Services
            </h2>
            <p>
              We may use trusted third-party services for analytics, hosting,
              payment processing, or communication. These providers have their
              own privacy policies governing data usage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Your Rights
            </h2>
            <p>
              You may request access, correction, or deletion of your personal
              information by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Contact Us
            </h2>
            <p>
              If you have any questions regarding this Privacy Policy, please
              contact us through our website contact form or email.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}

