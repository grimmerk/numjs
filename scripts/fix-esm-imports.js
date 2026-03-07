// Post-build script: add .js extensions to relative imports in ESM output.
// tsc does not rewrite import specifiers, but Node.js ESM requires explicit
// file extensions for relative imports.

const fs = require('fs');
const path = require('path');

const esmDir = path.join(__dirname, '..', 'build', 'module');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Match relative imports: from "./foo" or from "../foo"
  // Add .js if the specifier doesn't already have an extension
  content = content.replace(
    /(from\s+["'])(\.\.?\/[^"']+)(["'])/g,
    (match, prefix, specifier, suffix) => {
      if (path.extname(specifier)) return match; // already has extension

      // Check if it's a directory import (has index.js inside)
      const absPath = path.resolve(path.dirname(filePath), specifier);
      if (fs.existsSync(absPath) && fs.statSync(absPath).isDirectory()) {
        return `${prefix}${specifier}/index.js${suffix}`;
      }
      return `${prefix}${specifier}.js${suffix}`;
    }
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('  fixed:', path.relative(esmDir, filePath));
  }
}

function walkDir(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(full);
    } else if (entry.name.endsWith('.js')) {
      fixFile(full);
    }
  }
}

console.log('Fixing ESM imports in build/module/...');
walkDir(esmDir);
console.log('Done.');
