export interface VextPackConfig {
    // Output path, defaults to the Webpack output path (required)
    outputPath: string;

    // Make a hot reloadable ui build, this creates a proxy ui that remotely loads the real ui
    hotReloadSupport: boolean;
}