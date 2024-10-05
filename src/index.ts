import { Callback, EnvData } from "./types";

const fs = require("fs");
const compileCPPModule = require("./CppModule");
const PythonModule = require("./PythonModule");
const JavaModule = require("./JavaModule");

export const init = () => {
  const dir = "./code";
  if (!fs.existsSync(dir)) {
    console.log("Code directory created");
    fs.mkdirSync("./code");
  }
};

export const compileCPP = (envData: EnvData, code: string, cb: Callback) => {
  compileCPPModule.CompileCPP(envData, code, cb);
};

export const compileCPPWithInput = (
  envData: EnvData,
  code: string,
  input: string,
  cb: Callback
) => {
  compileCPPModule.CompileCPPWithInput(envData, code, input, cb);
};

export const compilePy = (envData: EnvData, code: string, cb: Callback) => {
  PythonModule.CompilePyModule(envData, code, cb);
};

export const compilePyWithInput = (
  envData: EnvData,
  code: string,
  input: string,
  cb: Callback
) => {
  PythonModule.CompilePyModuleWithInput(envData, code, input, cb);
};

export const compileJava = (envData: EnvData, code: string, cb: Callback) => {
  JavaModule.JavaModuleCompile(envData, code, cb);
};

export const compileJavaWithInput = (
  envData: EnvData,
  code: string,
  input: string,
  cb: Callback
) => {
  JavaModule.JavaModuleCompileWithInput(envData, code, input, cb);
};
