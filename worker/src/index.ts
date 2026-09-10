export interface Env {
  VERCEL_ORIGIN: string;
  BACKEND_ORIGIN: string;
  INTERNAL_API_TOKEN: string;
}

const VERCEL_EXACT: ReadonlySet<string> = new Set([
  "/",
  "/terms",
  "/privacy-policy",
  "/robots.txt",
  "/favicon.svg",
  "/og-image.png",
  "/bookeasy-logo-180.png",
  "/bookeasy-logo-192.png",
  "/bookeasy-logo-512.png",
  "/analytics.png",
  "/booking-details.png",
  "/client-summary.png",
  "/day-calendar.png",
  "/master-expenses.png",
  "/master-schedule.png",
  "/master-services.png",
  "/master-storefront.png",
  "/online-section.png",
]);

function isVercelRoute(pathname: string): boolean {
  if (VERCEL_EXACT.has(pathname)) return true;
  if (pathname.startsWith("/m/")) return true;
  if (pathname.startsWith("/_next/")) return true;
  return false;
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // If request contains internal SSR token, proxy it to backend API
    const internalToken = request.headers.get("x-internal-token");
    if (internalToken && internalToken === env.INTERNAL_API_TOKEN) {
      const backendTarget = new URL(url.pathname + url.search, env.BACKEND_ORIGIN);
      const headers = new Headers(request.headers);
      headers.set("Host", new URL(env.BACKEND_ORIGIN).host);
      headers.delete("x-internal-token");

      return fetch(backendTarget.toString(), {
        method: request.method,
        headers,
        body: request.body,
      });
    }

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
