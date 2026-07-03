import { useState } from "react";
import { createPortal } from "react-dom";
import { Lock, User, Key, ArrowRight, Loader2 } from "lucide-react";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onFailure: () => void;
};

export function LoginModal({ isOpen, onClose, onSuccess, onFailure }: LoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);

    // 🔒 TEMP: hardcoded credentials
    // Simulating a small delay for UX so they see the loading state
    setTimeout(() => {
      const USERNAME = "admin";
      const PASSWORD = "Ind123Ind@";

      if (username === USERNAME && password === PASSWORD) {
        onSuccess();
        onClose();
      } else {
        setError("Invalid username or password");
        setIsLoading(false);
      }
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const closeModel = () => {
    onFailure();
    onClose();
  }

  // Render via Portal to ensure it sits on top of everything (like the widget)
  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={closeModel}
      />

      {/* CARD */}
      <div 
        className="
          relative w-full max-w-sm 
          rounded-3xl 
          bg-white/80 dark:bg-black/80 
          backdrop-blur-xl 
          ring-1 ring-violet-300/60 dark:ring-white/10
          shadow-[0_0_60px_rgba(124,77,255,0.25)]
          p-8
          overflow-hidden
        "
      >
        {/* DECORATIVE TOP GLOW */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-violet-500/50 blur-[4px]" />

        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="mx-auto w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mb-4 text-violet-600 dark:text-violet-400">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Welcome Back
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Please authenticate to access the demo.
          </p>
        </div>

        {/* FORM */}
        <div className="space-y-4">
          <div className="space-y-4">
            {/* USERNAME */}
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-violet-500 transition-colors">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Username"
                className="
                  w-full h-11 pl-10 pr-4 
                  rounded-xl 
                  bg-secondary/50 border-transparent 
                  focus:bg-background focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 
                  transition-all outline-none text-sm
                "
                value={username}
                onChange={e => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            </div>

            {/* PASSWORD */}
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-violet-500 transition-colors">
                <Key className="w-4 h-4" />
              </div>
              <input
                type="password"
                placeholder="Password"
                className="
                  w-full h-11 pl-10 pr-4 
                  rounded-xl 
                  bg-secondary/50 border-transparent 
                  focus:bg-background focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 
                  transition-all outline-none text-sm
                "
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-xs text-center font-medium animate-in fade-in slide-in-from-top-1">
              {error}
            </div>
          )}

          {/* ACTIONS */}
          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="
                w-full h-11 
                rounded-full 
                bg-violet-600 text-white font-medium text-sm
                hover:bg-violet-700 hover:shadow-[0_0_20px_rgba(124,77,255,0.4)]
                active:scale-[0.98]
                disabled:opacity-70 disabled:pointer-events-none
                transition-all duration-200
                flex items-center justify-center gap-2
              "
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Access Demo <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
            
            <button
              onClick={closeModel}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancel and go back
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}