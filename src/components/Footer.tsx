import { Link } from 'react-router-dom';
import { ArrowRight, Instagram, Linkedin, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative pt-32 pb-8 overflow-hidden">
      {/* Rich gradient background mimicking reference image */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-200 via-purple-100 to-pink-100 dark:from-violet-950 dark:via-purple-900/40 dark:to-background pointer-events-none -z-10" />

      {/* Floating particles/blur effect optional */}
      <div className="absolute top-0 right-1/4 w-[40rem] h-[40rem] bg-white/20 dark:bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="relative max-w-[1400px] mx-auto px-4 md:px-8">

        {/* TOP SECTION: Headline (Outside the Card) */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground/90 max-w-4xl mx-auto leading-tight mb-4">
            Voicedots is not just a voicebot.
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium">
            It is your website's smartest voice — listening, guiding, and converting <span className="text-primary font-semibold">24/7</span>.
          </p>
        </div>

        {/* FLOATING CARD */}
        <div className="bg-background/95 dark:bg-card/95 backdrop-blur-xl rounded-[2rem] shadow-2xl shadow-primary/10 border border-white/50 dark:border-white/10 p-8 md:p-12 lg:p-16 mb-8">

          <div className="flex flex-col xl:flex-row justify-between gap-16 xl:gap-8 mb-16">

            {/* Left side: Logo */}
            <div className="xl:w-1/4">
              <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                <h1
                  className="
                    text-2xl font-semibold tracking-tighter pr-[0.05em]
                    text-transparent bg-clip-text
                    bg-gradient-to-b
                    from-foreground to-foreground/60
                  "
                >
                  <img
                    src="/voicedotslogo.svg"
                    alt="V"
                    className="h-[1.2em] w-auto inline-block align-middle -translate-y-[0.13em] mr-[-0.34em]"
                  />oiceDots
                </h1>
              </Link>
              <div className="text-muted-foreground text-sm font-medium">#1 AI Avatar Voicebot Company</div>
            </div>

            {/* Middle: 4 Columns of Links Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 xl:gap-12 xl:w-2/4">

              {/* Column 1 */}
              <div className="flex flex-col gap-3 text-sm">
                <h3 className="font-semibold text-foreground tracking-wider uppercase mb-1">Navigation</h3>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
                <Link to="/try-now" className="text-muted-foreground hover:text-primary transition-colors">Try Now</Link>
                <Link to="/try-on-website" className="text-muted-foreground hover:text-primary transition-colors">Try on Website</Link>
                <Link to="/plans" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
              </div>

              {/* Column 2 */}
              <div className="flex flex-col gap-3 text-sm">
                <h3 className="font-semibold text-foreground tracking-wider uppercase mb-1">Capabilities</h3>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Inbound Calls</Link>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Outbound Campaigns</Link>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Lead Qualification</Link>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">24/7 Support</Link>
              </div>

              {/* Column 3 */}
              <div className="flex flex-col gap-3 text-sm">
                <h3 className="font-semibold text-foreground tracking-wider uppercase mb-1">Company</h3>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link>
                <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
                {/* <Link to="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  We are hiring! <span className="text-lg"></span>
                </Link> */}
              </div>

              {/* Column 4 */}
              <div className="flex flex-col gap-3 text-sm">
                <h3 className="font-semibold text-foreground tracking-wider uppercase mb-1">Connect</h3>
                <a href="https://x.com/Voicedotsio" className="text-muted-foreground hover:text-primary transition-colors">Twitter (X)</a>
                <a href="https://www.instagram.com/voicedotsio" className="text-muted-foreground hover:text-primary transition-colors">Instagram</a>
                <a href="https://www.facebook.com/voicedotsio" className="text-muted-foreground hover:text-primary transition-colors">Facebook</a>
                <a href="https://www.linkedin.com/company/voicedotsio" className="text-muted-foreground hover:text-primary transition-colors">LinkedIn</a>
                <a href="https://www.youtube.com/@Voicedotsio" className="text-muted-foreground hover:text-primary transition-colors">YouTube</a>
                {/* <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Discord</a> */}
              </div>

            </div>

            {/* Right side: Locations & Contact */}
            <div className="xl:w-1/4 flex flex-col items-start xl:items-end text-left xl:text-right gap-3 text-sm">
              <h3 className="font-semibold text-foreground tracking-wider uppercase mb-1">Locations</h3>
              <div className="text-muted-foreground leading-relaxed">
                3/17, Grand Southern Trunk Rd,
                <br />
                Ramapuram, Alandur, Chennai,
                <br />
                Tamil Nadu 600016
              </div>
              <div className="text-muted-foreground leading-relaxed mt-2">
                <span className="block mb-1 font-medium text-foreground">Contact</span>
                <a href="mailto:info@voicedots.io" className="hover:text-primary transition-colors block">
                  info@voicedots.io
                </a>
                <a href="tel:+919176477222" className="hover:text-primary transition-colors block mt-1">
                  +91 9176477222
                </a>
              </div>
            </div>
          </div>

          {/* Bottom of Floating Card: Socials */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-border/50">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 font-medium rounded-full transition-colors text-sm shadow-lg shadow-primary/20"
            >
              Book a Demo <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex gap-4">
              <a href="https://www.youtube.com/@voicedotsio" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors group">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://x.com/Voicedotsio" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors group">
                {/* X Icon SVG */}
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/voicedotsio" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors group">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/voicedotsio" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors group">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION: Legal links outside the card (matches reference) */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground/80 px-4 md:px-8">
          <div>
            © 2026 VoiceDots.io. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <span className="hidden md:inline">•</span>
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
