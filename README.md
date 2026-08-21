# joshwilhelm.github.io

Personal GitHub Pages site for Joshua Wilhelm, served at [josh-wilhelm.com](https://josh-wilhelm.com).

## Contents

- **index.html** — Home: profile, contact, lost & found, social links
- **map.html** — Stylized world map of countries I've been to (`js/visited.js`)
- **payme.html** — Payment links (Venmo, Cash App, PayPal, Zelle)
- **lostandfound.html** — Contact page if someone finds something of mine
- **404.html** — Custom not-found page with a small game
- **generate-og-images.html** — Dev-only Open Graph image generator (`noindex`)
- **css/shared.css** / **js/fx.js** — Shared theme, buttons, and background effects
- **images/** — OG images, apple-touch-icon, and the payme gif

## Live Site

https://josh-wilhelm.com

## Local Development

Shared CSS and JS need HTTP, so serve the folder rather than opening files directly:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000
