import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Edit3, Loader2, CheckCircle2, Clock, Send } from "lucide-react";

interface DataCollectionModalProps {
  data: Record<string, string | number | null>;
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  title?: string;
  confirmed?: boolean;
  /** When true, render editable inputs + a Submit button (lead-collection mode). */
  editable?: boolean;
  /** Called with the collected lead data when the user clicks Submit. */
  onSubmit?: (data: Record<string, string>) => void;
}

// Fields shown in editable (lead-collection) mode. Maps the underlying data key
// to the label shown to the user.
const LEAD_FIELDS: { key: string; label: string; type: string; placeholder: string }[] = [
  { key: "name", label: "Name", type: "text", placeholder: "Your full name" },
  { key: "phone", label: "Contact Number", type: "tel", placeholder: "Your contact number" },
  { key: "email", label: "Email", type: "email", placeholder: "you@example.com" },
];

export default function DataCollectionModal({
  data,
  isOpen,
  isLoading = false,
  onClose,
  title = "Verifying Your Information",
  confirmed = false,
  editable = false,
  onSubmit,
}: DataCollectionModalProps) {
  const [displayData, setDisplayData] = useState<Record<string, string>>({});
  const [updatedFields, setUpdatedFields] = useState<Set<string>>(new Set());

  // Editable-mode form state + which fields the user has manually touched
  // (so incoming voice-filled values don't overwrite what the user typed).
  const [form, setForm] = useState<Record<string, string>>({ name: "", phone: "", email: "" });
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen && data) {
      const newData: Record<string, string> = {};
      const changed = new Set<string>();

      Object.entries(data || {}).forEach(([k, v]) => {
        const newVal = v?.toString() ?? "";
        // Track which fields changed for animation
        if (displayData[k] !== undefined && displayData[k] !== newVal) {
          changed.add(k);
        }
        newData[k] = newVal;
      });

      setDisplayData(newData);

      if (changed.size > 0) {
        setUpdatedFields(changed);
        // Clear highlight after animation
        const timer = setTimeout(() => setUpdatedFields(new Set()), 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [data, isOpen]);

  // In editable mode, merge incoming (voice-filled) values into the form for any
  // field the user hasn't manually edited yet.
  useEffect(() => {
    if (!editable || !isOpen) return;
    setForm((prev) => {
      const next = { ...prev };
      LEAD_FIELDS.forEach(({ key }) => {
        if (!touched.has(key)) {
          const incoming = data?.[key];
          if (incoming !== undefined && incoming !== null) next[key] = incoming.toString();
        }
      });
      return next;
    });
  }, [data, editable, isOpen, touched]);

  if (!isOpen) return null;

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setTouched((prev) => new Set(prev).add(key));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name?.trim()) e.name = "Name is required";
    const phoneDigits = (form.phone || "").replace(/\D/g, "");
    if (phoneDigits.length < 7) e.phone = "Enter a valid contact number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email || "")) e.email = "Enter a valid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit?.({
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
    });
  };

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* GLASS CONTAINER */}
      <div
        className="
          relative flex flex-col
          w-full max-w-md max-h-[85vh]
          rounded-3xl
          bg-white/80 dark:bg-black/80
          backdrop-blur-xl
          ring-1 ring-violet-300/60 dark:ring-white/10
          shadow-[0_0_60px_rgba(124,77,255,0.25)]
          overflow-hidden
          animate-in fade-in zoom-in-95 duration-200
        "
      >
        {/* DECORATIVE TOP GLOW */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-violet-500/50 blur-[4px]" />

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-violet-200/50 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${
              confirmed
                ? 'bg-emerald-100/50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                : 'bg-violet-100/50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400'
            }`}>
              {confirmed ? <CheckCircle2 className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
            </div>
            <h3 className="text-lg font-bold text-foreground tracking-tight">
              {confirmed ? "Information Confirmed" : title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-muted-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-auto p-6 custom-scrollbar">
          {isLoading ? (
            <div className="flex flex-col h-40 items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
              <p className="text-sm text-muted-foreground">Preparing fields...</p>
            </div>
          ) : editable ? (
            /* EDITABLE LEAD-COLLECTION FORM (manual entry + submit) */
            <div className="space-y-4">
              {LEAD_FIELDS.map(({ key, label, type, placeholder }) => (
                <div key={key} className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-violet-600/70 dark:text-violet-400/70">
                    {label}
                  </label>
                  <input
                    type={type}
                    value={form[key] ?? ""}
                    placeholder={placeholder}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className={`w-full rounded-xl px-3 py-2 text-sm bg-violet-50/40 dark:bg-white/5 border outline-none transition-colors focus:ring-2 focus:ring-violet-400/50 text-foreground ${
                      errors[key]
                        ? 'border-red-400/70'
                        : 'border-violet-200/50 dark:border-white/10'
                    }`}
                  />
                  {errors[key] && (
                    <span className="text-[11px] text-red-500">{errors[key]}</span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(displayData).map(([label, value]) => (
                <div
                  key={label}
                  className={`flex flex-col gap-1.5 p-3 rounded-xl transition-all duration-500 ${
                    updatedFields.has(label)
                      ? 'bg-violet-100/60 dark:bg-violet-900/20 ring-2 ring-violet-400/50'
                      : 'bg-violet-50/30 dark:bg-white/5'
                  }`}
                >
                  <label className="text-[10px] font-bold uppercase tracking-widest text-violet-600/70 dark:text-violet-400/70">
                    {label.replace(/_/g, " ")}
                  </label>
                  <p className="text-sm font-medium text-foreground min-h-[1.5rem]">
                    {value || <span className="text-muted-foreground/50 italic">Waiting...</span>}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t border-violet-100 dark:border-white/5">
          {editable ? (
            <button
              onClick={handleSubmit}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold py-2.5 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Submit</span>
            </button>
          ) : (
            <div className={`flex items-center gap-2 text-xs font-medium transition-all duration-500 ${
              confirmed
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-muted-foreground'
            }`}>
              {confirmed ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirmed & saved successfully</span>
                </>
              ) : (
                <>
                  <Clock className="w-4 h-4 animate-pulse" />
                  <span>Waiting for verbal confirmation...</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
