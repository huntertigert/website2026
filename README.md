# Hunter Tigert — Portfolio

Static site, unpacked from the single-file `huntertigert-standalone.html` bundle. No build step: upload the folder to any static host (Netlify, Vercel, GitHub Pages, S3, cPanel, etc.) or open `index.html` directly.

```
index.html                 Page markup + page logic (the inline <script type="text/x-dc">)
css/
  site.css                 Site colors / theme variables (light + dark)
  iris-tokens.css          Design-system tokens, type, Roboto @font-face
  iris-theme.css           Design-system theme styles
  iris-preview-base.css    Design-system base component styles
  alkami-icons.css         Alkami icon font classes
  material-symbols.css     Material Symbols icon font
js/
  dc-runtime.js            Renders the <x-dc> template with React
  iris-design-system.js    Design-system components
  image-slot.js            <image-slot> element
  project-images.js        Paths to the project card images
  vendor/                  React 18.3.1 + ReactDOM (served locally, no CDN needed)
fonts/                     Roboto, Roboto Mono, Alkami, Material Symbols (.woff2)
images/
  hunter-tigert.png        Headshot (also used as favicon)
  projects/                Project card screenshots
```

## Editing

- **Text, sections, layout:** the markup inside `<x-dc>` in `index.html`. `{{ ... }}` are template bindings.
- **Behavior (chat widget, dark mode, project list):** the `class Component` script at the bottom of `index.html`.
  It has to stay inline, because the runtime reads it from the page.
- **Brand colors:** `css/site.css` (`--branded-color-primary` and others).
- **Project images:** replace the files in `images/projects/`, or change the paths in `js/project-images.js`.

## Notes

- The Material Symbols fonts are about 17 MB in total, because each one is the full icon set. The page only uses
  a few icons, so you can reduce them a lot with a subset from Google Fonts (`&icon_names=...`) if page weight matters.
- The browser console can show two harmless 404s for `{{ p.image }}`. The browser requests the raw template's
  `<img>` tags before the runtime fills in the bindings.
