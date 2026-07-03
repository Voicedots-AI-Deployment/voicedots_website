import { useState } from "react";
import { createPortal } from "react-dom";
import { X, Send, User, Mail, Phone, Hash, Loader2 } from "lucide-react";

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: {
    studentId: string;
    name: string;
    email: string;
    mobile: string;
    category: string;
    subCategory: string;
    description: string;
    userId: string;
  };
  submit: (data: string) => void
}

export default function TicketModal({ isOpen, onClose, student, submit }: TicketModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const baseUrl = import.meta.env.VITE_BACKEND_API_URL || ""; 
    const endpoint = `${baseUrl}/v1/ticket/raise_ticket`;

    // Combine prop data with local form state
    const payload = {
      studentId: student.studentId,
      name: student.name,
      email: student.email,
      mobile: student.mobile,
      category: student.category,
      subCategory: student.subCategory,
      description: student.description,
      userId: student.userId
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        submit("Ticket raised successfully.");
        onClose();
      }
    } catch (err) {
      console.error("Submission failed", err);
      submit("Failed to issue ticket, try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const clickedClose = () => {
    submit("User cancelled the ticket raising request")
    onClose();
  }

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={clickedClose} />

      <div className="relative flex flex-col w-full max-w-lg bg-white dark:bg-zinc-950 rounded-3xl shadow-2xl overflow-hidden ring-1 ring-black/5">
        
        {/* HEADER */}
        <div className="px-6 py-5 border-b flex justify-between items-center bg-violet-50/50 dark:bg-zinc-900">
          <div>
            <h3 className="text-lg font-bold text-foreground">New Support Ticket</h3>
            <p className="text-xs text-muted-foreground italic">Assigning to: {student.name}</p>
          </div>
          <button onClick={clickedClose} className="p-2 hover:bg-black/5 rounded-full"><X className="w-5 h-5" /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* READ-ONLY STUDENT DISPLAY */}
          <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[13px]">
            <div className="flex items-center gap-2"><Hash className="w-3.5 h-3.5 text-violet-500" /> {student.studentId}</div>
            <div className="flex items-center gap-2"><User className="w-3.5 h-3.5 text-violet-500" /> {student.name}</div>
            <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-violet-500" /> {student.email}</div>
            <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-violet-500" /> {student.mobile}</div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={clickedClose} className="flex-1 h-11 rounded-xl border text-sm font-medium">Cancel</button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-[2] h-11 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              {isSubmitting ? "Processing..." : "Verify"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}