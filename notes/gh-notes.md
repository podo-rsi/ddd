# GH pages branch
```bash
git checkout --orphan gh-pages
git rm -rf .
echo "" > .gitignore
git add .gitignore
git commit -m "Initialize gh-pages branch"
git push origin gh-pages
git checkout main
```
# Repo settings
Settings → Pages → Build and deployment
Source: Deploy from branch
Branch: gh-pages
Folder: / (root)
Save.
# GH actions workflow
from root dir:
```bash
mkdir .github
cd .github
mkdir workflows
cd workflows
touch deploy.yml
```
copy to deploy.yml
```yaml
echo "name: Build and Deploy HTML to gh-pages

on:
  push:
    branches: [ main ]

permissions:
  contents: write     # IMPORTANT: allow pushing to gh-pages
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm install

      - name: Build HTML
        run: npm run build

      - name: Add .nojekyll
        run: echo "" > build/.nojekyll

      - name: Deploy to gh-pages branch
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_branch: gh-pages
          publish_dir: build
          force_orphan: true   # creates a clean root on each deploy" > deploy.yml
```
create src/build.js
```javascript
const fs = require("fs");
const path = require("path");

const out = path.join(__dirname, "..", "build");
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

// Templates
const pages = {
  "index.html": require("./templates/index.html.js"),
};

// Write files
for (const [file, tmpl] of Object.entries(pages)) {
  fs.writeFileSync(path.join(out, file), tmpl(), "utf8");
}
```
create src/templates/index.html.js
```javascript
module.exports = () => `
<!DOCTYPE html>
<html>
<head>
  <title>Home</title>
</head>
<body>
  <h1>Hello</h1>
</body>
</html>
`;
```