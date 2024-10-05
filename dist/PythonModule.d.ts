interface EnvData {
    ext: string;
    options: {
        timeout?: number;
    };
}
type Callback = (output: {
    out?: string;
    error?: string;
    timeout?: boolean;
}) => void;
declare const CompilePyModule: (envData: EnvData, code: string, cb: Callback) => void;
declare const CompilePyModuleWithInput: (envData: EnvData, code: string, input: string | undefined, cb: Callback) => void;
export { CompilePyModule, CompilePyModuleWithInput };
