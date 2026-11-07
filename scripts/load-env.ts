// Import this first: loads .env before other modules read process.env.
try {
  process.loadEnvFile(".env");
} catch {
  // no .env: rely on the environment (CI, Vercel)
}
