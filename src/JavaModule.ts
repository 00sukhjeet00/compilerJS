import fs from "fs";
import cuid from "cuid";
import { exec } from "child_process";

interface EnvData {
  ext: string;
  options?: {
    timeout?: number;
  };
}

const JavaModuleCompile = (
  envData: EnvData,
  code: string,
  cb: (output: { error?: string; output?: string; timeout?: boolean }) => void
): void => {
  if (envData.ext !== "java") {
    console.log(`[x]INFO: Provide java ext`);
  } else {
    const dirName: string = cuid.slug();
    const path: string = "./code/" + dirName;
    fs.mkdir(path, 0o777, (err: NodeJS.ErrnoException | null) => {
      if (err) {
        console.log(`[x]ERROR: ${err}`);
      } else {
        fs.writeFile(
          `${path}/Main.java`,
          code,
          (err: NodeJS.ErrnoException | null) => {
            if (err) {
              console.log(`[x]ERROR: ${err}`);
            } else {
              console.log(`[+]INFO: ${path}/Main.java created`);
              const command: string = `cd ${path} & javac Main.java`;
              exec(
                command,
                (error: Error | null, stdout: string, stderr: string) => {
                  if (error) {
                    console.log(
                      `[x]ERROR: Error while compiling ${path}/Main.java`
                    );
                    const out = { error: stderr };
                    cb(out);
                  } else {
                    let programNotFinished: boolean = true;
                    console.log("[+]INFO: successfully compiled Main.java");
                    const command: string = `cd ${path} & java Main`;
                    exec(
                      command,
                      (error: Error | null, stdout: string, stderr: string) => {
                        if (error) {
                          const out = { error: stderr };
                          cb(out);
                        } else {
                          if (programNotFinished) {
                            programNotFinished = false;
                            console.log(
                              `[+]INFO: ${path}/Main.java Compiled and Executed`
                            );
                            const out = { output: stdout };
                            cb(out);
                          }
                        }
                      }
                    );
                    if (envData.options?.timeout) {
                      setTimeout(() => {
                        if (programNotFinished) {
                          programNotFinished = false;
                          console.log(
                            `[+]INFO: ${path}/Main.java has been terminated`
                          );
                          const out = { timeout: true };
                          cb(out);
                        }
                      }, envData.options.timeout);
                    }
                  }
                }
              );
            }
          }
        );
      }
    });
  }
};

const JavaModuleCompileWithInput = (
  envData: EnvData,
  code: string,
  input: string,
  cb: (output: { error?: string; ouput?: string; timeout?: boolean }) => void
): void => {
  if (envData.ext !== "java") {
    console.log(`[x]INFO: Provide java ext`);
  } else {
    const dirName: string = cuid.slug();
    const path: string = "./code/" + dirName;
    fs.mkdir(path, 0o777, (err: NodeJS.ErrnoException | null) => {
      if (err) {
        console.log(`[x]ERROR: ${err}`);
      } else {
        fs.writeFile(
          `${path}/Main.java`,
          code,
          (err: NodeJS.ErrnoException | null) => {
            if (err) {
              console.log(`[x]ERROR: ${err}`);
            } else {
              console.log(`[+]INFO: ${path}/Main.java created`);
              fs.writeFile(
                `${path}/input.txt`,
                input,
                (err: NodeJS.ErrnoException | null) => {
                  if (err) {
                    console.log(`[x]ERROR: ${err}`);
                  } else {
                    let programNotFinished = true;
                    const command: string = `cd ${path} & javac Main.java`;
                    exec(
                      command,
                      (error: Error | null, stdout: string, stderr: string) => {
                        if (error) {
                          const out = { error: stderr };
                          cb(out);
                        } else {
                          console.log(`[+]INFO: ${path}/Main.java compiled`);
                          const command: string = `cd ${path} & java Main < input.txt`;
                          exec(
                            command,
                            (
                              error: Error | null,
                              stdout: string,
                              stderr: string
                            ) => {
                              if (error) {
                                const out = { error: stderr };
                                cb(out);
                              } else {
                                if (programNotFinished) {
                                  programNotFinished = false;
                                  console.log(
                                    `[+]INFO: ${path}/Main.java executed`
                                  );
                                  const out = { ouput: stdout };
                                  cb(out);
                                }
                              }
                            }
                          );
                          if (envData.options?.timeout) {
                            setTimeout(() => {
                              if (programNotFinished) {
                                programNotFinished = false;
                                console.log(
                                  `[+]INFO: ${path}/Main.java has been terminated`
                                );
                                const out = { timeout: true };
                                cb(out);
                              }
                            }, envData.options.timeout);
                          }
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    });
  }
};

export { JavaModuleCompile, JavaModuleCompileWithInput };
