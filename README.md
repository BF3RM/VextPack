# VextPack
A webpack plugin to automatically build a vuic file for Venice Unleashed

## Problem
Venice Unleashed uses a .vuic file to pack the WebUI of a mod. Developers can use the vuic compiler to generate this file. The problem however is that when you use something like Webpack you really only wanna run one build command and be done. This plugin does exactly that, it generates a .vuic file after the files are built.

## Installation
With npm
```
npm install --save-dev vextpack
```

With yarn
```
yarn -D vextpack
```

## Usage
VextPack is just a regular Webpack plugin and can be used as follows:
```js
// webpack.config.js
const { VextPackPlugin } = require('vextpack');

module.exports = {
    // ...
    plugins: [
        new VextPackPlugin({
            // OPTIONAL: Specify the location of the vuic compiler (not included in this package!)
            /// defaults to process.env.VUICC_PATH
            compilerPath: 'path/to/vuicc',

            // OPTIONAL: Custom file name of the compiler, defaults to 'vuicc.exe'
            compilerFile: 'vuicc.exe',

            // OPTIONAL: Specify the location where the ui.vuic should be placed, defaults to '../'
            outputPath: '../'
        })
    ]
}
```