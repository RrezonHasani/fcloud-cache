import { BaseException, StatusCodes } from "./base-exception";

class ConflictException extends BaseException {
  readonly message: string;

  constructor(message: string) {
    super("Conflict", StatusCodes.CONFLICT, message);

    this.message = message;
  }
}

class BadRequestException extends BaseException {
  readonly message: string;

  constructor(message: string) {
    super("Bad Request", StatusCodes.BAD_REQUEST, message);

    this.message = message;
  }
}

class AuthorizationException extends BaseException {
  readonly message: string;

  constructor(message = "Permission denied") {
    super("Authorization Error", StatusCodes.UNAUTHORIZED, message);

    this.message = message;
  }
}

class NotFoundException extends BaseException {
  readonly entityName: string;

  constructor(entityName: string, customMessage?: string) {
    super("Not Found", StatusCodes.NOT_FOUND, customMessage || `${entityName} not found.`);

    this.entityName = entityName;
  }
}

class InternalServerException extends BaseException {
  constructor(message = "Internal Server Error") {
    super("Internal Error", StatusCodes.INTERNAL_SERVER, message);
  }
}

class CustomException extends BaseException {
}

class HttpException extends BaseException {
  constructor(name = "Internal Error", status: StatusCodes = StatusCodes.INTERNAL_SERVER, message = "Internal Server Error", errors?: string[]) {
    super(name, status, message, errors);
  }
}

export {
  ConflictException,
  BadRequestException,
  AuthorizationException,
  NotFoundException,
  CustomException,
  InternalServerException,
  HttpException,
};
