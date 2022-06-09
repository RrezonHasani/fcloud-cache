import { StatusCodes } from "../status-codes";

abstract class BaseException extends Error {
  public readonly name: string;

  public readonly status: StatusCodes;

  public readonly message: string;

  public readonly errors: string[];

  constructor(name: string, status: StatusCodes, message: string, errors: string[] = []) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.message = message;
    this.status = status;
    this.errors = errors;

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }

  toJSON() {
    return {
      name: this.name,
      status: this.status,
      ...(this.errors.length === 0 && { message: this.message }),
      ...(this.errors.length > 0 && { errors: this.errors }),
      ...((process.env.STAGE === "local" || process.env.STAGE === "development") && { stack: this.stack }),
    };
  }
}

export { StatusCodes, BaseException };
