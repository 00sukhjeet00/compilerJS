import { Callback, EnvData } from "./types";
export declare const compileCPPModule: {
    CompileCPP: (envData: EnvData, code: string, cb: Callback) => void;
    CompileCPPWithInput: (envData: EnvData, code: string, input: string | null, cb: Callback) => void;
};
