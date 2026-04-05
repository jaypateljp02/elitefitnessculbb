import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const assetDir = path.join(process.cwd(), 'public', 'asset', 'new');
const srcDir = path.join(process.cwd(), 'src');

async function processDirectory(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            // Not entering subdirectories (like 'new') per the agreement
            continue;
        } else {
            const ext = path.extname(fullPath).toLowerCase();
            if (['.png', '.jpg', '.jpeg'].includes(ext)) {
                console.log(`Converting ${entry.name}...`);
                const parsed = path.parse(fullPath);
                const webpPath = path.join(dir, `${parsed.name}.webp`);
                
                try {
                    await sharp(fullPath)
                        .resize({ width: 1920, withoutEnlargement: true })
                        .webp({ quality: 80 })
                        .toFile(webpPath);
                    
                    await fs.rm(fullPath); // Delete old unoptimized image
                } catch (e) {
                    console.error(`Error processing ${entry.name}:`, e);
                }
            }
        }
    }
}

async function updateReferences(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            await updateReferences(fullPath);
        } else {
            const ext = path.extname(fullPath).toLowerCase();
            if (['.jsx', '.js', '.ts', '.tsx', '.css', '.html'].includes(ext)) {
                let content = await fs.readFile(fullPath, 'utf8');
                let replaced = content.replace(/\.(png|jpg|jpeg)/gi, '.webp');
                if (content !== replaced) {
                    await fs.writeFile(fullPath, replaced, 'utf8');
                    console.log(`Updated references in ${fullPath.replace(process.cwd(), '')}`);
                }
            }
        }
    }
}

async function main() {
    console.log('Optimizing images and updating code...');
    await processDirectory(assetDir);
    await updateReferences(srcDir);
    console.log('Done!');
}

main().catch(console.error);
