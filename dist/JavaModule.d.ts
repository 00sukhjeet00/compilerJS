interface EnvData {
    ext: string;
    options?: {
        timeout?: number;
    };
}
declare const JavaModuleCompile: (envData: EnvData, code: string, cb: (output: {
    error?: string;
    output?: string;
    timeout?: boolean;
}) => void) => void;
declare const JavaModuleCompileWithInput: (envData: EnvData, code: string, input: string, cb: (output: {
    error?: string;
    ouput?: string;
    timeout?: boolean;
}) => void) => void;
export { JavaModuleCompile, JavaModuleCompileWithInput };
