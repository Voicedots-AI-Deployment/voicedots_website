import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { GlobalMeshBackground } from '@/components/GlobalMeshBackground';

interface Blog {
    id: string;
    title: string;
    slug: string;
    content: string;
    feature_image_url: string;
    published: boolean;
    created_at: string;
}

export function BlogPostPage() {
    const { slug } = useParams<{ slug: string }>();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchBlog() {
            if (!slug) return;

            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/public/blogs/${slug}`);
                if (!response.ok) {
                    throw new Error('Blog not found.');
                }
                const data = await response.json();
                setBlog(data as Blog);
            } catch (err: any) {
                console.error('Error fetching blog:', err);
                setError('Blog not found.');
            } finally {
                setLoading(false);
            }
        }

        fetchBlog();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="min-h-screen pt-32 pb-20 px-4 flex flex-col items-center justify-center text-center">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-xl text-muted-foreground mb-8">Blog not found</p>
                <Link to="/blogs" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
                    <ArrowLeft className="w-5 h-5" />
                    Back to Blogs
                </Link>
            </div>
        );
    }

    const formattedDate = new Date(blog.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <article
            className="min-h-screen pt-32 pb-20 px-4 relative overflow-hidden"
            style={{ backgroundImage: 'var(--page-gradient)', fontFamily: '"Inter", sans-serif' }}
        >
            {/* Global Voice Gradient Background (Light mode only) */}
            <div className="absolute inset-0 z-0 dark:hidden pointer-events-none">
                <GlobalMeshBackground />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                <Link to="/blogs" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium mb-8 bg-background/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50 hover:border-primary/30 hover:shadow-sm w-fit">
                    <ArrowLeft className="w-4 h-4" />
                    Back to all articles
                </Link>

                <div className="glass-card rounded-[2.5rem] p-6 md:p-12 lg:p-16 relative overflow-hidden">
                    {/* Decorative Top Gradient */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary/80 via-purple-500/80 to-primary/80"></div>

                    <div className="mb-12 text-center">
                        <div className="inline-flex items-center gap-2 text-sm md:text-base text-primary font-medium mb-6 bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
                            <Calendar className="w-4 h-4" />
                            <time dateTime={blog.created_at}>{formattedDate}</time>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-10 leading-tight">
                            {blog.title}
                        </h1>
                        {blog.feature_image_url && (
                            <div className="w-full aspect-video rounded-3xl overflow-hidden mb-12 border border-border/50 shadow-2xl relative group">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                                <img
                                    src={blog.feature_image_url}
                                    alt={blog.title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                                />
                            </div>
                        )}
                    </div>
                    <div
                        className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-2xl prose-img:shadow-lg prose-p:text-muted-foreground prose-p:leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </div>
            </div>
        </article>
    );
}
