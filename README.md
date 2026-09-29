# Hunter Tigert — Portfolio

Plain static site (HTML, CSS and a small script). No framework and no build step. Deployed on Vercel from `main`.

```
index.html          All page content, meta tags, and JSON-LD structured data
css/styles.css      All styles. Colors and theme values are at the top (:root)
js/main.js          Dark-mode toggle, typing effect, 3D tilt (optional; page works without it)
fonts/              Roboto (Latin, variable) — the only font
images/             Portrait, project screenshots (WebP), social share image
favicon.svg/.ico, apple-touch-icon.png
robots.txt, sitemap.xml, llms.txt
vercel.json         Security headers and caching
```

## Editing

- **Text and sections:** edit `index.html` directly.
- **Colors / fonts / spacing:** `css/styles.css`. Light and dark values are the `:root` and `:root[data-theme="dark"]` blocks.
- **Adding a project:** copy an `<article class="card project">` block, add 400px and 720px wide WebP screenshots to `images/projects/`, and add the project to the `ItemList` in the JSON-LD block.
- **FAQ:** each `<details>` in `#faq` must also exist in the `FAQPage` JSON-LD in the `<head>` (same wording), so search and AI engines see the same answers users do.
- **Inline theme script:** the small `<script>` in the `<head>` is allowed by a SHA-256 hash in the Content-Security-Policy in `vercel.json`. If you edit that script, update the hash (`echo -n '<script text>' | openssl dgst -sha256 -binary | base64`).

## Notes

- Vercel Web Analytics and Speed Insights scripts are included. Enable both in the Vercel dashboard (project → Analytics / Speed Insights) — until then, `/_vercel/...` returns 404 (harmless).
- Contact is a form that posts to Formspree (`#contact-form`). Set the endpoint in the form's `action` (`https://formspree.io/f/<form id>`); the destination email lives in the Formspree dashboard, never in this repo. The CSP in `vercel.json` only allows posts to `formspree.io`.
- The original single-file bundle version is in this repo's git history.
