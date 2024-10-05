import fs from "fs";
import cuid from "cuid";
import { exec } from "child_process";
import { Callback, EnvData } from "./types";

const CompileCPP = (envData: EnvData, code: string, cb: Callback): void => {
  const fileName: string = cuid.slug();
  const path: string = "./code/";
  fs.writeFile(
    `${path}${fileName}.cpp`,
    code,
    (err: NodeJS.ErrnoException | null) => {
      if (err) {
        console.log("[x]ERROR: ", err);
      } else {
        console.log(`[+]INFO: ${fileName}.cpp created.`);
        if (envData.ext === "g++") {
          const command: string = `g++ ${path}${fileName}.cpp -o ${path}${fileName}.exe`;
          exec(
            command,
            (error: Error | null, stdout: string, stderr: string) => {
              if (error) {
                console.log(
                  `[x]INFO: ${fileName}.cpp contained error while compiling`
                );
                const out = { error: stderr };
                cb(out);
              } else {
                let programNotFinished: boolean = true;
                const tmpcommand: string = `cd code & ${fileName}`;
                exec(
                  tmpcommand,
                  (error: Error | null, stdout: string, stderr: string) => {
                    if (error) {
                      const out = { error: stderr };
                      cb(out);
                    } else {
                      if (programNotFinished) {
                        programNotFinished = false;
                        console.log(
                          `[+]INFO: ${fileName}.cpp successfully compiled and executed`
                        );
                        const out = { output: stdout };
                        cb(out);
                      }
                    }
                  }
                );
                if (envData.options.timeout) {
                  setTimeout(() => {
                    exec(
                      `cd code & taskkill /im ${fileName}.exe /f > nul`,
                      (error: Error | null, stdout: string, stderr: string) => {
                        if (programNotFinished) {
                          programNotFinished = false;
                          console.log(
                            `[+]INFO: ${fileName}.exe has been terminated after ${envData.options.timeout}`
                          );
                          const out = { timeout: true };
                          cb(out);
                        }
                      }
                    );
                  }, envData.options.timeout);
                }
              }
            }
          );
        } else if (envData.ext === "gcc") {
          const command: string = `gcc ${path}${fileName}.cpp -o ${path}${fileName}.out`;
          exec(
            command,
            (error: Error | null, stdout: string, stderr: string) => {
              if (error) {
                console.log(`[x]ERROR: ${error}`);
                const out = { error: stderr };
                cb(out);
              } else {
                let programNotFinished: boolean = true;
                const tmpcommand: string = `${path}${fileName}.out`;
                exec(
                  tmpcommand,
                  (error: Error | null, stdout: string, stderr: string) => {
                    if (error) {
                      console.log(
                        `[x]ERROR: ${fileName}.cpp contained an error while executing`
                      );
                      const out = { error: stderr };
                      cb(out);
                    } else {
                      console.log(
                        `[+]INFO: ${fileName}.cpp successfully compiled and executed`
                      );
                      const out = { output: stdout };
                      cb(out);
                    }
                  }
                );
                if (envData.options.timeout) {
                  setTimeout(() => {
                    exec(
                      `cd code & killall ${fileName}.out`,
                      (error: Error | null, stdout: string, stderr: string) => {
                        if (programNotFinished) {
                          programNotFinished = false;
                          console.log(
                            `[+]INFO: ${fileName}.exe has been terminated after ${envData.options.timeout}`
                          );
                          const out = { timeout: true };
                          cb(out);
                        }
                      }
                    );
                  }, envData.options.timeout);
                }
              }
            }
          );
        } else {
          console.log("[x]ERROR: Choose either g++ or gcc");
        }
      }
    }
  );
};

const CompileCPPWithInput = (
  envData: EnvData,
  code: string,
  input: string | null,
  cb: Callback
): void => {
  const fileName: string = cuid.slug();
  const path: string = "./code/";
  fs.writeFile(
    `${path}${fileName}.cpp`,
    code,
    (err: NodeJS.ErrnoException | null) => {
      if (err) {
        console.log(`[x]ERROR: ${err}`);
      } else {
        console.log(`[+]INFO: ${fileName}.cpp created`);
        if (envData.ext === "g++") {
          const command: string = `g++ ${path}${fileName}.cpp -o ${path}${fileName}.exe`;
          exec(
            command,
            (error: Error | null, stdout: string, stderr: string) => {
              if (error) {
                console.log(`[x]ERROR: Compile error`);
                const out = { error: stderr };
                cb(out);
              } else {
                if (input) {
                  const inputfile: string = `${fileName}input.txt`;
                  fs.writeFile(
                    `${path}${inputfile}`,
                    input,
                    (err: NodeJS.ErrnoException | null) => {
                      if (err) {
                        console.log(`[x]ERROR: ${err}`);
                      } else {
                        console.log(`[+]INFO: ${inputfile}(inputfile) created`);
                      }
                    }
                  );
                  let programNotFinished: boolean = true;
                  const tmpcommand: string = `cd code & ${fileName}`;
                  exec(
                    `${tmpcommand} < ${inputfile}`,
                    (error: Error | null, stdout: string, stderr: string) => {
                      if (error) {
                        console.log(`[x]ERROR: error while executing`);
                        const out = { error: stderr };
                        cb(out);
                      } else {
                        if (programNotFinished) {
                          programNotFinished = false;
                          console.log(
                            `[+]INFO: ${fileName}.cpp successfully compiled and executed`
                          );
                          const out = { output: stdout };
                          cb(out);
                        }
                      }
                    }
                  );
                  if (envData.options.timeout) {
                    setTimeout(() => {
                      exec(
                        `cd code & taskkill /im ${fileName}.exe /f > nul`,
                        (
                          error: Error | null,
                          stdout: string,
                          stderr: string
                        ) => {
                          if (programNotFinished) {
                            programNotFinished = false;
                            console.log(
                              `[+]INFO: ${fileName}.exe has been terminated after ${envData.options.timeout}`
                            );
                            const out = { timeout: true };
                            cb(out);
                          }
                        }
                      );
                    }, envData.options.timeout);
                  }
                } else {
                  console.log(`[+]INFO: Input missing for ${fileName}.cpp`);
                  const out = { error: "Input must be provided" };
                  cb(out);
                }
              }
            }
          );
        } else if (envData.ext === "gcc") {
          const command: string = `gcc ${path}${fileName}.cpp -o ${path}${fileName}.out`;
          exec(
            command,
            (error: Error | null, stdout: string, stderr: string) => {
              if (error) {
                console.log(`[x]ERROR: Compile error`);
                const out = { error: stderr };
                cb(out);
              } else {
                if (input) {
                  const inputfile: string = `${fileName}input.txt`;
                  fs.writeFile(
                    `${path}${inputfile}`,
                    input,
                    (err: NodeJS.ErrnoException | null) => {
                      if (err) {
                        console.log(`[x]ERROR: ${err}`);
                      } else {
                        console.log(`[+]INFO: ${inputfile}(inputfile) created`);
                      }
                    }
                  );
                  let programNotFinished = true;
                  const tmpcommand: string = `cd code & ${fileName}`;
                  exec(
                    `${tmpcommand} < ${inputfile}`,
                    (error: Error | null, stdout: string, stderr: string) => {
                      if (error) {
                        console.log(`[x]ERROR: error while executing`);
                        const out = { error: stderr };
                        cb(out);
                      } else {
                        if (programNotFinished) {
                          programNotFinished = false;
                          console.log(
                            `[+]INFO: ${fileName}.cpp successfully compiled and executed`
                          );
                          const out = { output: stdout };
                          cb(out);
                        }
                      }
                    }
                  );
                  if (envData.options.timeout) {
                    setTimeout(() => {
                      exec(
                        `cd code & killall ${fileName}.out`,
                        (
                          error: Error | null,
                          stdout: string,
                          stderr: string
                        ) => {
                          if (programNotFinished) {
                            programNotFinished = false;
                            console.log(
                              `[+]INFO: ${fileName}.exe has been terminated after ${envData.options.timeout}`
                            );
                            const out = { timeout: true };
                            cb(out);
                          }
                        }
                      );
                    }, envData.options.timeout);
                  }
                } else {
                  console.log(`[+]INFO: Input missing for ${fileName}.cpp`);
                  const out = { error: "Input must be provided" };
                  cb(out);
                }
              }
            }
          );
        } else {
          console.log("[x]ERROR: Choose either g++ or gcc");
        }
      }
    }
  );
};

export const compileCPPModule = { CompileCPP, CompileCPPWithInput };
