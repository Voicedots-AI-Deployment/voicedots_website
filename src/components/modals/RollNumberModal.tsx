import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Search, Loader2 } from "lucide-react";

interface RollNumberModalProps {
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onSubmit: (rollNo: string) => void;
  kind?: "fee" | "marks";
}

export default function RollNumberModal({
  isOpen,
  isLoading = false,
  onClose,
  onSubmit,
  kind = "fee",
}: RollNumberModalProps) {
  const isMarks = kind === "marks";
  const actionLabel = isMarks ? "Get Marks" : "Get Fee Details";
  const fieldLabel = isMarks ? "Register Number" : "Roll Number";
  const placeholder = isMarks ? "e.g. SP23EEU194" : "e.g. 24EGEEUS0277";
  const [rollNo, setRollNo] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setRollNo("");
      setError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const submit = () => {
    if (!rollNo.trim()) {
      setError(`Please enter the ${fieldLabel.toLowerCase()}`);
      return;
    }
    onSubmit(rollNo.trim());
  };

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative flex flex-col w-full max-w-md rounded-3xl bg-white/80 dark:bg-black/80 backdrop-blur-xl ring-1 ring-violet-300/60 dark:ring-white/10 shadow-[0_0_60px_rgba(124,77,255,0.25)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-violet-500/50 blur-[4px]" />

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-violet-200/50 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-violet-100/50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground tracking-tight">Student {fieldLabel}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-muted-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6">
          <label className="text-[10px] font-bold uppercase tracking-widest text-violet-600/70 dark:text-violet-400/70">
            {fieldLabel}
          </label>
          <input
            autoFocus
            type="text"
            value={rollNo}
            placeholder={placeholder}
            onChange={(e) => {
              setRollNo(e.target.value);
              if (error) setError("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
            }}
            className={`mt-1.5 w-full rounded-xl px-3 py-2 text-sm bg-violet-50/40 dark:bg-white/5 border outline-none transition-colors focus:ring-2 focus:ring-violet-400/50 text-foreground ${
              error ? "border-red-400/70" : "border-violet-200/50 dark:border-white/10"
            }`}
          />
          {error && <span className="text-[11px] text-red-500">{error}</span>}
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t border-violet-100 dark:border-white/5">
          <button
            onClick={submit}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white text-sm font-semibold py-2.5 transition-colors"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            <span>{isLoading ? "Fetching…" : actionLabel}</span>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
