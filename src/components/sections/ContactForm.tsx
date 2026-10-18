"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitContact, type ContactState } from "@/app/contact/actions";

const initial: ContactState = { status: "idle" };

const inputClass =
  "w-full min-h-[44px] bg-bg-subtle border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-text-primary mb-2">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-[#FCA5A5]">
          {error}
        </p>
      )}
    </div>
  );
}

/** Server Action form: works without JavaScript; with it, errors show without a reload. */
export default function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);
  const startedAt = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  // React resets the form after each submit, so the timestamp is re-armed whenever the state changes.
  useEffect(() => {
    if (startedAt.current && !startedAt.current.value) startedAt.current.value = String(Date.now());
    // Move focus to the first invalid field so screen-reader users hear the error.
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [state]);

  const e = state.errors ?? {};
  const v = state.values ?? {};
  const aria = (field: keyof typeof e) =>
    e[field] ? { "aria-invalid": true as const, "aria-describedby": `${field}-error` } : {};

  return (
    <form ref={formRef} action={action} className="space-y-5" noValidate>
      {state.message && (
        <p role="alert" className="rounded-lg border border-[#FCA5A5] p-4 text-sm text-[#FCA5A5]">
          {state.message}{" "}
          <a className="underline" href="mailto:ramorokaob@gmail.com">
            ramorokaob@gmail.com
          </a>
        </p>
      )}

      <input ref={startedAt} type="hidden" name="startedAt" />
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Leave this empty</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset>
        <legend className="block text-sm font-medium text-text-primary mb-2">What is this about?</legend>
        <div className="flex flex-wrap gap-3">
          {[
            ["project", "I have a project"],
            ["hiring", "I'm hiring"],
          ].map(([value, label]) => (
            <label
              key={value}
              className="flex min-h-[44px] cursor-pointer items-center gap-2 rounded-lg border border-border-subtle px-4 text-text-primary has-[:checked]:border-accent"
            >
              <input type="radio" name="type" value={value} defaultChecked={(v.type || "project") === value} />
              {label}
            </label>
          ))}
        </div>
        {e.type && (
          <p id="type-error" className="mt-2 text-sm text-[#FCA5A5]">
            {e.type}
          </p>
        )}
      </fieldset>

      <Field id="name" label="Name" error={e.name}>
        <input id="name" name="name" autoComplete="name" defaultValue={v.name} className={inputClass} {...aria("name")} />
      </Field>
      <Field id="email" label="Email" error={e.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          defaultValue={v.email}
          className={inputClass}
          {...aria("email")}
        />
      </Field>
      <Field id="company" label="Company (optional)" error={e.company}>
        <input
          id="company"
          name="company"
          autoComplete="organization"
          defaultValue={v.company}
          className={inputClass}
          {...aria("company")}
        />
      </Field>
      <Field id="message" label="Message" error={e.message}>
        <textarea
          id="message"
          name="message"
          rows={6}
          defaultValue={v.message}
          className={`${inputClass} resize-y`}
          {...aria("message")}
        />
      </Field>

      <p className="text-sm text-text-muted">
        I use your details only to reply to you. See the{" "}
        <a href="/privacy" className="underline">
          privacy policy
        </a>
        .
      </p>

      <button
        type="submit"
        disabled={pending}
        className="w-full min-h-[44px] bg-accent text-black font-semibold rounded-lg hover:bg-accent-hover disabled:opacity-60"
      >
        {pending ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
