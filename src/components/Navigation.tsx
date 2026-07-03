import { useState } from 'react';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { toggleTheme } from '@/utils/theme';

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', href: '/' },
    {
      name: 'Resources',
      dropdown: [
        { name: 'Generate embedding code', href: '/integrate' },
        { name: 'Secure Data Access', href: '/secure-data' },
        { name: 'Blogs', href: '/blogs' },
      ],
    },
    { name: 'Try on Website', href: '/try-on-website' },
    { name: 'Plans', href: '/plans' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isDropdownActive = (dropdownItems?: { href: string }[]) => {
    return dropdownItems?.some((item) => location.pathname === item.href) || false;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="max-w-6xl mx-auto">
        <div className="glass-card rounded-full px-6 py-3 flex items-center justify-between">
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
                className="h-[1.2em] w-auto inline-block align-middle -translate-y-[0.1em] mr-[-0.34em]"
              />oiceDots
            </h1>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative group"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.dropdown ? (
                  <button
                    className={`flex items-center gap-1 text-sm transition-colors py-2 ${isDropdownActive(link.dropdown)
                      ? 'text-primary font-medium'
                      : 'text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    {link.name}
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
                  </button>
                ) : (
                  <Link
                    to={link.href!}
                    className={`text-sm transition-colors py-2 block ${isActive(link.href!)
                      ? 'text-primary font-medium'
                      : 'text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    {link.name}
                  </Link>
                )}

                {/* Desktop Dropdown Menu */}
                {link.dropdown && activeDropdown === link.name && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="w-56 glass-card rounded-2xl p-2 flex flex-col gap-1 border border-border/50 shadow-xl bg-background/20 backdrop-blur-2xl">
                      {link.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className={`px-4 py-2.5 rounded-xl transition-colors text-sm ${isActive(subItem.href)
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                            }`}
                          onClick={() => setActiveDropdown(null)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center glass hover:bg-accent transition"
              aria-label="Toggle theme"
            >
              <Sun className="h-4 w-4 block dark:hidden" />
              <Moon className="h-4 w-4 hidden dark:block" />
            </button>

            <Link
              to="/try-now"
              className="hidden md:inline-flex text-sm font-medium bg-primary text-primary-foreground px-5 py-2 rounded-full transition-all hover:shadow-[0_0_20px_rgba(124,77,255,0.45)]"
            >
              Try Now
            </Link>

            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-20 left-4 right-4 glass-card bg-background/95 backdrop-blur-2xl rounded-2xl p-4 md:hidden flex flex-col gap-2 shadow-2xl animate-in fade-in slide-in-from-top-4">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.dropdown ? (
                  <div className="flex flex-col gap-1">
                    <button
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors text-left ${isDropdownActive(link.dropdown)
                        ? 'bg-accent/50 text-foreground font-medium'
                        : 'text-muted-foreground hover:bg-accent'
                        }`}
                      onClick={() =>
                        setActiveDropdown(activeDropdown === link.name ? null : link.name)
                      }
                    >
                      {link.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === link.name ? 'rotate-180' : ''
                          }`}
                      />
                    </button>
                    {activeDropdown === link.name && (
                      <div className="flex flex-col gap-1 pl-4 pr-2 pb-2 mr-2 animate-in slide-in-from-top-1">
                        {link.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className={`px-4 py-2.5 rounded-lg transition-colors text-sm ${isActive(subItem.href)
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                              }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={link.href!}
                    className={`px-4 py-3 rounded-lg block transition-colors ${isActive(link.href!)
                      ? 'bg-accent text-primary font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}

            <div className="h-px bg-border my-2" />

            <Link
              to="/try-now"
              className="w-full text-center font-medium bg-primary text-primary-foreground px-5 py-3 rounded-xl transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Try Now
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
