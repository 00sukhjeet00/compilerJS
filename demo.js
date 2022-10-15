const compilerJs = require('./compilerJs')
compilerJs.init()
const envData = { ext: 'py', options: { timeout: 1000 } }
const code=`print('hello')`
compilerJs.compilePy(envData, code, (data) => {
    if (data.error)
        console.log(data.error)
    else
    {
        if (data.timeout)
            console.log('TLE')
        else
            console.log(data.out)
    }
})