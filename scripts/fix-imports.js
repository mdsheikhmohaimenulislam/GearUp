import fs from "fs";
import path from "path";

const root = path.resolve(process.cwd(), "dist");

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full);
    else if (stat.isFile() && full.endsWith(".js")) fixFile(full);
  }
}

function fixFile(file) {
  let s = fs.readFileSync(file, "utf8");
  // Fix static imports: from './...' or from '../...'
  s = s.replace(/(from\s+['"])(\.\.?\/[^'"\)]+?)(['"])/g, (m, p1, p2, p3) => {
    if (/\.(ts|js|mjs|cjs|json|d\.ts)$/.test(p2)) return m; // already has known extension
    return p1 + p2 + ".js" + p3;
  });
  // Fix dynamic imports: import('./...') or import('../...')
  s = s.replace(
    /(import\(\s*['"])(\.\.?\/[^'"\)]+?)(['"]\s*\))/g,
    (m, p1, p2, p3) => {
      if (/\.(ts|js|mjs|cjs|json|d\.ts)$/.test(p2)) return m;
      return p1 + p2 + ".js" + p3;
    },
  );
  fs.writeFileSync(file, s, "utf8");
}

walk(root);
console.log("Fixed imports in dist/src");
