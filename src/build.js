const fs = require("fs");
const path = require("path");
const renderIndex = require("./templates/index.html.js");

const out = path.join(__dirname, "..", "build");
const inputPath = path.join(__dirname, "docs", "dddata.md");
const dddata = fs.readFileSync(inputPath, 'utf-8').trim();
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, ".nojekyll"), "", "utf8");

// Templates
const pages = {
    "index.html": renderIndex(dddata),
};

// Write files
for (const [file, tmpl] of Object.entries(pages)) {
    fs.writeFileSync(path.join(out, file), tmpl(), "utf8");
}