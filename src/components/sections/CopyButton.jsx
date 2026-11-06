"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

// Copies text to the clipboard. Works even when no email app is installed.
export default function CopyButton({ text, label = "Copy email", className = "" }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch {}
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`inline-flex shrink-0 items-center gap-2 rounded-xl border border-line px-3.5 py-2.5 text-sm text-fg transition hover:border-accent/60 hover:bg-raised ${className}`}
    >
      {copied ? <Check className="h-4 w-4 text-accent" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
      <span aria-live="polite">{copied ? "Copied" : label}</span>
    </button>
  );
}
