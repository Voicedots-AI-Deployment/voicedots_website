import { SecureDataAccessSection } from '@/components/SecureDataAccessSection';
import { GlobalMeshBackground } from '@/components/GlobalMeshBackground';

export function SecureDataPage() {
    return (
        <div className="min-h-screen pt-24 pb-12 relative overflow-x-hidden bg-background">
            {/* Background Mesh */}
            <div className="absolute inset-0 z-0 dark:hidden opacity-60">
                <GlobalMeshBackground />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4">
                {/* We use the newly built visual section here as the primary content of the page */}
                <SecureDataAccessSection />
            </div>
        </div>
    );
}
