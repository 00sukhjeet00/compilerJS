const CompilerJS = require('./compilerJs')
const code =  `i=input()\nprint('Hello World ',i)`
const envData = { OS:'windows', ext: 'pe', options: { timeout: 5 } }
const input='1'
CompilerJS.init()
CompilerJS.compilePyWithInput(envData, code,input, (data) => {
    if (data.error)
        console.log(data.error)
    else
        console.log(data.output)
})