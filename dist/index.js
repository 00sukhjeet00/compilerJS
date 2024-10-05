"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileJavaWithInput = exports.compileJava = exports.compilePyWithInput = exports.compilePy = exports.compileCPPWithInput = exports.compileCPP = exports.init = void 0;
const fs = require("fs");
const compileCPPModule = require("./CppModule");
const PythonModule = require("./PythonModule");
const JavaModule = require("./JavaModule");
const init = () => {
    const dir = "./code";
    if (!fs.existsSync(dir)) {
        console.log("Code directory created");
        fs.mkdirSync("./code");
    }
};
exports.init = init;
const compileCPP = (envData, code, cb) => {
    compileCPPModule.CompileCPP(envData, code, cb);
};
exports.compileCPP = compileCPP;
const compileCPPWithInput = (envData, code, input, cb) => {
    compileCPPModule.CompileCPPWithInput(envData, code, input, cb);
};
exports.compileCPPWithInput = compileCPPWithInput;
const compilePy = (envData, code, cb) => {
    PythonModule.CompilePyModule(envData, code, cb);
};
exports.compilePy = compilePy;
const compilePyWithInput = (envData, code, input, cb) => {
    PythonModule.CompilePyModuleWithInput(envData, code, input, cb);
};
exports.compilePyWithInput = compilePyWithInput;
const compileJava = (envData, code, cb) => {
    JavaModule.JavaModuleCompile(envData, code, cb);
};
exports.compileJava = compileJava;
const compileJavaWithInput = (envData, code, input, cb) => {
    JavaModule.JavaModuleCompileWithInput(envData, code, input, cb);
};
exports.compileJavaWithInput = compileJavaWithInput;
