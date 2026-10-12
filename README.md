# Manoj & Chethana — Marathi wedding invitation

A frontend-only React + Vite invitation designed for phones. Maharashtrian baraat and couple illustrations, animated marigold petals, scroll reveals, background dhol music, calendar downloads, and native mobile sharing. Larger screens retain the intimate phone-width composition.

## Run locally

Requires Node.js 22.12+ (Node 24 is supported).

```sh
npm ci
npm run dev
```

## Deploy on Vercel

Import this repository into Vercel and deploy. The included `vercel.json` sets the Vite framework, `npm run build` command, and `dist` output directory. No environment variables, database, backend, or API keys are needed. Use Node 24 in the Vercel project settings.

```sh
npm run build
npm run preview
```

Official deployment reference: https://vercel.com/docs/frameworks/frontend/vite

## Edit the invitation

- `src/wedding.js`: names, event dates, venue name, and maps link.
- `src/components/Hero.jsx`: opening invitation text and displayed names.
- `src/components/Invitation.jsx`: family invitation wording.
- `src/styles.css`: colors, type, spacing, and motion.
- `public/images/`: locally hosted WebP artwork.
- `index.html`: page title and social metadata.

Reception: 29 November 2026. Wedding: 30 November 2026. Venue: Sri Dharmastala Manjunatha Swamy Kalyana Mantapa.

Event times and a precise street address were not supplied. Calendar events are explicitly all-day, ending on the following date. The map button opens a search for the supplied venue; replace `mapsUrl` with the exact verified place link when available. All illustrations are decorative, not portraits of the couple or depictions of the actual venue.

Music attempts to play on load and starts on the first touch, click, or manual scroll when browser autoplay restrictions require interaction. The music control pauses and resumes it. Falling flowers respond to scroll speed. After a five-second reading pause, the page auto-scrolls at 70 pixels per second; manual navigation takes priority before it continues. Animations and auto-scroll honor the device's reduced-motion preference. No data is collected or sent to a server. Sharing uses the device share sheet, with clipboard and manual-copy fallbacks.
