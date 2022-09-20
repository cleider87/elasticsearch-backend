// eslint-disable-next-line @typescript-eslint/naming-convention
export interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size?: number;
  destination?: string;
  filename?: string;
  path?: string;
  buffer?: Buffer;
  stream?: NodeJS.ReadableStream;
}
