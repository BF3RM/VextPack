import { Compiler, Plugin } from "webpack";
import { VextPackConfig } from "./config";
import { VuicCompiler } from "./compiler";
import { join } from "path";

export class VextPackPlugin implements Plugin {

    private _vuicc: VuicCompiler;
    private _options: VextPackConfig;

    constructor(options?: Partial<VextPackConfig>) {
        this._options = {
            compilerPath: process.env.VUICC_PATH!,
            outputPath: '../',
            compilerFile: 'vuicc.exe',
            ...options
        }

        // TODO: Catch invalid compiler options

        this._vuicc = new VuicCompiler(join(
            this._options.compilerPath, this._options.compilerFile));
    }

    apply(compiler: Compiler) {
        compiler.hooks.afterEmit.tapPromise(VextPackPlugin.name, (compilation) => {
            // Ignore child compilers
            if (compilation.compiler.isChild()) {
                return Promise.resolve();
            }

            return this._vuicc.compile({
                sourcePath: compilation.outputOptions.path,
                outputPath: this._options.outputPath                
            });
        });
    }
}