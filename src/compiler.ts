import { spawn } from 'child_process';

export interface CompilerOptions {
    sourcePath: string;
    outputPath: string;
}

export class VuicCompiler {
    constructor(private _path: string) {
    }

    compile(options: CompilerOptions): Promise<void> {
        const child = spawn(this._path, [options.sourcePath, `${options.outputPath}/ui.vuic`], { stdio: 'inherit' });

        return new Promise((resolve, reject) => {
            child.on('close', code => {
                if (code !== 0) {
                    reject(`vuic exited with unexpected exit code: ${code}`);
                }

                resolve();
            })
        });
    }
}