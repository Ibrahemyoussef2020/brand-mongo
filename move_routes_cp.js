const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'app', '[locale]');
const destDir = path.join(__dirname, 'app', '[locale]', '(main)');

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
}

const items = fs.readdirSync(sourceDir);

items.forEach(item => {
    if (item !== '(main)' && item !== 'layout.tsx' && item !== 'dashboard') {
        const sourcePath = path.join(sourceDir, item);
        const destPath = path.join(destDir, item);
        try {
            fs.cpSync(sourcePath, destPath, { recursive: true });
            fs.rmSync(sourcePath, { recursive: true, force: true });
            console.log(`Moved ${item}`);
        } catch (e) {
            console.error(`Failed to move ${item}:`, e.message);
        }
    }
});
