import { Callback, EnvData } from "./types";
export declare const init: () => void;
export declare const compileCPP: (envData: EnvData, code: string, cb: Callback) => void;
export declare const compileCPPWithInput: (envData: EnvData, code: string, input: string, cb: Callback) => void;
export declare const compilePy: (envData: EnvData, code: string, cb: Callback) => void;
export declare const compilePyWithInput: (envData: EnvData, code: string, input: string, cb: Callback) => void;
export declare const compileJava: (envData: EnvData, code: string, cb: Callback) => void;
export declare const compileJavaWithInput: (envData: EnvData, code: string, input: string, cb: Callback) => void;
