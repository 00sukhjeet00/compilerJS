"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JavaModuleCompileWithInput = exports.JavaModuleCompile = void 0;
const fs_1 = __importDefault(require("fs"));
const cuid_1 = __importDefault(require("cuid"));
const child_process_1 = require("child_process");
const JavaModuleCompile = (envData, code, cb) => {
    if (envData.ext !== "java") {
        console.log(`[x]INFO: Provide java ext`);
    }
    else {
        const dirName = cuid_1.default.slug();
        const path = "./code/" + dirName;
        fs_1.default.mkdir(path, 0o777, (err) => {
            if (err) {
                console.log(`[x]ERROR: ${err}`);
            }
            else {
                fs_1.default.writeFile(`${path}/Main.java`, code, (err) => {
                    if (err) {
                        console.log(`[x]ERROR: ${err}`);
                    }
                    else {
                        console.log(`[+]INFO: ${path}/Main.java created`);
                        const command = `cd ${path} & javac Main.java`;
                        (0, child_process_1.exec)(command, (error, stdout, stderr) => {
                            var _a;
                            if (error) {
                                console.log(`[x]ERROR: Error while compiling ${path}/Main.java`);
                                const out = { error: stderr };
                                cb(out);
                            }
                            else {
                                let programNotFinished = true;
                                console.log("[+]INFO: successfully compiled Main.java");
                                const command = `cd ${path} & java Main`;
                                (0, child_process_1.exec)(command, (error, stdout, stderr) => {
                                    if (error) {
                                        const out = { error: stderr };
                                        cb(out);
                                    }
                                    else {
                                        if (programNotFinished) {
                                            programNotFinished = false;
                                            console.log(`[+]INFO: ${path}/Main.java Compiled and Executed`);
                                            const out = { output: stdout };
                                            cb(out);
                                        }
                                    }
                                });
                                if ((_a = envData.options) === null || _a === void 0 ? void 0 : _a.timeout) {
                                    setTimeout(() => {
                                        if (programNotFinished) {
                                            programNotFinished = false;
                                            console.log(`[+]INFO: ${path}/Main.java has been terminated`);
                                            const out = { timeout: true };
                                            cb(out);
                                        }
                                    }, envData.options.timeout);
                                }
                            }
                        });
                    }
                });
            }
        });
    }
};
exports.JavaModuleCompile = JavaModuleCompile;
const JavaModuleCompileWithInput = (envData, code, input, cb) => {
    if (envData.ext !== "java") {
        console.log(`[x]INFO: Provide java ext`);
    }
    else {
        const dirName = cuid_1.default.slug();
        const path = "./code/" + dirName;
        fs_1.default.mkdir(path, 0o777, (err) => {
            if (err) {
                console.log(`[x]ERROR: ${err}`);
            }
            else {
                fs_1.default.writeFile(`${path}/Main.java`, code, (err) => {
                    if (err) {
                        console.log(`[x]ERROR: ${err}`);
                    }
                    else {
                        console.log(`[+]INFO: ${path}/Main.java created`);
                        fs_1.default.writeFile(`${path}/input.txt`, input, (err) => {
                            if (err) {
                                console.log(`[x]ERROR: ${err}`);
                            }
                            else {
                                let programNotFinished = true;
                                const command = `cd ${path} & javac Main.java`;
                                (0, child_process_1.exec)(command, (error, stdout, stderr) => {
                                    var _a;
                                    if (error) {
                                        const out = { error: stderr };
                                        cb(out);
                                    }
                                    else {
                                        console.log(`[+]INFO: ${path}/Main.java compiled`);
                                        const command = `cd ${path} & java Main < input.txt`;
                                        (0, child_process_1.exec)(command, (error, stdout, stderr) => {
                                            if (error) {
                                                const out = { error: stderr };
                                                cb(out);
                                            }
                                            else {
                                                if (programNotFinished) {
                                                    programNotFinished = false;
                                                    console.log(`[+]INFO: ${path}/Main.java executed`);
                                                    const out = { ouput: stdout };
                                                    cb(out);
                                                }
                                            }
                                        });
                                        if ((_a = envData.options) === null || _a === void 0 ? void 0 : _a.timeout) {
                                            setTimeout(() => {
                                                if (programNotFinished) {
                                                    programNotFinished = false;
                                                    console.log(`[+]INFO: ${path}/Main.java has been terminated`);
                                                    const out = { timeout: true };
                                                    cb(out);
                                                }
                                            }, envData.options.timeout);
                                        }
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
};
exports.JavaModuleCompileWithInput = JavaModuleCompileWithInput;
