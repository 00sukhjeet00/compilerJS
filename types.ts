export interface EnvData {
  ext: string;
  options: {
    timeout?: number;
  };
}

export type Callback = (output: {
  error?: string;
  output?: string;
  timeout?: boolean;
}) => void;
