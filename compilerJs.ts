import { Callback, EnvData } from "./types";

const fs = require("fs");
const compileCPPModule = require("./CppModule");
const PythonModule = require("./PythonModule");
const JavaModule = require("./JavaModule");
exports.init = function () {
  const dir = "./code";
  if (!fs.existsSync(dir)) {
    console.log("Code directory created");
    fs.mkdirSync("./code");
  }
};
exports.compileCPP = (envData: EnvData, code: string, cb: Callback) => {
  compileCPPModule.CompileCPP(envData, code, cb);
};
exports.compileCPPWithInput = (
  envData: EnvData,
  code: string,
  input: string,
  cb: Callback
) => {
  compileCPPModule.CompileCPPWithInput(envData, code, input, cb);
};
exports.compilePy = (envData: EnvData, code: string, cb: Callback) => {
  PythonModule.CompilePyModule(envData, code, cb);
};
exports.compilePyWithInput = (
  envData: EnvData,
  code: string,
  input: string,
  cb: Callback
) => {
  PythonModule.CompilePyModuleWithInput(envData, code, input, cb);
};
exports.compileJava = (envData: EnvData, code: string, cb: Callback) => {
  JavaModule.JavaModuleCompile(envData, code, cb);
};
exports.compileJavaWithInput = (
  envData: EnvData,
  code: string,
  input: string,
  cb: Callback
) => {
  JavaModule.JavaModuleCompileWithInput(envData, code, input, cb);
};
