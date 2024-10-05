import { Callback, EnvData } from "./types";
export default class CompileJs {
    init: () => void;
    compileCPP: (envData: EnvData, code: string, cb: Callback) => void;
    compileCPPWithInput: (envData: EnvData, code: string, input: string, cb: Callback) => void;
    compilePy: (envData: EnvData, code: string, cb: Callback) => void;
    compilePyWithInput: (envData: EnvData, code: string, input: string, cb: Callback) => void;
    compileJava: (envData: EnvData, code: string, cb: Callback) => void;
    compileJavaWithInput: (envData: EnvData, code: string, input: string, cb: Callback) => void;
}
