import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Lock, Phone, Key, ArrowRight, Loader2 } from "lucide-react";

const STUDENT_API = import.meta.env.VITE_STUDENT_DEMO_API_URL || "https://voice.voicedots.io/student-demo/v1";

export type VerifiedSession = {
  sessionToken: string;
  expiresAt: number;
  students: { student_name: string; guardian_name: string; roll_number: string;
              registration_number: string }[];
};

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  // Called with a session when the registered number was verified, and with
  // nothing when the visitor chose to continue by typing a roll number.
  onSuccess: (session?: VerifiedSession) => void;
  onFailure: () => void;
};

export function LoginModal({ isOpen, onClose, onSuccess, onFailure }: LoginModalProps) {
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [demoCode, setDemoCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep("phone"); setPhone(""); setCode("");
      setDemoCode(null); setError(null); setNotice(null); setIsLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const requestCode = async () => {
    if (phone.replace(/\D/g, "").length < 10) {
      setError("Enter the 10-digit registered mobile number");
      return;
    }
    setIsLoading(true); setError(null); setNotice(null);
    try {
      const res = await fetch(`${STUDENT_API}/verify/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phone.trim() }),
      });
      const data = await res.json();
      if (data.status === "sent") {
        setDemoCode(data.demo_code ?? null);
        setStep("code");
        setNotice(`Code sent to ${data.phone_masked}`);
      } else if (data.status === "not_registered") {
        // Not an error: the visitor simply isn't linked to a student. Let them
        // through to the roll-number route rather than dead-ending them.
        setNotice("This number isn't registered. You can continue with the student's roll number instead.");
      } else {
        setError("Could not send the code. Please try again.");
      }
    } catch {
      setError("Could not reach the verification service.");
    } finally {
      setIsLoading(false);
    }
  };

  const confirmCode = async () => {
    if (!code.trim()) { setError("Enter the code"); return; }
    setIsLoading(true); setError(null);
    try {
      const res = await fetch(`${STUDENT_API}/verify/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phone.trim(), code: code.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.status === "verified") {
        onSuccess({ sessionToken: data.session_token, students: data.students,
          expiresAt: Date.now() + Math.min(1800, Number(data.expires_in) || 1800) * 1000 });
        onClose();
        return;
      }
      const detail = data?.detail ?? data;
      setError(
        detail?.status === "invalid_code"
          ? `Incorrect code. ${detail.attempts_left ?? 0} attempt(s) left.`
          : detail?.status === "expired" ? "That code has expired. Request a new one."
          : detail?.status === "too_many_attempts" ? "Too many attempts. Request a new code."
          : "Verification failed. Please try again.");
      setIsLoading(false);
    } catch {
      setError("Could not reach the verification service.");
      setIsLoading(false);
    }
  };

  const continueWithRollNumber = () => { onSuccess(); onClose(); };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") (step === "phone" ? requestCode() : confirmCode());
  };

  const closeModel = () => { onFailure(); onClose(); };

  const inputClass = `
    w-full h-11 pl-10 pr-4 rounded-xl bg-secondary/50 border-transparent
    focus:bg-background focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500
    transition-all outline-none text-sm
  `;

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={closeModel} />

      <div className="relative w-full max-w-sm rounded-3xl bg-white/80 dark:bg-black/80 backdrop-blur-xl ring-1 ring-violet-300/60 dark:ring-white/10 shadow-[0_0_60px_rgba(124,77,255,0.25)] p-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-violet-500/50 blur-[4px]" />

        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="mx-auto w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mb-4 text-violet-600 dark:text-violet-400">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            {step === "phone" ? "Verify Your Number" : "Enter the Code"}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {step === "phone"
              ? "Use the mobile number registered with the college."
              : "We sent a 6-digit code to your registered number."}
          </p>
        </div>

        <div className="space-y-4">
          {step === "phone" ? (
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-violet-500 transition-colors">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                inputMode="numeric"
                placeholder="Registered mobile number"
                className={inputClass}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            </div>
          ) : (
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-violet-500 transition-colors">
                <Key className="w-4 h-4" />
              </div>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="6-digit code"
                className={`${inputClass} tracking-[0.4em] font-semibold`}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            </div>
          )}

          {demoCode && step === "code" && (
            <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-600 text-xs text-center font-medium">
              Demo mode — your code is <span className="font-bold tracking-widest">{demoCode}</span>
            </div>
          )}

          {notice && (
            <div className="p-3 rounded-lg bg-secondary/60 text-muted-foreground text-xs text-center font-medium">
              {notice}
            </div>
          )}

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-xs text-center font-medium animate-in fade-in slide-in-from-top-1">
              {error}
            </div>
          )}

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={step === "phone" ? requestCode : confirmCode}
              disabled={isLoading}
              className="
                w-full h-11 rounded-full bg-violet-600 text-white font-medium text-sm
                hover:bg-violet-700 hover:shadow-[0_0_20px_rgba(124,77,255,0.4)]
                active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none
                transition-all duration-200 flex items-center justify-center gap-2
              "
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {step === "phone" ? "Sending..." : "Verifying..."}
                </>
              ) : (
                <>
                  {step === "phone" ? "Send Code" : "Verify"} <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {step === "code" && (
              <button
                onClick={() => { setStep("phone"); setCode(""); setError(null); setDemoCode(null); }}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Use a different number
              </button>
            )}

            <button
              onClick={continueWithRollNumber}
              className="text-xs text-violet-600 hover:text-violet-700 font-medium transition-colors"
            >
              Continue with roll number instead
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
