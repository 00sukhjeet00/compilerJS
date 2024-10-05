import fs from "fs";
import { exec } from "child_process";
import cuid from "cuid";

interface EnvData {
  ext: string;
  options: {
    timeout?: number;
  };
}

type Callback = (output: {
  out?: string;
  error?: string;
  timeout?: boolean;
}) => void;

const CompilePyModule = (
  envData: EnvData,
  code: string,
  cb: Callback
): void => {
  if (envData.ext !== "py") {
    console.log(`[x]INFO: Provide py ext.`);
  } else {
    const fileName: string = cuid.slug();
    const path: string = "./code/";
    fs.writeFile(
      `${path}${fileName}.py`,
      code,
      (err: NodeJS.ErrnoException | null) => {
        if (err) {
          console.log(`[x]ERROR: ${err}`);
        } else {
          let programNotFinished: boolean = true;
          console.log(`[+]INFO: ${fileName}.py is created`);
          const command: string = `python ${path}${fileName}.py`;
          exec(
            command,
            (error: Error | null, stdout: string, stderr: string) => {
              if (error) {
                console.log(
                  `[+]ERROR: ${fileName}.py contained error while compiling`
                );
                const out = { error: stderr };
                cb(out);
              } else {
                if (programNotFinished) {
                  programNotFinished = false;
                  console.log(`[+]INFO: ${fileName}.py successfully executed`);
                  cb({ out: stdout });
                }
              }
            }
          );
          if (envData.options.timeout) {
            setTimeout(() => {
              if (programNotFinished) {
                programNotFinished = false;
                console.log(`[+]INFO: ${fileName}.py has been terminated`);
                const out = { timeout: true };
                cb(out);
              }
            }, envData.options.timeout);
          }
        }
      }
    );
  }
};

const CompilePyModuleWithInput = (
  envData: EnvData,
  code: string,
  input: string | undefined,
  cb: Callback
): void => {
  if (envData.ext !== "py") {
    console.log(`[x]INFO: Provide py ext.`);
  } else {
    const fileName: string = cuid.slug();
    const path: string = "./code/";
    fs.writeFile(
      `${path}${fileName}.py`,
      code,
      (err: NodeJS.ErrnoException | null) => {
        if (err) {
          console.log(`[x]INFO: ${err}`);
        } else {
          if (!input) {
            console.log("[x]INFO: Input is not provided");
          } else {
            fs.writeFile(
              `${path}${fileName}input.txt`,
              input,
              (err: NodeJS.ErrnoException | null) => {
                if (err) {
                  console.log(`[x]ERROR: ${err}`);
                } else {
                  let programNotFinished = true;
                  const command: string = `python ${path}${fileName}.py < ${path}${fileName}input.txt`;
                  exec(
                    command,
                    (error: Error | null, stdout: string, stderr: string) => {
                      if (error) {
                        console.log(
                          `[x]ERROR: Error while executing ${fileName}.py`
                        );
                        const out = { error: stderr };
                        cb(out);
                      } else {
                        if (programNotFinished) {
                          programNotFinished = false;
                          console.log(
                            `[+]INFO: ${fileName}.py executed successfully`
                          );
                          cb({ out: stdout });
                        }
                      }
                    }
                  );
                  if (envData.options.timeout) {
                    setTimeout(() => {
                      if (programNotFinished) {
                        programNotFinished = false;
                        console.log(
                          `[+]INFO: ${fileName}.py has been terminated`
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
      }
    );
  }
};

export { CompilePyModule, CompilePyModuleWithInput };
