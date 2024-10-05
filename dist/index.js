"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const compileCPPModule = require("./CppModule");
const PythonModule = require("./PythonModule");
const JavaModule = require("./JavaModule");
class CompileJs {
    constructor() {
        this.init = function () {
            const dir = "./code";
            if (!fs.existsSync(dir)) {
                console.log("Code directory created");
                fs.mkdirSync("./code");
            }
        };
        this.compileCPP = (envData, code, cb) => {
            compileCPPModule.CompileCPP(envData, code, cb);
        };
        this.compileCPPWithInput = (envData, code, input, cb) => {
            compileCPPModule.CompileCPPWithInput(envData, code, input, cb);
        };
        this.compilePy = (envData, code, cb) => {
            PythonModule.CompilePyModule(envData, code, cb);
        };
        this.compilePyWithInput = (envData, code, input, cb) => {
            PythonModule.CompilePyModuleWithInput(envData, code, input, cb);
        };
        this.compileJava = (envData, code, cb) => {
            JavaModule.JavaModuleCompile(envData, code, cb);
        };
        this.compileJavaWithInput = (envData, code, input, cb) => {
            JavaModule.JavaModuleCompileWithInput(envData, code, input, cb);
        };
    }
}
exports.default = CompileJs;
