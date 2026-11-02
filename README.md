# Franks' AV Warehouse

A temporary parody landing page for a fictional antivirus company with one uncompromising promise: “We don't mark anything malicious!”

The site uses plain HTML, CSS, and JavaScript. It includes responsive layouts, a harmless fake scanner animation, and an explicit parody disclaimer.

## Preview locally

Bind the preview server to localhost so repository files are not exposed to the network:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Then open `http://127.0.0.1:8000`.

## Restore the résumé site

The parody is contained in a commit named `Temporarily replace resume site with AV parody`. Find its hash with `git log --oneline`, then restore the résumé site while preserving history with:

```bash
git revert <parody-commit-hash>
```

## File map

- `index.html` - parody landing-page content
- `styles.css` - industrial warehouse styling and responsive layouts
- `app.js` - mobile navigation and fake scanner interaction
- `404.html` - matching parody error page
- `CNAME` - GitHub Pages custom-domain declaration
- `.nojekyll` - static GitHub Pages configuration
