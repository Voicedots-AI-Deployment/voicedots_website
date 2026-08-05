import React, { useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';


export function ContactPage() {
  const [searchParams] = useSearchParams();
  const prefillMessage = searchParams.get('message') || '';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: prefillMessage,
    botField: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check (bot prevention)
    if (formData.botField) {
      setSubmitStatus('success');
      return;
    }

    // Rate limiting check
    const lastSubmit = localStorage.getItem('lastContactFormSubmit');
    if (lastSubmit) {
      const timeSinceSubmit = Date.now() - parseInt(lastSubmit, 10);
      const cooldownPeriod = 60 * 60 * 1000; // 1 hour
      if (timeSinceSubmit < cooldownPeriod) {
        setSubmitStatus('error');
        alert('You have already submitted a request recently. Please try again later.');
        return;
      }
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // 1. Send data to our FastAPI backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/public/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save to database');
      }



      setSubmitStatus('success');
      localStorage.setItem('lastContactFormSubmit', Date.now().toString());
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        botField: '',
      });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 relative flex items-center overflow-hidden">
      {/* Background matching the current website */}
      <div className="absolute inset-0 z-0 dark:hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-200/50 via-purple-100/50 to-pink-100/50" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

          {/* LEFT COLUMN: Headline & Metrics */}
          <div className="w-full lg:w-3/5 text-foreground">
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-semibold tracking-tight mb-10 leading-tight">
              Voice-Powered AI Avatar<br className="hidden md:block" />
              Built to Engage, <br className="hidden md:block" />
              Qualify, and Convert
            </h1>

            {/* 2x2 Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-2xl">
              {/* Card 1 */}
              <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center transition hover:shadow-2xl">
                <div className="text-3xl md:text-4xl font-semibold mb-1 text-primary">750K+</div>
                <div className="text-sm md:text-base text-muted-foreground font-medium">Daily Calls</div>
              </div>

              {/* Card 2 */}
              <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center transition hover:shadow-2xl">
                <div className="text-3xl md:text-4xl font-semibold mb-1 flex items-center gap-1 text-primary">
                  90% <ArrowUp className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-sm md:text-base text-muted-foreground font-medium">Lead Connectivity</div>
              </div>

              {/* Card 3 */}
              <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center transition hover:shadow-2xl">
                <div className="text-3xl md:text-4xl font-semibold mb-1 flex items-center gap-1 text-primary">
                  4x <ArrowUp className="w-5 h-5 text-green-500 rotate-[180deg]" />
                </div>
                <div className="text-sm md:text-base text-muted-foreground font-medium">Lower CAC</div>
              </div>

              {/* Card 4 */}
              <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center transition hover:shadow-2xl">
                <div className="text-2xl md:text-3xl font-semibold mb-1 text-primary">Turing</div>
                <div className="text-sm md:text-base text-muted-foreground font-medium">Validated Voice AI</div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Form Container */}
          <div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
            {/* Reduced max-width to make form smaller */}
            <div className="w-full max-w-md bg-background/95 dark:bg-card/95 backdrop-blur-xl rounded-[2rem] p-8 shadow-2xl border border-white/50 dark:border-white/10">
              <h2 className="text-2xl font-semibold text-center text-foreground mb-8">
                Schedule a Demo
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field (hidden from real users) */}
                <input
                  type="text"
                  name="botField"
                  value={formData.botField}
                  onChange={handleChange}
                  className="absolute w-0 h-0 opacity-0 -z-10"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Name Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                      First Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                      placeholder="John"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                      Last Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                      placeholder="Doe"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Email Row */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                    Work email<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                    placeholder="john@example.com"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Phone Row */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                    Phone Number<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                    placeholder="+91 9124800007"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Message Row */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                    How can we help?<span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground resize-none focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                    placeholder="Tell us about your use case..."
                    disabled={isSubmitting}
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-600 dark:text-green-400 text-sm text-center">
                    Thank you! We've received your message.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600 dark:text-red-400 text-sm text-center">
                    Something went wrong. Please try again.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 mt-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Book a Demo'}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}