"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileCPPModule = void 0;
const fs_1 = __importDefault(require("fs"));
const cuid_1 = __importDefault(require("cuid"));
const child_process_1 = require("child_process");
const CompileCPP = (envData, code, cb) => {
    const fileName = cuid_1.default.slug();
    const path = "./code/";
    fs_1.default.writeFile(`${path}${fileName}.cpp`, code, (err) => {
        if (err) {
            console.log("[x]ERROR: ", err);
        }
        else {
            console.log(`[+]INFO: ${fileName}.cpp created.`);
            if (envData.ext === "g++") {
                const command = `g++ ${path}${fileName}.cpp -o ${path}${fileName}.exe`;
                (0, child_process_1.exec)(command, (error, stdout, stderr) => {
                    if (error) {
                        console.log(`[x]INFO: ${fileName}.cpp contained error while compiling`);
                        const out = { error: stderr };
                        cb(out);
                    }
                    else {
                        let programNotFinished = true;
                        const tmpcommand = `cd code & ${fileName}`;
                        (0, child_process_1.exec)(tmpcommand, (error, stdout, stderr) => {
                            if (error) {
                                const out = { error: stderr };
                                cb(out);
                            }
                            else {
                                if (programNotFinished) {
                                    programNotFinished = false;
                                    console.log(`[+]INFO: ${fileName}.cpp successfully compiled and executed`);
                                    const out = { output: stdout };
                                    cb(out);
                                }
                            }
                        });
                        if (envData.options.timeout) {
                            setTimeout(() => {
                                (0, child_process_1.exec)(`cd code & taskkill /im ${fileName}.exe /f > nul`, (error, stdout, stderr) => {
                                    if (programNotFinished) {
                                        programNotFinished = false;
                                        console.log(`[+]INFO: ${fileName}.exe has been terminated after ${envData.options.timeout}`);
                                        const out = { timeout: true };
                                        cb(out);
                                    }
                                });
                            }, envData.options.timeout);
                        }
                    }
                });
            }
            else if (envData.ext === "gcc") {
                const command = `gcc ${path}${fileName}.cpp -o ${path}${fileName}.out`;
                (0, child_process_1.exec)(command, (error, stdout, stderr) => {
                    if (error) {
                        console.log(`[x]ERROR: ${error}`);
                        const out = { error: stderr };
                        cb(out);
                    }
                    else {
                        let programNotFinished = true;
                        const tmpcommand = `${path}${fileName}.out`;
                        (0, child_process_1.exec)(tmpcommand, (error, stdout, stderr) => {
                            if (error) {
                                console.log(`[x]ERROR: ${fileName}.cpp contained an error while executing`);
                                const out = { error: stderr };
                                cb(out);
                            }
                            else {
                                console.log(`[+]INFO: ${fileName}.cpp successfully compiled and executed`);
                                const out = { output: stdout };
                                cb(out);
                            }
                        });
                        if (envData.options.timeout) {
                            setTimeout(() => {
                                (0, child_process_1.exec)(`cd code & killall ${fileName}.out`, (error, stdout, stderr) => {
                                    if (programNotFinished) {
                                        programNotFinished = false;
                                        console.log(`[+]INFO: ${fileName}.exe has been terminated after ${envData.options.timeout}`);
                                        const out = { timeout: true };
                                        cb(out);
                                    }
                                });
                            }, envData.options.timeout);
                        }
                    }
                });
            }
            else {
                console.log("[x]ERROR: Choose either g++ or gcc");
            }
        }
    });
};
const CompileCPPWithInput = (envData, code, input, cb) => {
    const fileName = cuid_1.default.slug();
    const path = "./code/";
    fs_1.default.writeFile(`${path}${fileName}.cpp`, code, (err) => {
        if (err) {
            console.log(`[x]ERROR: ${err}`);
        }
        else {
            console.log(`[+]INFO: ${fileName}.cpp created`);
            if (envData.ext === "g++") {
                const command = `g++ ${path}${fileName}.cpp -o ${path}${fileName}.exe`;
                (0, child_process_1.exec)(command, (error, stdout, stderr) => {
                    if (error) {
                        console.log(`[x]ERROR: Compile error`);
                        const out = { error: stderr };
                        cb(out);
                    }
                    else {
                        if (input) {
                            const inputfile = `${fileName}input.txt`;
                            fs_1.default.writeFile(`${path}${inputfile}`, input, (err) => {
                                if (err) {
                                    console.log(`[x]ERROR: ${err}`);
                                }
                                else {
                                    console.log(`[+]INFO: ${inputfile}(inputfile) created`);
                                }
                            });
                            let programNotFinished = true;
                            const tmpcommand = `cd code & ${fileName}`;
                            (0, child_process_1.exec)(`${tmpcommand} < ${inputfile}`, (error, stdout, stderr) => {
                                if (error) {
                                    console.log(`[x]ERROR: error while executing`);
                                    const out = { error: stderr };
                                    cb(out);
                                }
                                else {
                                    if (programNotFinished) {
                                        programNotFinished = false;
                                        console.log(`[+]INFO: ${fileName}.cpp successfully compiled and executed`);
                                        const out = { output: stdout };
                                        cb(out);
                                    }
                                }
                            });
                            if (envData.options.timeout) {
                                setTimeout(() => {
                                    (0, child_process_1.exec)(`cd code & taskkill /im ${fileName}.exe /f > nul`, (error, stdout, stderr) => {
                                        if (programNotFinished) {
                                            programNotFinished = false;
                                            console.log(`[+]INFO: ${fileName}.exe has been terminated after ${envData.options.timeout}`);
                                            const out = { timeout: true };
                                            cb(out);
                                        }
                                    });
                                }, envData.options.timeout);
                            }
                        }
                        else {
                            console.log(`[+]INFO: Input missing for ${fileName}.cpp`);
                            const out = { error: "Input must be provided" };
                            cb(out);
                        }
                    }
                });
            }
            else if (envData.ext === "gcc") {
                const command = `gcc ${path}${fileName}.cpp -o ${path}${fileName}.out`;
                (0, child_process_1.exec)(command, (error, stdout, stderr) => {
                    if (error) {
                        console.log(`[x]ERROR: Compile error`);
                        const out = { error: stderr };
                        cb(out);
                    }
                    else {
                        if (input) {
                            const inputfile = `${fileName}input.txt`;
                            fs_1.default.writeFile(`${path}${inputfile}`, input, (err) => {
                                if (err) {
                                    console.log(`[x]ERROR: ${err}`);
                                }
                                else {
                                    console.log(`[+]INFO: ${inputfile}(inputfile) created`);
                                }
                            });
                            let programNotFinished = true;
                            const tmpcommand = `cd code & ${fileName}`;
                            (0, child_process_1.exec)(`${tmpcommand} < ${inputfile}`, (error, stdout, stderr) => {
                                if (error) {
                                    console.log(`[x]ERROR: error while executing`);
                                    const out = { error: stderr };
                                    cb(out);
                                }
                                else {
                                    if (programNotFinished) {
                                        programNotFinished = false;
                                        console.log(`[+]INFO: ${fileName}.cpp successfully compiled and executed`);
                                        const out = { output: stdout };
                                        cb(out);
                                    }
                                }
                            });
                            if (envData.options.timeout) {
                                setTimeout(() => {
                                    (0, child_process_1.exec)(`cd code & killall ${fileName}.out`, (error, stdout, stderr) => {
                                        if (programNotFinished) {
                                            programNotFinished = false;
                                            console.log(`[+]INFO: ${fileName}.exe has been terminated after ${envData.options.timeout}`);
                                            const out = { timeout: true };
                                            cb(out);
                                        }
                                    });
                                }, envData.options.timeout);
                            }
                        }
                        else {
                            console.log(`[+]INFO: Input missing for ${fileName}.cpp`);
                            const out = { error: "Input must be provided" };
                            cb(out);
                        }
                    }
                });
            }
            else {
                console.log("[x]ERROR: Choose either g++ or gcc");
            }
        }
    });
};
exports.compileCPPModule = { CompileCPP, CompileCPPWithInput };
