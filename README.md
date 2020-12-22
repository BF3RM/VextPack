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
When installing VextPack it will automatically download the latest vuicc.exe, so you don't have to download it.
Using VextPack is simple, it is just a regular Webpack plugin and can be used as follows:
```js
// webpack.config.js
const { VextPackPlugin } = require('vextpack');

module.exports = {
    // ...
    plugins: [
        new VextPackPlugin({
            // OPTIONAL: Specify the location where the ui.vuic should be placed, defaults to '../'
            outputPath: '../',

            // OPTIONAL: Make a hot reloadable ui build, this creates a proxy ui that remotely loads the real ui
            hotReloadSupport: process.env.NODE_ENV !== 'production'
        })
    ]
}
```