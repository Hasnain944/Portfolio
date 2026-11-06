"use client";
import { useState } from "react";
import { CircleAlert, CircleCheck, Mail, Send } from "lucide-react";
import { site } from "@/data/site";
import CopyButton from "./CopyButton";

const initial = { name: "", email: "", subject: "", message: "" };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Enter your name (at least 2 characters).";
  if (!emailPattern.test(v.email.trim())) e.email = "Enter a valid email address, like name@example.com.";
  if (v.subject.trim().length < 3) e.subject = "Add a short subject (at least 3 characters).";
  if (v.message.trim().length < 20) e.message = "Write a message of at least 20 characters.";
  return e;
}

export default function ContactForm() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState({ type: "idle", text: "" });
  const usesEndpoint = Boolean(site.formEndpoint);

  const update = (name) => (e) => {
    const next = { ...values, [name]: e.target.value };
    setValues(next);
    if (touched[name]) setErrors(validate(next));
  };
  const blur = (name) => () => {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validate(values));
  };

  async function onSubmit(e) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(found).length) {
      setStatus({ type: "error", text: "Please fix the highlighted fields and try again." });
      document.querySelector("[aria-invalid='true']")?.focus();
      return;
    }

    // Honeypot: real visitors never fill this hidden field.
    if (e.currentTarget.elements.company?.value) return;

    if (usesEndpoint) {
      setStatus({ type: "sending", text: "Sending your message…" });
      try {
        const res = await fetch(site.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(values),
        });
        if (!res.ok) throw new Error("Request failed");
        setValues(initial);
        setTouched({});
        setStatus({ type: "success", text: "Message sent. I will reply to the email address you provided." });
      } catch {
        setStatus({
          type: "error",
          text: `The message could not be sent. Please email ${site.email} directly.`,
        });
      }
      return;
    }

    // No backend configured: open the visitor's email app with the message filled in.
    const body = `${values.message.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`;
    const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}&su=${encodeURIComponent(values.subject.trim())}&body=${encodeURIComponent(body)}`;
    window.open(gmail, "_blank", "noopener,noreferrer");
    setStatus({
      type: "success",
      text: "Gmail should open in a new tab with your message ready to send. If it did not open (pop-up blocked), use one of the options below.",
      gmail,
    });
  }

  const field = (name, label, props = {}) => {
    const id = `contact-${name}`;
    const error = touched[name] && errors[name];
    const Tag = props.as || "input";
    return (
      <div>
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
          {label}
        </label>
        <Tag
          id={id}
          name={name}
          value={values[name]}
          onChange={update(name)}
          onBlur={blur(name)}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
          className="field"
          {...props}
          as={undefined}
        />
        {error && (
          <p id={`${id}-error`} className="mt-1.5 text-sm text-red-300">
            {errors[name]}
          </p>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5" aria-label="Contact form">
      <div className="grid gap-5 sm:grid-cols-2">
        {field("name", "Your name", { type: "text", autoComplete: "name", placeholder: "Jane Doe" })}
        {field("email", "Your email", { type: "email", autoComplete: "email", placeholder: "jane@company.com" })}
      </div>
      {field("subject", "Subject", { type: "text", placeholder: "Full Stack Developer role" })}
      {field("message", "Message", {
        as: "textarea",
        rows: 6,
        placeholder: "Tell me about the role or project.",
      })}

      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" className="btn-primary" disabled={status.type === "sending"}>
          <Send className="h-4 w-4" aria-hidden="true" />
          {usesEndpoint ? "Send message" : "Open in Gmail"}
        </button>
        <p className="text-xs text-muted">
          {usesEndpoint
            ? "Your message is sent straight to my inbox."
            : "This opens Gmail with the message filled in. Nothing is stored on this site."}
        </p>
      </div>

      <div role="status" aria-live="polite" className="min-h-[1.5rem]">
        {status.type === "success" && (
          <p className="flex items-start gap-2 text-sm text-accent">
            <CircleCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {status.text}
          </p>
        )}
        {status.type === "success" && status.gmail && (
          <div className="mt-3 flex flex-wrap gap-3">
            <a href={status.gmail} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-4 !py-2.5">
              <Mail className="h-4 w-4" aria-hidden="true" />
              Open in Gmail
            </a>
            <CopyButton text={site.email} label="Copy my email" />
          </div>
        )}
        {status.type === "error" && (
          <p className="flex items-start gap-2 text-sm text-red-300">
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {status.text}
          </p>
        )}
        {status.type === "sending" && <p className="text-sm text-muted">{status.text}</p>}
      </div>
    </form>
  );
}
