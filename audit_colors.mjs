import fs from 'fs';
import path from 'path';

let orangeTotal = 0, cyanTotal = 0;
const results = [];

function scan(dir) {
    for (const f of fs.readdirSync(dir)) {
        const fp = path.join(dir, f);
        if (fs.statSync(fp).isDirectory()) scan(fp);
        else if (fp.endsWith('.jsx')) {
            const c = fs.readFileSync(fp, 'utf8');
            const o = (c.match(/elite-orange/g) || []).length;
            const cy = (c.match(/elite-cyan/g) || []).length;
            if (o > 0 || cy > 0) results.push({ file: path.basename(fp), orange: o, cyan: cy });
            orangeTotal += o;
            cyanTotal += cy;
        }
    }
}
scan('src');
console.log('\n=== COLOR BALANCE AUDIT ===');
results.forEach(r => console.log(`${r.file}: orange=${r.orange}, cyan=${r.cyan}`));
console.log(`\nTOTAL: Orange=${orangeTotal}, Cyan=${cyanTotal}`);
console.log(`Ratio: Orange ${Math.round(orangeTotal/(orangeTotal+cyanTotal)*100)}% vs Cyan ${Math.round(cyanTotal/(orangeTotal+cyanTotal)*100)}%`);
