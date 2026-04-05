import fs from 'fs';
import path from 'path';

// Strategy: Orange is the HERO (80%). Brown/amber for warmth. ZERO cyan.
const replacements = [
    // === ALL JSX files: Kill cyan, make orange dominant ===
    // Text colors — cyan labels/subtitles become orange
    ['text-elite-cyan', 'text-elite-orange'],
    // Hover to cyan → hover to orange or amber
    ['hover:text-elite-cyan', 'hover:text-elite-orange'],
    // Borders
    ['border-elite-cyan', 'border-elite-orange'],
    ['hover:border-elite-cyan', 'hover:border-elite-orange'],
    // Backgrounds
    ['bg-elite-cyan', 'bg-elite-orange'],
    ['hover:bg-elite-cyan', 'hover:bg-elite-orange'],
    // Shadow/glow with cyan
    ['shadow-neon-cyan', 'shadow-neon-orange'],
    // Inline hex references to cyan
    ['#06b6d4', '#e96f49'],
    // RGB cyan references
    ['6, 182, 212', '233, 111, 73'],
    ['6,182,212', '233,111,73'],
    // elite-cyan/ references (opacity variants)
    ['elite-cyan/', 'elite-orange/'],
    // Gradient endpoints: from-cyan, to-cyan, via-cyan
    ['from-elite-cyan', 'from-elite-orange'],
    ['to-elite-cyan', 'to-amber-400'],
    ['via-elite-cyan', 'via-amber-500'],
];

let totalChanges = 0;

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    for (const [search, replace] of replacements) {
        if (content.includes(search)) {
            const count = (content.match(new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
            content = content.replaceAll(search, replace);
            modified = true;
            totalChanges += count;
        }
    }
    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  ✓ ${path.basename(filePath)}`);
    }
}

function processDirectory(dirPath) {
    for (const file of fs.readdirSync(dirPath)) {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) processDirectory(fullPath);
        else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.css')) processFile(fullPath);
    }
}

console.log('=== KILLING ALL CYAN — MAKING ORANGE BOSS ===\n');
processDirectory('src');
console.log(`\nDone! Made ${totalChanges} replacements.`);
