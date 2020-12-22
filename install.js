const fs = require('fs');
const https = require('https');

const destPath = 'dist/vuicc.exe';

function downloadCompiler() {
    return new Promise((resolve, reject) => {
        const writeStream = fs.createWriteStream('dist/vuicc.exe');

        https.get('https://veniceunleashed.net/files/vuicc.exe', (res) => {
            if (res.statusCode !== 200) {
                writeStream.close();
                fs.unlink(destPath, () => {});
                reject(new Error(`Server responded with ${res.statusCode}: ${res.statusMessage}`));
                return;
            }    

            res.pipe(writeStream)
                .on('finish', () => {
                    resolve();
                })
                .on('error', (err) => {
                    writeStream.close();
                    fs.unlink(destPath, () => {});
                    reject(err)
                });
        });
    });
}

downloadCompiler()
    .then(() => console.log('Successfully downloaded vuicc.exe'))
    .catch(err => console.log('An error occured while downloading vuicc.exe:', err));