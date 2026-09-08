export interface Env {
  VERCEL_ORIGIN: string;
  BACKEND_ORIGIN: string;
}

const VERCEL_EXACT: ReadonlySet<string> = new Set([
  "/",
  "/terms",
  "/privacy-policy",
]);

function isVercelRoute(pathname: string): boolean {
  if (VERCEL_EXACT.has(pathname)) return true;
  if (pathname.startsWith("/m/")) return true;
  if (pathname.startsWith("/_next/")) return true;
  if (pathname === "/favicon.ico") return true;
  return false;
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (!isVercelRoute(url.pathname)) {
      return fetch(request);
    }

    const vercelTarget = new URL(url.pathname + url.search, env.VERCEL_ORIGIN);

    const headers = new Headers(request.headers);
    headers.set("Host", new URL(env.VERCEL_ORIGIN).host);
    headers.set("X-Forwarded-Host", url.host);
    headers.set("X-Forwarded-Proto", url.protocol.replace(":", ""));

    const response = await fetch(vercelTarget.toString(), {
      method: request.method,
      headers,
      body: request.body,
      redirect: "manual",
    });

    const responseHeaders = new Headers(response.headers);
    const location = responseHeaders.get("Location");
    if (location) {
      const redirectUrl = new URL(location, env.VERCEL_ORIGIN);
      redirectUrl.host = url.host;
      redirectUrl.protocol = url.protocol;
      responseHeaders.set("Location", redirectUrl.toString());
    }

    responseHeaders.delete("x-vercel-id");
    responseHeaders.delete("x-vercel-cache");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  },
};

export default worker;
