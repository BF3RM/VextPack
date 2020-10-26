import { Compiler, Plugin } from "webpack";
import { VextPackConfig } from "./config";
import { VuicCompiler } from "./compiler";
import { join } from "path";
import fs from 'fs';

export class VextPackPlugin implements Plugin {

    private _vuicc: VuicCompiler;
    private _options: VextPackConfig;

    constructor(options?: Partial<VextPackConfig>) {
        this._options = {
            compilerPath: process.env.VUICC_PATH!,
            outputPath: '../',
            compilerFile: 'vuicc.exe',
            hotReloadSupport: false,
            ...options
        }

        // TODO: Catch invalid compiler options

        this._vuicc = new VuicCompiler(join(
            this._options.compilerPath, this._options.compilerFile));
    }

    apply(compiler: Compiler) {
        if (process.platform !== 'win32') {
            console.error('vuicc.exe currently only supports Windows, compiler disabled.');
            return;
        }

        const vuiccPath = join(this._options.compilerPath, this._options.compilerFile);
        if (!fs.existsSync(vuiccPath)) {
            console.error('vuicc.exe does not exist at path: ' + vuiccPath + ', compiler disabled.');
            return;
        }
        
        if (this._options.hotReloadSupport) {
            console.log('VextPack: Enabling Hot Reload Support');
            return compiler.hooks.afterPlugins.tap(VextPackPlugin.name, () => {
                return this._vuicc.compile({
                    sourcePath: join(__dirname, '..', 'proxy'),
                    outputPath: this._options.outputPath
                });
            });
        } else {
            compiler.hooks.afterEmit.tapPromise(VextPackPlugin.name, (compilation) => {
                // Ignore child compilers
                if (compilation.compiler.isChild()) {
                    return Promise.resolve();
                }

                // Ignore failed compilations
                if (compilation.errors.length > 0) {
                    return Promise.resolve();
                }

                return this._vuicc.compile({
                    sourcePath: compilation.outputOptions.path,
                    outputPath: this._options.outputPath
                });
            });
        }
    }
}
