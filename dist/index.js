"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const compileCPPModule = require("./CppModule");
const PythonModule = require("./PythonModule");
const JavaModule = require("./JavaModule");
const compileJs = {
    init: () => {
        const dir = "./code";
        if (!fs.existsSync(dir)) {
            console.log("Code directory created");
            fs.mkdirSync("./code");
        }
    },
    compileCPP: (envData, code, cb) => {
        compileCPPModule.CompileCPP(envData, code, cb);
    },
    compileCPPWithInput: (envData, code, input, cb) => {
        compileCPPModule.CompileCPPWithInput(envData, code, input, cb);
    },
    compilePy: (envData, code, cb) => {
        PythonModule.CompilePyModule(envData, code, cb);
    },
    compilePyWithInput: (envData, code, input, cb) => {
        PythonModule.CompilePyModuleWithInput(envData, code, input, cb);
    },
    compileJava: (envData, code, cb) => {
        JavaModule.JavaModuleCompile(envData, code, cb);
    },
    compileJavaWithInput: (envData, code, input, cb) => {
        JavaModule.JavaModuleCompileWithInput(envData, code, input, cb);
    },
};
exports.default = compileJs;
