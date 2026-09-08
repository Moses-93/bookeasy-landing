# bookeasy-landing

Public SSR service and marketing surface for the [BOOKEASY](https://bookeasy.com.ua) platform.

## Overview

Public-facing surface of BOOKEASY, decoupled from the core SPA dashboard:

- **Marketing Landing (`/`)**: Product overview, static pricing, FAQ.
- **Master Storefronts (`/m/:masterToken`)**: Public profiles with SSR metadata, JSON-LD, and online booking flow.
- **Legal Documents (`/terms`, `/privacy-policy`)**: Public offer and privacy policy compiled from Markdown.

## Stack

- Next.js 16 (App Router, React 19)
- TypeScript 5
- Tailwind CSS v4

## Routes

| Route | Render Mode | Data Source |
| --- | --- | --- |
| `/` | Static (SSG) | Static copy dictionary |
| `/terms` | Static (SSG) | `src/content/legal/terms.md` |
| `/privacy-policy` | Static (SSG) | `src/content/legal/privacy.md` |
| `/m/:masterToken` | Dynamic SSR | `GET /api/v1/masters/:token/public-profile` |
| `/m/:masterToken/bookings/:id` | Client-side | Ephemeral session / API |
