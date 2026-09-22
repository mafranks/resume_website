# Matthew Franks personal site

A lightweight, responsive résumé site for `matthew-franks.com`. It uses plain HTML, CSS, and JavaScript, so GitHub Pages can publish it directly without a build step or package dependencies.

## Preview locally

From this directory, run:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish with GitHub Pages

### 1. Create the repository

Create a new public GitHub repository. `matthew-franks-site` is a clear name; the repository does not have to be named after the domain. Do not initialize it with files because this folder already contains the complete site.

From this directory, run the following commands, replacing `YOUR-GITHUB-USERNAME` with the account that owns the repository:

```bash
git init
git add .
git commit -m "Create personal resume site"
git branch -M main
git remote add origin git@github.com:YOUR-GITHUB-USERNAME/matthew-franks-site.git
git push -u origin main
```

### 2. Enable Pages

In the GitHub repository:

1. Open **Settings → Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Select the `main` branch and `/(root)` folder, then save.
4. Wait for the first deployment to finish. The Pages screen will show the temporary `github.io` address.

GitHub's reference: [Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

### 3. Verify the domain first

Domain verification helps prevent another GitHub account from claiming the domain if the repository or Pages configuration changes.

1. Open your GitHub profile **Settings → Pages** (profile settings, not repository settings).
2. Select **Add a domain** and enter `matthew-franks.com`.
3. GitHub will provide a unique TXT record. Add it at your DNS provider.
4. Return to GitHub and complete verification after the TXT record resolves.
5. Keep the TXT record in DNS after verification.

GitHub's reference: [Verifying a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages).

### 4. Add the custom domain in the repository

Before changing the main DNS records, return to the repository's **Settings → Pages**, enter `matthew-franks.com` under **Custom domain**, and save. The included `CNAME` file contains the same domain, but GitHub still requires this repository setting.

### 5. Configure DNS

At the DNS provider for `matthew-franks.com`, add these four records for the apex domain:

| Type | Host | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

Also add the recommended `www` alias, replacing the username:

| Type | Host | Value |
| --- | --- | --- |
| CNAME | `www` | `YOUR-GITHUB-USERNAME.github.io` |

Remove conflicting `A`, `AAAA`, `ALIAS`, or `ANAME` records for `@`, and remove any conflicting `CNAME` for `www`. Do not use a wildcard DNS record. DNS changes can take up to 24 hours to propagate.

GitHub's reference: [Managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

### 6. Enforce HTTPS

After GitHub confirms the DNS check and provisions the certificate, enable **Enforce HTTPS** in **Settings → Pages**. Certificate availability can lag behind DNS propagation.

## Update the site

Edit the files, preview locally, then publish changes with:

```bash
git add .
git commit -m "Update personal site"
git push
```

## Public-content note

Everything committed to a GitHub Pages publishing repository should be treated as public. This folder intentionally contains only the site and its public résumé—not the tailored résumé and cover-letter files in the parent directory.

## File map

- `index.html` — page content and SEO metadata
- `styles.css` — responsive design, dark mode, motion, and print styles
- `app.js` — theme, navigation, reveal effects, and header behavior
- `assets/Matthew-Franks-Resume.pdf` — downloadable résumé
- `CNAME` — GitHub Pages custom-domain declaration
- `.nojekyll` — serves the static files without Jekyll processing
- `robots.txt` and `sitemap.xml` — search-engine discovery
