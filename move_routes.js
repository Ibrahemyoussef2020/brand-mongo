const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'app', '[locale]');
const destDir = path.join(__dirname, 'app', '[locale]', '(main)');

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
}

const items = fs.readdirSync(sourceDir);

items.forEach(item => {
    if (item !== '(main)' && item !== 'layout.tsx') {
        const sourcePath = path.join(sourceDir, item);
        const destPath = path.join(destDir, item);
        fs.renameSync(sourcePath, destPath);
        console.log(`Moved ${item}`);
    }
});
