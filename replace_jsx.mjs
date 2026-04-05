import fs from 'fs';
import path from 'path';

const replacements = [
    ['elite-purple', 'elite-orange'],
    ['elite-pink', 'elite-cyan'],
    // Handle inline rgb replacements in jsx if there are any
    ['139,92,246', '233,111,73'],
    ['139, 92, 246', '233, 111, 73'],
    ['236,72,153', '6,182,212'],
    ['236, 72, 153', '6, 182, 212'],
    ['#8B5CF6', '#e96f49'],
    ['#EC4899', '#06b6d4'],
    ['glow-purple', 'glow-orange'],
    ['glow-pink', 'glow-cyan']
];

function processDirectory(dirPath) {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;
            for (const [search, replace] of replacements) {
                if (content.includes(search)) {
                    content = content.replaceAll(search, replace);
                    modified = true;
                }
            }
            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
            }
        }
    }
}

processDirectory('src');
console.log('JSX transformed successfully.');
