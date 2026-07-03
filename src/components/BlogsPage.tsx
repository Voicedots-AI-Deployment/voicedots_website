import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  feature_image_url: string;
  published: boolean;
  created_at: string;
}

export function BlogsSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/public/blogs`);
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        setBlogs(data as Blog[]);
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  const [featured, ...rest] = blogs;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const getExcerpt = (content: string) => {
    const text = stripHtml(content);
    return text.length > 120 ? text.substring(0, 120) + '...' : text;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <section className="py-32 px-4 relative overflow-hidden bg-background min-h-screen">
      {/* Deep Context Glows */}
      <div className="absolute top-0 right-1/4 w-[40rem] h-[40rem] bg-primary/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[40rem] h-[40rem] bg-violet-600/10 dark:bg-violet-900/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-sm font-bold tracking-widest uppercase mb-3 text-primary">
            Our Blog
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 tracking-tight">
            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Insights</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our latest thinking on AI, voice technology, and the future of customer experience.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center text-muted-foreground py-20">
            No articles found. Check back later.
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {featured && (
              <motion.div variants={itemVariants}>
                <InteractiveCard featured>
                  <div className="flex items-center justify-between mb-8">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">Technology</span>
                    <span className="text-muted-foreground text-sm font-medium">
                      {formatDate(featured.created_at)}
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
                    {featured.title}
                  </h2>

                  <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mb-8 leading-relaxed">
                    {getExcerpt(featured.content)}
                  </p>

                  <CTA to={`/blogs/${featured.slug}`} />
                </InteractiveCard>
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-6 lg:mt-8">
              {rest.map((blog, index) => (
                <motion.div variants={itemVariants} key={blog.id || index}>
                  <InteractiveCard>
                    <div className="flex items-center justify-between mb-6">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">Technology</span>
                      <span className="text-muted-foreground text-sm font-medium">
                        {formatDate(blog.created_at)}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold mb-4 text-foreground line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-muted-foreground text-base mb-8 leading-relaxed line-clamp-3">
                      {getExcerpt(blog.content)}
                    </p>

                    <CTA to={`/blogs/${blog.slug}`} small />
                  </InteractiveCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function InteractiveCard({
  children,
  featured = false,
}: {
  children: React.ReactNode;
  featured?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    el.style.setProperty('--x', `${x}px`);
    el.style.setProperty('--y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`
        group relative overflow-hidden
        rounded-[2.5rem]
        glass-card bg-background/40 backdrop-blur-2xl border-white/20 dark:border-white/5
        transition-all duration-500
        ${featured ? 'hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(124,58,237,0.25)] p-10 md:p-14 lg:p-16' : 'hover:-translate-y-1 hover:shadow-[0_15px_40px_-10px_rgba(124,58,237,0.2)] p-8 md:p-10'}
      `}
      style={{
        background:
          'radial-gradient(800px circle at var(--x) var(--y), rgba(124,58,237,0.08), transparent 40%)',
      }}
    >
      {/* Top border highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-primary to-purple-400 group-hover:w-1/2 transition-all duration-500 rounded-b-full opacity-0 group-hover:opacity-100" />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

function CTA({ small, to }: { small?: boolean; to: string }) {
  return (
    <Link to={to} className={`inline-flex items-center gap-2 text-primary font-bold group cursor-pointer ${small ? 'text-base' : 'text-lg'}`}>
      <span className="relative overflow-hidden flex items-center gap-2">
        Read Article
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" strokeWidth={2.5} />
        {/* Animated Underline */}
        <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primary/20 rounded-full" />
        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary rounded-full group-hover:w-full transition-all duration-300" />
      </span>
    </Link>
  );
}
