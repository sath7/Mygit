const { execSync } = require('child_process');
const path = require('path');

function hashFile(filePath) {
    const binaryPath = path.join(__dirname,'mygit-core/target/release/mygit_core.exe');
    return execSync(`${binaryPath} ${filePath}`).toString().trim();

}

module.exports = { hashFile };
