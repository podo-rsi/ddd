const fs = require("fs");
const path = require("path");

const out = path.join(__dirname, "..", "build");
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

// Templates
const pages = {
    "index.html": require("./templates/index.html.js"),
};

// Ensure build folder exists
fs.mkdirSync(out, { recursive: true });

// Create .nojekyll automatically
fs.writeFileSync(path.join(out, ".nojekyll"), "", "utf8");

// Write files
for (const [file, tmpl] of Object.entries(pages)) {
    fs.writeFileSync(path.join(out, file), tmpl(), "utf8");
}