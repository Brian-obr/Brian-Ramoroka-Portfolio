import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.TEST_PORT ?? 3100);

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: 0,
  reporter: [["list"]],
  use: { baseURL: `http://localhost:${PORT}` },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  // Tests run against a production build (`npm run build` first); never against a deployment.
  webServer: {
    command: `npx next start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    // Never reuse: a server left running from an older build serves stale chunk hashes.
    reuseExistingServer: false,
    // Loopback port with nothing listening: /api/contact tests reach the forward-failure
    // path without contacting Formspree or anything outside this machine.
    env: { FORMSPREE_URL: "http://127.0.0.1:9/" },
    timeout: 60_000,
  },
});
