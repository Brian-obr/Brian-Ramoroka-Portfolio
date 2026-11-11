import { test, expect, type APIRequestContext } from "@playwright/test";

// Request-level tests for the real POST /api/contact handler (the browser specs stub it).
// FORMSPREE_URL points at a closed loopback port (playwright.config.ts), so a valid
// submission ends at the forward-failure branch and nothing leaves this machine.

const valid = {
  name: "Test Person",
  email: "test@example.com",
  company: "",
  role: "",
  message: "Hello, this is a test message.",
  website: "",
};

// Each test gets its own rate-limit key, so tests running in parallel don't share a budget.
const ip = () => `test-${test.info().testId}`;

function post(request: APIRequestContext, data: unknown, headers: Record<string, string> = {}, key = ip()) {
  return request.post("/api/contact", {
    // A Buffer goes out byte for byte (Playwright re-encodes strings that aren't valid JSON).
    data: Buffer.from(typeof data === "string" ? data : JSON.stringify(data)),
    headers: { "content-type": "application/json", "x-forwarded-for": key, ...headers },
  });
}

test("valid submission reaches the forward and fails with a fixed message", async ({ request }) => {
  const res = await post(request, valid);
  expect(res.status()).toBe(500);
  expect(await res.json()).toEqual({ error: "Failed to send message. Please try again later." });
});

test("filled honeypot returns success without forwarding", async ({ request }) => {
  const res = await post(request, { ...valid, website: "http://spam.example" });
  expect(res.status()).toBe(200);
  expect(await res.json()).toEqual({ success: true });
});

test("sixth request from one key in an hour gets 429", async ({ request }) => {
  const key = ip();
  for (let i = 0; i < 5; i++) {
    expect((await post(request, { ...valid, website: "x" }, {}, key)).status()).toBe(200);
  }
  expect((await post(request, valid, {}, key)).status()).toBe(429);
});

test("schema rejection returns a field-to-message map", async ({ request }) => {
  const res = await post(request, { ...valid, name: "   ", email: "nope" });
  expect(res.status()).toBe(400);
  const body = await res.json();
  expect(body.error).toBe("Validation failed.");
  expect(body.fields).toEqual({ name: "Please enter your name", email: "Please enter a valid email" });
});

test("email longer than 254 characters is rejected", async ({ request }) => {
  const res = await post(request, { ...valid, email: `${"a".repeat(250)}@example.com` });
  expect(res.status()).toBe(400);
  expect((await res.json()).fields.email).toBe("Email must be 254 characters or less");
});

test("line breaks in single-line fields are rejected", async ({ request }) => {
  const res = await post(request, { ...valid, name: "Test\r\nBcc: x@example.com" });
  expect(res.status()).toBe(400);
  expect((await res.json()).fields).toHaveProperty("name");
});

test("non-JSON content type gets 415", async ({ request }) => {
  const res = await post(request, valid, { "content-type": "text/plain" });
  expect(res.status()).toBe(415);
});

test("a browser on another origin gets 403", async ({ request }) => {
  const res = await post(request, valid, { origin: "https://evil.example" });
  expect(res.status()).toBe(403);
});

test("oversized body gets 413", async ({ request }) => {
  const res = await post(request, { ...valid, message: "a".repeat(20_000) });
  expect(res.status()).toBe(413);
});

test("malformed JSON gets 400", async ({ request }) => {
  const res = await post(request, "{not json");
  expect(res.status()).toBe(400);
  expect(await res.json()).toEqual({ error: "Invalid request body." });
});
