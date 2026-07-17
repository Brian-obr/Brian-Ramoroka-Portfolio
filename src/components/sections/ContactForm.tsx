"use client";

import { useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Loader2, CheckCircle } from "lucide-react";
import { contactFormSchema } from "@/lib/validation";
import type { FormState } from "@/types";

const projectTypes = [
  "Web Development",
  "SEO",
  "Web App",
  "App Development",
  "Software Engineering",
  "Maintenance & Support",
  "Hiring / Team Role",
  "Other",
];

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>({
    status: "idle",
    message: "",
    errors: {},
  });
  const formRef = useRef<HTMLFormElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formState.status === "submitting") return;

    const formData = new FormData(e.currentTarget);
    const rawProjectType = (formData.get("projectType") as string) || "";
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      projectType: rawProjectType,
      message: formData.get("message") as string,
      website: formData.get("website") as string,
    };

    const result = contactFormSchema.safeParse(data);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (typeof field === "string") {
          errors[field] = issue.message;
        }
      });
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
        setFormState({
          status: "success",
          message: "Thanks! I'll get back to you within 24 hours.",
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
            "Something went wrong — please try again or email me directly.",
          errors: {},
        });
      }
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setFormState({
        status: "error",
        message:
          "Something went wrong — please try again or email me directly.",
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
      <motion.div
        initial={{ opacity: prefersReducedMotion ? 1 : 0, scale: prefersReducedMotion ? 1 : 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
        className="bg-bg-card-solid rounded-[20px] p-8 text-center"
      >
        <motion.div
          initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
        >
          <CheckCircle className="mx-auto text-accent mb-4" size={48} />
        </motion.div>
        <p className="text-text-primary text-lg font-medium mb-4">
          {formState.message}
        </p>
        <button
          onClick={resetForm}
          className="text-accent hover:text-accent-hover transition-colors font-medium"
        >
          Send Another Message
        </button>
      </motion.div>
    );
  }

  const isSubmitting = formState.status === "submitting";

  return (
    <div>
      {formState.status === "error" && (
        <div className="bg-error/10 border border-error rounded-lg p-4 mb-6">
          <p className="text-error text-sm">
            Something went wrong — please try again or email me directly at{" "}
            <a
              href="mailto:ramorokaob@gmail.com"
              className="underline hover:opacity-80"
            >
              ramorokaob@gmail.com
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
              className={`w-full bg-bg-subtle border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors ${
                formState.errors.name ? "border-error" : "border-bg-subtle"
              }`}
              placeholder="Your name"
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
              className={`w-full bg-bg-subtle border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors ${
                formState.errors.email ? "border-error" : "border-bg-subtle"
              }`}
              placeholder="you@example.com"
            />
            {formState.errors.email && (
              <p className="mt-1 text-error text-sm">
                {formState.errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="projectType"
              className="block text-sm font-medium text-text-primary mb-1.5"
            >
              Project Type
            </label>
            <select
              id="projectType"
              name="projectType"
              disabled={isSubmitting}
              className="w-full bg-bg-subtle border border-bg-subtle rounded-lg px-4 py-3 text-text-primary focus:border-accent focus:outline-none transition-colors"
            >
              <option value="">Select a project type</option>
              {projectTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent text-bg-deep font-semibold py-3 rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Sending...
              </>
            ) : (
              "Send Message"
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
        className={`w-full bg-bg-subtle border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors resize-y ${
          error ? "border-error" : "border-bg-subtle"
        }`}
        placeholder="Tell me about your project..."
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
