const configuredApiBase = (import.meta.env.VITE_API_URL || "https://admin-api.voicedots.ai")
  .trim()
  .replace(/\/+$/, "");

// Vercel production and preview builds use the same-origin rewrite in
// vercel.json. Local Vite development can call the backend directly.
export function publicApiUrl(path: string): string {
  const endpoint = path.replace(/^\/+/, "");
  if (import.meta.env.DEV && configuredApiBase) {
    return `${configuredApiBase}/public/${endpoint}`;
  }
  return `/api/public/${endpoint}`;
}

export async function fetchPublicJson<T>(path: string): Promise<T> {
  const url = publicApiUrl(path);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Public API request failed (${response.status})`);
  }

  const contentType = response.headers.get("content-type") || "";
  if (!/\bjson\b/i.test(contentType)) {
    throw new Error(
      `Expected JSON from the public API, received ${contentType || "an unknown response"}. Check the API route configuration.`,
    );
  }

  return response.json() as Promise<T>;
}
