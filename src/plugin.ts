import { Compiler, Plugin } from "webpack";
import { VextPackConfig } from "./config";
import { VuicCompiler } from "./compiler";

export class VextPackPlugin implements Plugin {

    private _vuicc: VuicCompiler;

    constructor(private _options: VextPackConfig) {
        this._vuicc = new VuicCompiler(_options.compilerPath);
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