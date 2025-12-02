GH pages branch
```bash
git checkout --orphan gh-pages
git rm -rf .
echo "" > .gitignore
git add .gitignore
git commit -m "Initialize gh-pages branch"
git push origin gh-pages
git checkout main
```