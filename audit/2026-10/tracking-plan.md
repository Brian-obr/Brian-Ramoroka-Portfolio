# Tracking plan: GTM, Consent Mode v2, GA4

## Decisions

| Decision | Choice | Why |
|---|---|---|
| Container | Google Tag Manager via `@next/third-parties/google` `<GoogleTagManager>` | One place to add GA4, Clarity and Ads later without deploys |
| Consent Mode | **Advanced** (tags load, send cookieless pings while denied) | A low-traffic site needs modelled conversions; pings carry no cookies or identifiers. Basic mode would leave the GA4 baseline near zero. If you prefer strict POPIA reading, switch to **Basic** by not rendering GTM until `analytics_storage` is granted (one flag: `NEXT_PUBLIC_CONSENT_MODE=basic`) |
| CMP | Own lightweight banner (no paid CMP) | 1 cookie category set, no IAB TCF requirement (no ad-tech); saves a subscription and ~40KB |
| Categories | Necessary (always), Analytics (GA4, Clarity), Marketing (none today; reserved) | Granular as required by GDPR for EU visitors |
| Storage | `localStorage["consent.v1"] = {"analytics":bool,"marketing":bool,"ts":ISO}` | No cookie needed to store the choice |
| RUM | `@vercel/speed-insights` (no cookies, not consent-gated) | Real-user CWV while CrUX has no data |

## Load order (in `<head>`, before GTM)

```html
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', {
    ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
    analytics_storage: 'denied', functionality_storage: 'granted', security_storage: 'granted',
    wait_for_update: 500
  });
  try {
    var c = JSON.parse(localStorage.getItem('consent.v1') || 'null');
    if (c) gtag('consent', 'update', { analytics_storage: c.analytics ? 'granted' : 'denied',
      ad_storage: c.marketing ? 'granted' : 'denied', ad_user_data: c.marketing ? 'granted' : 'denied',
      ad_personalization: c.marketing ? 'granted' : 'denied' });
  } catch (e) {}
</script>
```

Banner Accept/Reject/Save call `gtag('consent','update',…)`, write `consent.v1`, and push `{event:'consent_update'}`.

## dataLayer spec

| Event | Trigger | Parameters | GA4 key event |
|---|---|---|---|
| `generate_lead` | `/thank-you` mount, once per `submission_id` (sessionStorage guard) | `lead_source` (`contact_form`), `service` (form select value), `submission_id` | **Yes** |
| `cv_download` | click on `a[data-track="cv_download"]` | `file_name` | Yes |
| `click_email` | click on `a[href^="mailto:"]` | `link_location` (`header`/`hero`/`footer`/`contact`) | Yes |
| `click_phone` | click on `a[href^="tel:"]` | `link_location` | Yes |
| `click_whatsapp` | click on `a[href^="https://wa.me/"]` | `link_location` | Yes |
| `click_booking` | click on Cal.com link | `link_location` | Yes |
| `outbound_click` | click on any other external `a` | `link_url`, `link_location` | No |
| `consent_update` | banner choice | `analytics`, `marketing` | No |

No PII in any parameter: no names, emails or messages, and nothing in URLs. `/thank-you?s=<random id>` carries only a random id.

## GTM container (you create it; values to enter)

1. Tags: **Google tag** (GA4 measurement ID `G-DJ0D77C38N`, or a new property) → trigger *Initialization - All Pages*. Consent settings: "Not set" (Consent Mode handles it).
2. Tags: **GA4 Event** × 7, event name = `{{Event}}`, parameters from Data Layer Variables listed above. Trigger: Custom Event, regex `^(generate_lead|cv_download|click_email|click_phone|click_whatsapp|click_booking|outbound_click)$`.
3. Optional: **Microsoft Clarity** (Community Template) → consent requirement `analytics_storage`.
4. GA4 Admin → Events → mark the 6 key events.
5. Publish; send me the `GTM-XXXXXXX` id → Vercel env `NEXT_PUBLIC_GTM_ID`.

## Verification (external)

1. GTM Preview on the Vercel preview URL: before consent, Tag Assistant shows the Google tag with `gcs=G100` (denied) and **no `_ga` cookie**.
2. Click Accept: `gcs=G111`, `_ga` cookie set, page_view sent.
3. Submit the form → `/thank-you` → exactly one `generate_lead` in GA4 DebugView; reload → no second event.
4. Playwright: `tests/consent.spec.ts` asserts no `_ga` cookie and no request to `google-analytics.com/g/collect` with `gcs=G111` before Accept.
