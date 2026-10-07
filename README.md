# andrewbokman.work

Andrew Bokman's personal site. One page of plain HTML, CSS and a little JavaScript.
There is no build step and nothing to install.

The design lives in a Figma file named "Andrew Bokman — Website". The CSS token names match the Figma
variable names.

## Preview it on your Mac

```bash
cd site
python3 -m http.server 4173
```

Then open http://localhost:4173. Opening `index.html` directly also works.

## What is where

Everything that gets published is in the `site` folder. `DESIGN.md`, `CONTENT.md`, `figma-state.json` and the
preview images are working notes kept on this Mac; `.gitignore` leaves them out of the repository.

| File (inside `site/`) | What it holds |
|---|---|
| `index.html` | All the content, in page order. Each section starts with a comment such as `<!-- 03 EXPERIENCE -->`. |
| `css/tokens.css` | Colours, spacing and font sizes. Change a value here and it changes everywhere. |
| `css/site.css` | Layout and components. |
| `js/site.js` | The mobile menu, the highlighted nav link, and the highlight wipe. |
| `assets/logos`, `assets/icons` | Logo and icon files exported from the Figma design. |
| `assets/Andrew-Bokman-Resume.pdf` | The résumé the "Résumé" links download. |

## Common edits

- **New job:** in `index.html`, copy a `<details class="index-row">` block in section 03, paste it at the top of
  the list and edit the text. Put the word `open` after `class="index-row"` on the row that should start expanded,
  and move the `Current` tag to it.
- **Light or dark section:** add or remove `class="theme-light"` on a `<section>`.
- **Colours:** edit the primitives at the top of `css/tokens.css`. `--blue-50` is the light section background;
  set it to `#ffffff` for pure white.
- **Résumé:** replace `assets/Andrew-Bokman-Resume.pdf` with a file of the same name. The published PDF is a
  web copy without the phone number: duplicate the Light résumé frame in Figma, hide the Phone row in the
  duplicate, export the duplicate as PDF, then delete it.
- **Projects section:** it was taken out on 6 October 2026. The block and the steps to restore it are in
  `snippets/projects-section.html`.
- **Footer date:** edit "Updated October 2026" at the bottom of `index.html`.

## Before publishing

- Check the wording of the hero statement and section headings.
- Le Cordon Bleu shows "Earlier" because no dates were supplied.

## Publishing: GitHub to Cloudflare Pages

The code lives in the GitHub repository `arcNode-Alchemyst/andrewbokman.work`. Once Cloudflare is connected to
it, every push to `main` republishes the site. The domain `andrewbokman.work` is registered in Cloudflare.

First-time setup, following Cloudflare's Pages documentation as read on 6 October 2026 (menu names may change):

1. In the Cloudflare dashboard go to **Workers & Pages** → **Create application** → **Pages** →
   **Connect to Git**.
2. Sign in with GitHub, choose the `andrewbokman.work` repository, then **Install & Authorize** and
   **Begin setup**.
3. Build settings: production branch `main`; framework preset none; build command blank; build output
   directory blank; **Root directory (advanced)** `site`. Then **Save and Deploy**. Cloudflare gives the site a
   free `*.pages.dev` address to check.
4. Open the project → **Custom domains** → **Set up a domain**, enter `andrewbokman.work`, and select
   **Continue**. Cloudflare creates the DNS record and the HTTPS certificate.
5. Add `www.andrewbokman.work` the same way, then add a redirect rule from `www` to the main address.

A project connected to Git cannot be switched to drag-and-drop upload later.

To publish a change after that:

```bash
git add -A
git commit -m "Describe the change"
git push
```

## Credits

- Typeface: IBM Plex Sans and IBM Plex Mono (SIL Open Font License), loaded from Google Fonts.
- Icons: Lucide (ISC licence).
- Company, school and software logos belong to their owners and are used to identify them.
