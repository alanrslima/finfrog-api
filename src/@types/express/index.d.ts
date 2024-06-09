type FileDTO = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
};

declare namespace Express {
  export interface Request {
    user: any;
    session?: { id: string };
    startedAt: number;
    files?: FileDTO[];
    file?: FileDTO;
  }

  export interface Response {
    responser: (
      status: number,
      message: string,
      data: any,
      error: any,
      type: string
    ) => void;
  }
}
