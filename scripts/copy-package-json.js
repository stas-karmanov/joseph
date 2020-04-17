const fs = require('fs-extra');
const path = require('path');

const packageJson = require('../package.json');
delete packageJson.scripts;

fs.writeFile(path.resolve(__dirname, '../dist/package.json'), JSON.stringify(packageJson, null, '\t'));
