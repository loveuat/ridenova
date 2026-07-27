export const CONFIG = {
 turnstileSiteKey:
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!,

  gtmId:
  process.env.NEXT_PUBLIC_GTM_ID || "",

  gaId:
  process.env.NEXT_PUBLIC_GA_ID || "",
};