import fs from 'fs';

let content = fs.readFileSync('src/index.css', 'utf8');

const replacements = [
    ['8B5CF6', 'e96f49'],
    ['139, 92, 246', '233, 111, 73'],
    ['139,92,246', '233,111,73'],
    ['EC4899', '06b6d4'],
    ['236, 72, 153', '6, 182, 212'],
    ['236,72,153', '6,182,212'],
    ['F472B6', '4c1d95'],
    ['244, 114, 182', '76, 29, 149'],
    ['244,114,182', '76,29,149'],
    ['elite-purple', 'elite-orange'],
    ['elite-pink', 'elite-cyan']
];

for (const [search, replace] of replacements) {
    content = content.replaceAll(search, replace);
}

fs.writeFileSync('src/index.css', content, 'utf8');
console.log('CSS transformed successfully.');
