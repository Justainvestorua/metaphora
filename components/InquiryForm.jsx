"use client";

import { useEffect, useId, useRef, useState } from "react";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function InquiryForm({ t }) {
  const uid = useId();
  const f = t.inquiry.fields;
  const E = t.inquiry.errors;

  const [values, setValues] = useState({
    name: "",
    company: "",
    email: "",
    project: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | failed
  const [attempt, setAttempt] = useState(0);
  const summaryRef = useRef(null);
  const successRef = useRef(null);

  /* Move focus after React has committed the node, rather than from inside
     the submit handler. requestAnimationFrame is not a commit signal — it is
     also paused whenever the page is not being rendered (background tab,
     hidden view), so focus would silently never move. */
  useEffect(() => {
    if (attempt === 0) return;
    if (status === "sent") successRef.current?.focus();
    else summaryRef.current?.focus();
  }, [attempt, status]);

  const id = (k) => `${uid}-${k}`;
  const errId = (k) => `${uid}-${k}-error`;
  const hintId = (k) => `${uid}-${k}-hint`;

  function validate(v) {
    const next = {};
    if (!v.name.trim()) next.name = E.name;
    if (!v.email.trim()) next.email = E.email;
    else if (!EMAIL.test(v.email.trim())) next.email = E.emailFormat;
    if (!v.project.trim()) next.project = E.project;
    return next;
  }

  function onChange(k) {
    return (e) => {
      const value = e.target.value;
      setValues((s) => ({ ...s, [k]: value }));
      // Clear an error as soon as the visitor fixes it, never introduce one
      // while they are still typing.
      setErrors((s) => (s[k] ? { ...s, [k]: undefined } : s));
    };
  }

  async function onSubmit(e) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length) {
      // Focus lands on the summary via the effect above, so a screen reader
      // announces the problem and a keyboard user arrives somewhere useful.
      setAttempt((n) => n + 1);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale: t.lang }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("failed");
    } finally {
      setAttempt((n) => n + 1);
    }
  }

  if (status === "sent") {
    return (
      <div
        className="form__success"
        role="status"
        tabIndex={-1}
        ref={successRef}
      >
        <h3>{t.inquiry.successTitle}</h3>
        <p>{t.inquiry.successBody}</p>
      </div>
    );
  }

  const invalidKeys = Object.keys(errors).filter((k) => errors[k]);
  const showSummary = invalidKeys.length > 0 || status === "failed";

  // A plain function, not a component. Declaring a component inside render
  // gives it a new identity every keystroke, React remounts the input, and
  // focus is lost mid-word. Inlining the JSX avoids that entirely.
  function field({ k, type = "text", textarea = false, hint, required }) {
    const bad = Boolean(errors[k]);
    const describedBy =
      [bad ? errId(k) : null, hint ? hintId(k) : null]
        .filter(Boolean)
        .join(" ") || undefined;

    const shared = {
      id: id(k),
      name: k,
      value: values[k],
      onChange: onChange(k),
      autoComplete: f[k].autoComplete,
      "aria-invalid": bad || undefined,
      "aria-describedby": describedBy,
      required: required || undefined,
    };

    return (
      <div className="field" data-invalid={bad ? "true" : undefined}>
        <label className="field__label" htmlFor={id(k)}>
          {f[k].label}
          {!required && (
            <span className="field__opt">{t.inquiry.optional}</span>
          )}
        </label>
        {textarea ? (
          <textarea rows={4} {...shared} />
        ) : (
          <input type={type} {...shared} />
        )}
        {hint && (
          <p className="field__hint" id={hintId(k)}>
            {hint}
          </p>
        )}
        {bad && (
          <p className="field__error" id={errId(k)}>
            {errors[k]}
          </p>
        )}
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      {showSummary && (
        <div
          className="form__summary"
          role="alert"
          tabIndex={-1}
          ref={summaryRef}
        >
          {status === "failed"
            ? t.inquiry.errors.summary
            : t.inquiry.errors.summary}
        </div>
      )}

      {field({ k: "name", required: true })}
      {field({ k: "company" })}
      {field({ k: "email", type: "email", required: true })}
      {field({ k: "project", hint: t.inquiry.projectHint, required: true })}
      {field({ k: "message", textarea: true, hint: t.inquiry.messageHint })}

      <div className="form__foot">
        <button
          type="submit"
          className="btn btn--solid form__submit"
          disabled={status === "sending"}
        >
          {status === "sending" ? t.inquiry.sending : t.inquiry.submit}
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  );
}
