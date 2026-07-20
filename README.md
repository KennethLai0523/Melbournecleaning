# Melbourne Premier Cleaning — Static Marketing Website

Professional static marketing website for **Melbourne Premier Cleaning**, a Melbourne-based residential and commercial cleaning service.

Built with React, Vite, TypeScript, and React Router. No backend, database, or authentication — enquiries are sent via WhatsApp, email, or clipboard copy.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── config/          # Central configuration (edit business details here)
│   ├── businessConfig.ts
│   ├── navigation.ts
│   └── seoConfig.ts
├── data/            # Static content
│   ├── services.ts
│   ├── serviceAreas.ts
│   ├── testimonials.ts
│   ├── faqs.ts
│   └── about.ts
├── components/
│   ├── layout/      # Header, Footer, Layout, SEO, MobileContactBar
│   ├── forms/       # Quote and contact forms
│   └── ui/          # Reusable UI components
├── sections/        # Homepage sections
├── pages/           # Route pages
├── utils/           # WhatsApp, email, validation helpers
└── styles/          # Global CSS
public/
├── images/          # Local images
├── robots.txt
├── sitemap.xml
└── site.webmanifest
```

## Where to Edit Key Details

| What to change | File |
|---|---|
| Business name, phone, WhatsApp, email, hours, colours, trust claims | `src/config/businessConfig.ts` |
| Services and service page content | `src/data/services.ts` |
| Service areas and suburbs | `src/data/serviceAreas.ts` |
| Navigation links | `src/config/navigation.ts` |
| SEO titles and descriptions | `src/config/seoConfig.ts` |
| Testimonials (replace placeholders) | `src/data/testimonials.ts` |
| FAQ content | `src/data/faqs.ts` |
| About page content | `src/data/about.ts` |
| Images | `public/images/` |
| Sitemap URLs | `public/sitemap.xml` |

### Temporary Details to Replace Before Launch

In `src/config/businessConfig.ts`:

- **Email** — marked as temporary (`hello@melbournepremiercleaning.com.au`)
- **Address** — city/state only until verified
- **Trust claims** — disabled by default (insurance, ratings, etc.)
- **Testimonials** — placeholder reviews in `src/data/testimonials.ts`
- **Before/after images** — replace `before-cleaning-example.jpg` and `after-cleaning-example.jpg`
- **Legal pages** — require professional legal review

## Routes

| Route | Page |
|---|---|
| `/` | Homepage |
| `/services` | All services |
| `/residential-cleaning` | Residential cleaning |
| `/commercial-cleaning` | Commercial cleaning |
| `/end-of-lease-cleaning` | End of lease cleaning |
| `/deep-cleaning` | Deep cleaning |
| `/office-cleaning` | Office cleaning |
| `/carpet-cleaning` | Carpet cleaning |
| `/window-cleaning` | Window cleaning |
| `/airbnb-cleaning` | Airbnb cleaning |
| `/move-in-move-out-cleaning` | Move-in/move-out |
| `/post-construction-cleaning` | Post-construction |
| `/strata-cleaning` | Strata cleaning |
| `/service-areas` | Service areas |
| `/about` | About us |
| `/contact` | Contact |
| `/request-a-quote` | Detailed quote form |
| `/privacy-policy` | Privacy policy |
| `/terms-and-conditions` | Terms and conditions |
| `/cancellation-policy` | Cancellation policy |

## Forms

All forms are static — no server submission. Users can:

1. **Send via WhatsApp** — opens WhatsApp with a pre-filled, URL-encoded message
2. **Send via Email** — opens the device's email client with a `mailto:` link
3. **Copy details** — available on the detailed quote form

## Future Backend Connection

To add a backend later (e.g. Firebase, Supabase, or a custom API):

1. **Forms** — Replace the submit handlers in:
   - `src/components/forms/QuickEnquiryForm.tsx`
   - `src/components/forms/DetailedQuoteForm.tsx`
   - `src/components/forms/ContactForm.tsx`

2. **API layer** — Add `src/services/api.ts` for HTTP calls without changing page components.

3. **Auth** — Add `src/context/AuthContext.tsx` and protect routes in `src/App.tsx`.

4. **Booking** — Extend `src/data/services.ts` with availability data and add booking state management.

The modular structure keeps pages, sections, and config separate from submission logic so a backend can be connected without rebuilding the site.

## Technology

- React 19 + TypeScript
- Vite 8
- React Router 7
- react-helmet-async (SEO)
- CSS Modules + global CSS variables

No Firebase, database, authentication, or payment packages are installed.
