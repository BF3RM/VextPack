import { spawn } from 'child_process';
import { join } from 'path';

export interface CompilerOptions {
    sourcePath: string;
    outputPath: string;
}

export class VuicCompiler {
    constructor(private _path: string) {
    }

    compile(options: CompilerOptions): Promise<void> {
        const child = spawn(this._path, [options.sourcePath, join(options.outputPath, 'ui.vuic')], {
            stdio: 'inherit',
            cwd: process.cwd()
        });

        return new Promise((resolve, reject) => {
            child.on('close', code => {
                if (code !== 0) {
                    reject(`vuicc exited with unexpected exit code: ${code}`);
                }

                resolve();
            })
        });
    }
}