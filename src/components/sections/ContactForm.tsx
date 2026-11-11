"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { LEAD_FLAG } from "@/app/thank-you/LeadEvent";
import { Loader2, CheckCircle, Send } from "lucide-react";
import { validateContactForm } from "@/lib/contact-validation";
import type { FormState } from "@/types";
import { CONTACT, MAILTO } from "@/lib/site";

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>({
    status: "idle",
    message: "",
    errors: {},
  });
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formState.status === "submitting") return;

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string,
      role: formData.get("role") as string,
      message: formData.get("message") as string,
      website: formData.get("website") as string,
    };

    const errors = validateContactForm(data);
    if (Object.keys(errors).length > 0) {
      setFormState({ status: "idle", message: "", errors });
      return;
    }

    setFormState({ status: "submitting", message: "", errors: {} });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // generate_lead fires on /thank-you, once per submission (no PII in the URL).
        // A filled honeypot is a bot: the server silently drops it, and it must not count as a lead.
        if (!data.website) {
          try {
            sessionStorage.setItem(LEAD_FLAG, "1");
          } catch {}
        }
        router.push("/thank-you");
        setFormState({
          status: "success",
          message: "Thanks. Your message is on its way, and I'll reply by email.",
          errors: {},
        });
      } else if (response.status === 429) {
        setFormState({
          status: "error",
          message: "Too many requests. Please try again later.",
          errors: {},
        });
      } else {
        const body = await response.json().catch(() => ({ error: "Unknown error" }));
        setFormState({
          status: "error",
          message:
            body.error ||
            "Something went wrong. Please try again or email me directly.",
          errors: {},
        });
      }
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setFormState({
        status: "error",
        message:
          "Something went wrong. Please try again or email me directly.",
        errors: {},
      });
    }
  };

  const resetForm = () => {
    setFormState({ status: "idle", message: "", errors: {} });
    formRef.current?.reset();
  };

  if (formState.status === "success") {
    return (
      <div className="bg-bg-card-solid rounded-[20px] p-8 text-center">
        <div>
          <CheckCircle className="mx-auto text-accent mb-4" size={48} />
        </div>
        <p className="text-text-primary text-lg font-medium mb-4">
          {formState.message}
        </p>
        <button
          onClick={resetForm}
          className="text-accent hover:text-accent-hover transition-colors font-medium"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  const isSubmitting = formState.status === "submitting";

  return (
    <div>
      {formState.status === "error" && (
        <div className="bg-error/10 border border-error rounded-lg p-4 mb-6">
          <p className="text-error text-sm">
            Something went wrong. Please try again or email me directly at{" "}
            <a
              href={MAILTO}
              className="underline hover:opacity-80"
            >
              {CONTACT.email}
            </a>
            .
          </p>
          <button
            onClick={() =>
              setFormState({ status: "idle", message: "", errors: {} })
            }
            className="text-error underline text-sm mt-1"
          >
            Try Again
          </button>
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} noValidate>
        {/* Honeypot field */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-text-primary mb-1.5"
            >
              Name <span className="text-error">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              disabled={isSubmitting}
              maxLength={100}
              className={`w-full bg-card border rounded-lg px-4 py-3 text-text-primary focus:border-accent transition-colors ${
                formState.errors.name ? "border-error" : "border-field"
              }`}
            />
            {formState.errors.name && (
              <p className="mt-1 text-error text-sm">{formState.errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text-primary mb-1.5"
            >
              Email <span className="text-error">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              disabled={isSubmitting}
              className={`w-full bg-card border rounded-lg px-4 py-3 text-text-primary focus:border-accent transition-colors ${
                formState.errors.email ? "border-error" : "border-field"
              }`}
            />
            {formState.errors.email && (
              <p className="mt-1 text-error text-sm">
                {formState.errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-text-primary mb-1.5"
            >
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              disabled={isSubmitting}
              maxLength={100}
              className="w-full bg-card border border-field rounded-lg px-4 py-3 text-text-primary focus:border-accent transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-text-primary mb-1.5"
            >
              Role you&apos;re hiring for
            </label>
            <input
              type="text"
              id="role"
              name="role"
              disabled={isSubmitting}
              maxLength={100}
              className="w-full bg-card border border-field rounded-lg px-4 py-3 text-text-primary focus:border-accent transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-text-primary mb-1.5"
            >
              Message <span className="text-error">*</span>
            </label>
            <MessageTextarea
              disabled={isSubmitting}
              error={formState.errors.message}
            />
          </div>

          <button type="submit" disabled={isSubmitting} data-btn className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
            {isSubmitting ? (
              <>
                <Loader2 aria-hidden="true" className="animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send aria-hidden="true" />
                <span>Send message</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

function MessageTextarea({
  disabled,
  error,
}: {
  disabled: boolean;
  error?: string;
}) {
  const [charCount, setCharCount] = useState(0);

  return (
    <>
      <textarea
        id="message"
        name="message"
        required
        disabled={disabled}
        rows={5}
        maxLength={2000}
        onChange={(e) => setCharCount(e.target.value.length)}
        className={`w-full bg-card border rounded-lg px-4 py-3 text-text-primary focus:border-accent transition-colors resize-y ${
          error ? "border-error" : "border-field"
        }`}
      />
      <div className="flex justify-between mt-1">
        {error ? (
          <p className="text-error text-sm">{error}</p>
        ) : (
          <span />
        )}
        <span className="text-text-muted text-xs">{charCount}/2000</span>
      </div>
    </>
  );
}
