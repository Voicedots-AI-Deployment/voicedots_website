import React from "react";

export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Privacy <span className="text-primary">Policy</span>
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how VoiceDots
            collects, uses, and protects your information.
          </p>
        </div>

        {/* Content */}
        <div className="glass-card rounded-2xl p-6 md:p-10 space-y-10 text-sm leading-relaxed">
          {/* Intro */}
          <section className="space-y-3">
            <p>
              At <strong>VoiceDots</strong>, accessible from{" "}
              <a
                href="https://www.voicedots.io"
                className="text-primary underline"
              >
                www.voicedots.io
              </a>
              , the privacy and security of our visitors is one of our top
              priorities.
            </p>
            <p>
              This Privacy Policy document outlines the types of information
              that are collected and recorded by VoiceDots and how we use it.
            </p>
            <p>
              If you have additional questions or require more information
              about our Privacy Policy, feel free to contact us.
            </p>
          </section>

          {/* Scope */}
          <section>
            <h2 className="text-lg font-semibold mb-3">
              Scope of This Policy
            </h2>
            <p>
              This Privacy Policy applies only to information collected through
              our website and does not apply to information collected offline
              or via other channels.
            </p>
          </section>

          {/* Consent */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Consent</h2>
            <p>
              By using our website, you hereby consent to our Privacy Policy
              and agree to its terms.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-lg font-semibold mb-3">
              Information We Collect
            </h2>
            <p>
              We may collect personal information from you in various ways,
              including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                <strong>Contact Forms:</strong> Name, email address, phone
                number, company name, etc.
              </li>
              <li>
                <strong>Direct Communication:</strong> Information you provide
                when contacting us directly.
              </li>
              <li>
                <strong>Account Registration (if applicable):</strong> Address,
                preferences, or other custom details.
              </li>
            </ul>
            <p className="mt-2">
              We will always clarify what information is being collected and
              why.
            </p>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-lg font-semibold mb-3">
              How We Use Your Information
            </h2>
            <p>We use the information we collect in the following ways:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>To provide, operate, and maintain our website</li>
              <li>To improve and personalize user experience</li>
              <li>To understand user behavior and interactions</li>
              <li>To develop new features, services, or tools</li>
              <li>
                To send important updates and marketing communications
                (only if opted in)
              </li>
            </ul>
            <p className="mt-2">
              We also use collected data to prevent fraud and ensure website
              security.
            </p>
          </section>

          {/* Log Files */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Log Files</h2>
            <p>
              VoiceDots follows a standard procedure of using log files. These
              files log visitors when they visit websites.
            </p>
            <p className="mt-2">Log files may include:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Internet Service Provider (ISP)</li>
              <li>Date and time stamp</li>
              <li>Referring / exit pages</li>
              <li>Click activity</li>
            </ul>
            <p className="mt-2">
              This information is used for analyzing trends, administering the
              site, and tracking user movement.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-lg font-semibold mb-3">
              Cookies and Web Beacons
            </h2>
            <p>
              VoiceDots uses cookies to store information about visitors’
              preferences and optimize web content.
            </p>
            <p className="mt-2">
              Cookies are not linked to any personally identifiable
              information. You can manage cookie settings through your browser.
            </p>
          </section>

          {/* Third Party */}
          <section>
            <h2 className="text-lg font-semibold mb-3">
              Third-Party Privacy Policies
            </h2>
            <p>
              VoiceDots’ Privacy Policy does not apply to other websites or
              services. We advise you to consult the respective Privacy Policies
              of third-party services for more detailed information.
            </p>
          </section>

          {/* GDPR & CCPA */}
          <section>
            <h2 className="text-lg font-semibold mb-3">
              Your Data Protection Rights (GDPR & CCPA)
            </h2>
            <p>
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                <strong>Access:</strong> Request copies of your personal data
              </li>
              <li>
                <strong>Rectification:</strong> Request correction of inaccurate
                data
              </li>
              <li>
                <strong>Erasure:</strong> Request deletion of your personal data
              </li>
              <li>
                <strong>Restrict Processing:</strong> Limit the use of your data
              </li>
              <li>
                <strong>Object to Processing:</strong> Disagree with how data is
                processed
              </li>
              <li>
                <strong>Data Portability:</strong> Request data transfer
              </li>
            </ul>
            <p className="mt-2">
              We respond to such requests within 30 days. Please email us if you
              wish to exercise these rights.
            </p>
          </section>

          {/* Children */}
          <section>
            <h2 className="text-lg font-semibold mb-3">
              Children’s Privacy
            </h2>
            <p>
              Protecting children while using the internet is one of our
              priorities. VoiceDots does not knowingly collect any personally
              identifiable information from children under the age of 13.
            </p>
            <p className="mt-2">
              If you believe your child has provided personal information on
              our website, please contact us immediately and we will promptly
              remove such data from our records.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
