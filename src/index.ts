import { Callback, EnvData } from "./types";

const fs = require("fs");
const compileCPPModule = require("./CppModule");
const PythonModule = require("./PythonModule");
const JavaModule = require("./JavaModule");

export default class CompileJs {
  init = function () {
    const dir = "./code";
    if (!fs.existsSync(dir)) {
      console.log("Code directory created");
      fs.mkdirSync("./code");
    }
  };
  compileCPP = (envData: EnvData, code: string, cb: Callback) => {
    compileCPPModule.CompileCPP(envData, code, cb);
  };
  compileCPPWithInput = (
    envData: EnvData,
    code: string,
    input: string,
    cb: Callback
  ) => {
    compileCPPModule.CompileCPPWithInput(envData, code, input, cb);
  };
  compilePy = (envData: EnvData, code: string, cb: Callback) => {
    PythonModule.CompilePyModule(envData, code, cb);
  };
  compilePyWithInput = (
    envData: EnvData,
    code: string,
    input: string,
    cb: Callback
  ) => {
    PythonModule.CompilePyModuleWithInput(envData, code, input, cb);
  };
  compileJava = (envData: EnvData, code: string, cb: Callback) => {
    JavaModule.JavaModuleCompile(envData, code, cb);
  };
  compileJavaWithInput = (
    envData: EnvData,
    code: string,
    input: string,
    cb: Callback
  ) => {
    JavaModule.JavaModuleCompileWithInput(envData, code, input, cb);
  };
}
