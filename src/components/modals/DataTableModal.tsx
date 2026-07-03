import { useState } from "react";
import { createPortal } from "react-dom";
import * as XLSX from "xlsx";
import { X, Download, Table as TableIcon, Loader2, FileSpreadsheet, Database } from "lucide-react";

interface DataTableModalProps {
  data: Record<string, unknown>[];
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  title?: string;
  emptyMessage?: string;
}

export default function DataTableModal({
  data,
  isOpen,
  isLoading = false,
  onClose,
  title = "Data Records",
  emptyMessage = "",
}: DataTableModalProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const columns = data.length ? Object.keys(data[0]) : [];

  const handleDownload = async () => {
    if (!data || data.length === 0) return;
    setIsDownloading(true);
    
    // Simulate a slight delay for the UI animation
    await new Promise(r => setTimeout(r, 800));

    try {
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      const filename = `${title.replace(/\s+/g, "_").toLowerCase()}.xlsx`;
      XLSX.writeFile(wb, filename);
    } catch (err) {
      console.error("Export failed", err);
    } finally {
      setIsDownloading(false);
    }
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
          relative 
          flex flex-col 
          w-full max-w-4xl h-[600px] max-h-[90vh]
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-violet-500/50 blur-[4px] z-10" />

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-violet-200/50 dark:border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-violet-100/50 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground tracking-tight">{title}</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                {!isLoading ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {data.length} records found
                  </>
                ) : (
                  "Syncing..."
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isLoading && data.length > 0 && (
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="
                  group
                  h-9 px-4 rounded-full 
                  bg-violet-50 text-violet-700 
                  border border-violet-200/60
                  hover:bg-violet-100 hover:border-violet-300
                  transition-all active:scale-95
                  flex items-center gap-2 text-xs font-semibold
                  disabled:opacity-50 disabled:pointer-events-none
                "
              >
                {isDownloading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Download className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
                )}
                {isDownloading ? "Exporting..." : "Export CSV"}
              </button>
            )}
            
            <button 
              onClick={onClose} 
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-muted-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-hidden relative flex flex-col">
          {isLoading ? (
            // LOADING STATE
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
              <Loader2 className="h-10 w-10 animate-spin text-violet-600 mb-3" />
              <p className="text-sm font-medium text-foreground">Fetching records...</p>
            </div>
          ) : data.length === 0 ? (
            // EMPTY STATE
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <div className="w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center mb-4">
                <FileSpreadsheet className="w-8 h-8 opacity-40" />
              </div>
              <p className="text-sm font-medium">No data available</p>
              <p className="text-xs opacity-60 max-w-xs text-center px-4">{emptyMessage || "There are no records to display at this time."}</p>
            </div>
          ) : (
            // TABLE STATE
            <div className="flex-1 overflow-auto custom-scrollbar">
              <table className="min-w-full text-sm text-left">
                <thead className="sticky top-0 z-10">
                  {/* Glass header for the table itself */}
                  <tr className="bg-white/70 dark:bg-black/70 backdrop-blur-md shadow-sm">
                    {columns.map((c) => (
                      <th 
                        key={c} 
                        className="
                          px-6 py-3 
                          font-semibold text-xs uppercase tracking-wider 
                          text-violet-900/70 dark:text-violet-200/70
                          whitespace-nowrap
                          border-b border-violet-100 dark:border-white/5
                        "
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-violet-100/50 dark:divide-white/5">
                  {data.map((row, i) => (
                    <tr 
                      key={i} 
                      className="
                        group
                        hover:bg-violet-50/40 dark:hover:bg-white/5 
                        transition-colors duration-150
                      "
                    >
                      {columns.map((c) => (
                        <td key={c} className="px-6 py-3 text-foreground/80 whitespace-nowrap">
                          {/* Handle generic object rendering safely */}
                          {typeof row[c] === 'object' && row[c] !== null 
                            ? JSON.stringify(row[c]) 
                            : String(row[c] ?? "-")
                          }
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        {/* FOOTER / STATUS BAR */}
        <div className="bg-violet-50/30 dark:bg-white/5 px-6 py-2 border-t border-violet-100/50 dark:border-white/5 flex justify-between items-center text-[10px] text-muted-foreground">
            <div className="flex items-center gap-1">
                <TableIcon className="w-3 h-3" />
                <span>Read-only view</span>
            </div>
        </div>

      </div>
    </div>,
    document.body
  );
}