const fs = require('fs')
const cuid = require('cuid')
const exec = require('child_process').exec
const JavaModuleCompile = (envData, code, cb) => {
    if (envData.ext !== 'java')
        console.log(`[x]INFO: Provide java ext`)
    else {
        const dirName = cuid.slug()
        const path = './code/' + dirName
        fs.mkdir(path, 0777, (err) => {
            if (err)
                console.log(`[x]ERROR: ${err}`)
            else {
                fs.writeFile(`${path}/Main.java`, code, (err) => {
                    if (err)
                        console.log(`[x]ERROR: ${err}`)
                    else {
                        console.log(`[+]INFO: ${path}/Main.java created`)
                        var command = `cd ${path} & javac Main.java`
                        exec(command, (error, stdout, stderr) => {
                            if (error) {
                                console.log(`[x]ERROR: Error while compiling ${path}/Main.java`)
                                const ou = { error: stderr }
                                cb(out)
                            }
                            else {
                                var programNotFinished = true
                                console.log('[+]INFO: successfully compiled Main.java')
                                const command = `cd ${path} & java Main`
                                exec(command, (error, stdout, stderr) => {
                                    if (error) {
                                        const out = { error: stderr }
                                        cb(out)
                                    }
                                    else {
                                        if (programNotFinished) {
                                            programNotFinished = false
                                            console.log(`[+]INFO: ${path}/Main.java Compiled and Executed`)
                                            const out = { output: stdout }
                                            cb(out)
                                        }
                                    }
                                })
                                if (envData.options.timeout) {
                                    setTimeout(() => {
                                        if (programNotFinished) {
                                            programNotFinished = false
                                            console.log(`[+]INFO: ${path}/Main.java has been terminated`)
                                            var out = { timeout: true }
                                            cb(out)
                                        }
                                    }, envData.options.timeout)
                                }
                            }
                        })
                    }
                })
            }
        })
    }
}
const JavaModuleCompileWithInput = (envData, code, input, cb) => {
    if (envData.ext !== 'java')
        console.log(`[x]INFO: Provide java ext`)
    else {
        const dirName = cuid.slug()
        const path = './code/' + dirName
        fs.mkdir(path, 0777, (err) => {
            if (err)
                console.log(`[x]ERROR: ${err}`)
            else {
                fs.writeFile(`${path}/Main.java`, code, (err) => {
                    if (err)
                        console.log(`[x]ERROR: ${err}`)
                    else {
                        console.log(`[+]INFO: ${path}/Main.java created`)
                        fs.writeFile(`${path}/input.txt`, input, (err) => {
                            if (err)
                                console.log(`[x]ERROR: ${err}`)
                            else {
                                var programNotFinished = true
                                var command = `cd ${path} & javac Main.java`
                                exec(command, (error, stdout, stderr) => {
                                    if (err) {
                                        const out = { error: stderr }
                                        cb(out)
                                    }
                                    else {
                                        console.log(`[+]INFO: ${path}/Main.java compiled`)
                                        const command = `cd ${path} & java Main < input.txt`
                                        exec(command, (error, stdout, stderr) => {
                                            if (error) {
                                                const out = { error: stderr }
                                                cb(out)
                                            }
                                            else {
                                                if (programNotFinished) {
                                                    programNotFinished = false
                                                    console.log(`[+]INFO: ${path}/Main.java executed`)
                                                    const out = { ouput: stdout }
                                                    cb(out)
                                                }
                                            }
                                        })
                                        if (envData.options.timeout) {
                                            setTimeout(() => {
                                                if (programNotFinished) {
                                                    programNotFinished = false
                                                    console.log(`[+]INFO: ${path}/Main.java has been terminated`)
                                                    var out = { timeout: true }
                                                    cb(out)
                                                }

                                            }, envData.options.timeout)
                                        }
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }
}
module.exports = { JavaModuleCompile, JavaModuleCompileWithInput }