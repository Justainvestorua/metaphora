import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX = { name: 120, company: 160, email: 254, project: 400, message: 4000 };

function clean(v, max) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const data = {
    name: clean(body.name, MAX.name),
    company: clean(body.company, MAX.company),
    email: clean(body.email, MAX.email),
    project: clean(body.project, MAX.project),
    message: clean(body.message, MAX.message),
    locale: body.locale === "de" ? "de" : "en",
  };

  const invalid = [];
  if (!data.name) invalid.push("name");
  if (!data.email || !EMAIL.test(data.email)) invalid.push("email");
  if (!data.project) invalid.push("project");

  if (invalid.length) {
    return NextResponse.json({ error: "invalid", fields: invalid }, { status: 422 });
  }

  /* ------------------------------------------------------------------
     Delivery.

     This route validates and accepts the inquiry. It does NOT yet send
     mail, because no provider credentials exist in this project — and
     silently pretending to deliver would be worse than saying so.

     To make delivery live, set INQUIRY_TO and the provider key in the
     environment, then send from here. The client already handles a
     non-2xx response as a failure state, so no front-end change is
     needed once this block sends for real.
     ------------------------------------------------------------------ */
  const to = process.env.INQUIRY_TO;
  if (!to) {
    console.warn(
      "[inquiry] accepted but not delivered — INQUIRY_TO is unset.",
      { from: data.email, project: data.project.slice(0, 60) }
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  console.info("[inquiry] received", { to, from: data.email });
  return NextResponse.json({ ok: true, delivered: false });
}

export async function GET() {
  return NextResponse.json({ error: "method_not_allowed" }, { status: 405 });
}
