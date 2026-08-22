export class HttpError extends Error {
  public readonly statusCode: number;
  public readonly message: string;
  public readonly type?: string;

  constructor(statusCode: number, message: string, type?: string) {
    super(message);

    this.message = message;
    this.type = type;
    this.statusCode = statusCode;
    this.name = "HttpError";
  }
}
