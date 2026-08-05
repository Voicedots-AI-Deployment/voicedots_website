import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export function FuturisticVoiceDotsSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            setMousePos({ x, y });
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('mousemove', handleMouseMove);
            container.addEventListener('mouseenter', () => setIsHovering(true));
            container.addEventListener('mouseleave', () => setIsHovering(false));
        }

        return () => {
            if (container) {
                container.removeEventListener('mousemove', handleMouseMove);
                container.removeEventListener('mouseenter', () => setIsHovering(true));
                container.removeEventListener('mouseleave', () => setIsHovering(false));
            }
        };
    }, []);

    const maskX = isHovering ? mousePos.x : '50%';
    const maskY = isHovering ? mousePos.y : '50%';
    const maskSize = isHovering ? '300px' : '0px';

    // The CSS variable defining the dot/dash matrix mask
    // We use crossing repeating linear gradients to create a grid of small dots/dashes
    const dotMatrixMask = `
        repeating-linear-gradient(0deg, transparent, transparent 2px, black 2px, black 4px),
        repeating-linear-gradient(90deg, transparent, transparent 2px, black 2px, black 4px)
    `;

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-background cursor-crosshair border-t border-border/40"
        >
            {/* 1. Base Dim Dotted Text (Always visible, very faint) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <h2
                    className="text-[12vw] font-black leading-none tracking-tighter"
                    style={{
                        color: 'hsl(var(--foreground))',
                        opacity: 0.04, // Very dim base color that works on both dark and light modes
                        // Apply the dotted mask
                        WebkitMaskImage: dotMatrixMask,
                        maskImage: dotMatrixMask,
                        WebkitMaskComposite: 'source-in', // Intersect the two linear gradients to make dots
                        maskComposite: 'intersect',
                    }}
                >
                    VOICEDOTS
                </h2>
            </div>

            {/* 2. The Bright Spotlight Dotted Text Layer */}
            <motion.div
                className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none select-none"
                animate={{
                    // We combine the dot matrix with the radial spotlight using multiple masks
                    WebkitMaskImage: `
                        radial-gradient(circle ${maskSize} at ${maskX}px ${maskY}px, black 10%, transparent 80%),
                        repeating-linear-gradient(0deg, transparent, transparent 2px, black 2px, black 4px),
                        repeating-linear-gradient(90deg, transparent, transparent 2px, black 2px, black 4px)
                    `,
                    WebkitMaskComposite: 'source-in, source-in', // Make sure the spotlight *and* the dots intersect
                } as any}
                transition={{ type: "tween", ease: "circOut", duration: 0.15 }}
            >
                <h2
                    className="text-[12vw] font-black leading-none tracking-tighter"
                    style={{
                        // Bright, animated gradient color fill
                        backgroundImage: 'linear-gradient(90deg, #a78bfa 0%, #8b5cf6 33%, #a855f7 66%, #7c3aed 100%)',
                        backgroundSize: '200% auto',
                        color: 'transparent',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        animation: 'gradientMove 8s ease-in-out infinite alternate',
                        // Subtle glow around the illuminated dots
                        filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.6))'
                    }}
                >
                    VOICEDOTS
                </h2>
            </motion.div>

            <style>{`
                @keyframes gradientMove {
                  0% { background-position: 0% center; }
                  100% { background-position: 200% center; }
                }
            `}</style>
        </section>
    );
}
