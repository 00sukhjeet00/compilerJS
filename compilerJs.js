const fs = require('fs')
const compileCPPModule = require('./CppModule')
const PythonModule = require('./PythonModule')
const JavaModule=require('./JavaModule')
exports.init = function () {
    fs.exists('./code', function (exists) {
        if (!exists)
        {
            console.log('Code directory created.')
            fs.mkdirSync('./code')
        }
    })
}
exports.compileCPP = (envData,code,cb) => {
    compileCPPModule.CompileCPP(envData,code,cb)
}
exports.compileCPPWithInput = (envData,code,input,cb) => {
    compileCPPModule.CompileCPPWithInput(envData,code,input,cb)
}
exports.compilePy = (envData, code, cb) => {
    PythonModule.CompilePyModule(envData,code,cb)
}
exports.compilePyWithInput = (envData, code,input, cb) => {
    PythonModule.CompilePyModuleWithInput(envData,code,input,cb)
}
exports.compileJava = (envData, code, cb) => {
    JavaModule.JavaModuleCompile(envData,code,cb)
}
exports.compileJavaWithInput = (envData,code,input,cb) => {
    JavaModule.JavaModuleCompileWithInput(envData,code,input,cb)
}