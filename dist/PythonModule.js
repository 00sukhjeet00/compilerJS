"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompilePyModuleWithInput = exports.CompilePyModule = void 0;
const fs_1 = __importDefault(require("fs"));
const child_process_1 = require("child_process");
const cuid_1 = __importDefault(require("cuid"));
const CompilePyModule = (envData, code, cb) => {
    if (envData.ext !== "py") {
        console.log(`[x]INFO: Provide py ext.`);
    }
    else {
        const fileName = cuid_1.default.slug();
        const path = "./code/";
        fs_1.default.writeFile(`${path}${fileName}.py`, code, (err) => {
            if (err) {
                console.log(`[x]ERROR: ${err}`);
            }
            else {
                let programNotFinished = true;
                console.log(`[+]INFO: ${fileName}.py is created`);
                const command = `python ${path}${fileName}.py`;
                (0, child_process_1.exec)(command, (error, stdout, stderr) => {
                    if (error) {
                        console.log(`[+]ERROR: ${fileName}.py contained error while compiling`);
                        const out = { error: stderr };
                        cb(out);
                    }
                    else {
                        if (programNotFinished) {
                            programNotFinished = false;
                            console.log(`[+]INFO: ${fileName}.py successfully executed`);
                            cb({ out: stdout });
                        }
                    }
                });
                if (envData.options.timeout) {
                    setTimeout(() => {
                        if (programNotFinished) {
                            programNotFinished = false;
                            console.log(`[+]INFO: ${fileName}.py has been terminated`);
                            const out = { timeout: true };
                            cb(out);
                        }
                    }, envData.options.timeout);
                }
            }
        });
    }
};
exports.CompilePyModule = CompilePyModule;
const CompilePyModuleWithInput = (envData, code, input, cb) => {
    if (envData.ext !== "py") {
        console.log(`[x]INFO: Provide py ext.`);
    }
    else {
        const fileName = cuid_1.default.slug();
        const path = "./code/";
        fs_1.default.writeFile(`${path}${fileName}.py`, code, (err) => {
            if (err) {
                console.log(`[x]INFO: ${err}`);
            }
            else {
                if (!input) {
                    console.log("[x]INFO: Input is not provided");
                }
                else {
                    fs_1.default.writeFile(`${path}${fileName}input.txt`, input, (err) => {
                        if (err) {
                            console.log(`[x]ERROR: ${err}`);
                        }
                        else {
                            let programNotFinished = true;
                            const command = `python ${path}${fileName}.py < ${path}${fileName}input.txt`;
                            (0, child_process_1.exec)(command, (error, stdout, stderr) => {
                                if (error) {
                                    console.log(`[x]ERROR: Error while executing ${fileName}.py`);
                                    const out = { error: stderr };
                                    cb(out);
                                }
                                else {
                                    if (programNotFinished) {
                                        programNotFinished = false;
                                        console.log(`[+]INFO: ${fileName}.py executed successfully`);
                                        cb({ out: stdout });
                                    }
                                }
                            });
                            if (envData.options.timeout) {
                                setTimeout(() => {
                                    if (programNotFinished) {
                                        programNotFinished = false;
                                        console.log(`[+]INFO: ${fileName}.py has been terminated`);
                                        const out = { timeout: true };
                                        cb(out);
                                    }
                                }, envData.options.timeout);
                            }
                        }
                    });
                }
            }
        });
    }
};
exports.CompilePyModuleWithInput = CompilePyModuleWithInput;
