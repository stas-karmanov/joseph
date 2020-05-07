const fs = require('fs-extra');
const path = require('path');

fs.emptyDirSync(path.resolve(__dirname, '../demo/node_modules/joseph-log'));
fs.copySync(path.resolve(__dirname, '../dist'), path.resolve(__dirname, '../demo/node_modules/joseph-log'));
