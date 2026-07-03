import React from "react";

export function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Terms & <span className="text-primary">Conditions</span>
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Please read these terms and conditions carefully before using
            VoiceDots.
          </p>
        </div>

        {/* Content */}
        <div className="glass-card rounded-2xl p-6 md:p-10 space-y-10 text-sm leading-relaxed">
          {/* Intro */}
          <section className="space-y-3">
            <p>
              Welcome to <strong>VoiceDots</strong>!
            </p>
            <p>
              These terms and conditions outline the rules and regulations for
              the use of VoiceDots’ website, located at{" "}
              <a
                href="https://www.voicedots.io"
                className="text-primary underline"
              >
                www.voicedots.io
              </a>
              .
            </p>
            <p>
              By accessing this website, we assume you accept these terms and
              conditions in full. Do not continue to use VoiceDots if you do not
              agree to all of the terms and conditions stated on this page.
            </p>
          </section>

          {/* Terminology */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Terminology</h2>
            <p>
              The following terminology applies to these Terms and Conditions,
              Privacy Statement, Disclaimer Notice, and all Agreements:
              “Client”, “You”, and “Your” refers to you, the person accessing
              this website and accepting the Company’s terms and conditions.
              “The Company”, “Ourselves”, “We”, “Our”, and “Us”, refers to
              VoiceDots. “Party”, “Parties”, or “Us”, refers to both the Client
              and ourselves.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Cookies</h2>
            <p>
              We use cookies to enhance your experience. By using VoiceDots, you
              consent to the use of cookies in accordance with our Privacy
              Policy.
            </p>
            <p>
              Most modern websites use cookies to enable certain functionalities
              and improve user experience. Some of our analytics or advertising
              partners may also use cookies.
            </p>
          </section>

          {/* License */}
          <section>
            <h2 className="text-lg font-semibold mb-3">License</h2>
            <p>
              Unless otherwise stated, VoiceDots and/or its licensors own the
              intellectual property rights for all material on this website.
              All intellectual property rights are reserved.
            </p>

            <p className="mt-3">You must not:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Republish material from VoiceDots</li>
              <li>Sell, rent, or sub-license material from VoiceDots</li>
              <li>Reproduce, duplicate, or copy material from VoiceDots</li>
              <li>Redistribute content from VoiceDots</li>
            </ul>
          </section>

          {/* User Comments */}
          <section>
            <h2 className="text-lg font-semibold mb-3">User Comments</h2>
            <p>
              Certain parts of this website may allow users to post content,
              comments, or feedback. VoiceDots does not filter, edit, publish,
              or review comments prior to their appearance.
            </p>
            <p>
              VoiceDots reserves the right to monitor all comments and remove
              any content that is inappropriate, offensive, or breaches these
              Terms.
            </p>

            <p className="mt-3">You warrant that:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>You have the right to post comments on our website</li>
              <li>Your content does not infringe third-party rights</li>
              <li>Your content is not defamatory, unlawful, or invasive</li>
              <li>Your content does not promote illegal activity</li>
            </ul>
          </section>

          {/* Hyperlinking */}
          <section>
            <h2 className="text-lg font-semibold mb-3">
              Hyperlinking to Our Content
            </h2>

            <p>The following organizations may link to our website without prior written approval:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Government agencies</li>
              <li>Search engines</li>
              <li>News organizations</li>
              <li>Online directory distributors</li>
              <li>System-wide accredited businesses</li>
            </ul>

            <p className="mt-3">
              Other organizations may request approval to link to our website.
              Approved links must not be deceptive or falsely imply sponsorship
              or endorsement.
            </p>

            <p className="mt-2">
              No use of VoiceDots’ logo or branding is permitted without a
              trademark license.
            </p>
          </section>

          {/* iFrames */}
          <section>
            <h2 className="text-lg font-semibold mb-3">iFrames</h2>
            <p>
              You may not create frames around our web pages that alter the
              visual presentation or appearance of our website without prior
              written approval.
            </p>
          </section>

          {/* Content Liability */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Content Liability</h2>
            <p>
              We are not responsible for any content that appears on your
              website. You agree to protect and defend us against all claims
              arising from your website.
            </p>
          </section>

          {/* Privacy */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Your Privacy</h2>
            <p>
              Please read our Privacy Policy for details on how we handle data
              and protect your privacy.
            </p>
          </section>

          {/* Rights */}
          <section>
            <h2 className="text-lg font-semibold mb-3">
              Reservation of Rights
            </h2>
            <p>
              We reserve the right to request removal of any links to our
              website. We may amend these terms at any time.
            </p>
          </section>

          {/* Accuracy */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Content Accuracy</h2>
            <p>
              We do not guarantee the completeness, accuracy, or availability
              of the website content. Information may be updated or changed
              without notice.
            </p>
          </section>

          {/* Disclaimer */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Disclaimer</h2>
            <p>
              To the maximum extent permitted by law, VoiceDots excludes all
              representations and warranties relating to this website and its
              use.
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Limitation of liability for personal injury or death</li>
              <li>Limitation of liability for fraud or misrepresentation</li>
              <li>Exclusions not permitted under applicable law</li>
            </ul>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Governing Law</h2>
            <p>
              These Terms shall be governed and interpreted in accordance with
              the laws of Tamil Nadu, India, without regard to conflict of law
              provisions.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
