export type ResponseType = {
  success: boolean;
  data?: unknown;
  error?: unknown;
}

export type ErrorResponseType = {
  statusCode: number;
  name: string;
  message: string;
  body: string;
}

type ValidationRules = {
  rules: string[];
  keys: string[];
}

export type ValidationErrorResponseType = {
  statusCode: number;
  name: string;
  message: string;
  body?: ValidationRules;
  params?: ValidationRules;
  cookies?: ValidationRules;
  headers?: ValidationRules;
};

/**
 * Класс-конструктор успешных ответов с сервера.
 *
 * @class
 * @name AppResponse
 * @param {unknown} data
 * @return {ResponseType}
 * @see ResponseType
 * */
class AppResponse {
  private readonly data: unknown;

  private readonly success: boolean;

  private response: ResponseType | null;

  constructor(data: unknown, success = true) {
    this.data = data;
    this.success = success;
    this.response = null;
  }

  create() {
    switch (this.success) {
      case false:
        this.response = {
          success: this.success,
          error: this.data,
        };
        break;
      default:
        this.response = {
          success: this.success,
          data: this.data,
        };
        break;
    }
  }

  send(): ResponseType | ErrorResponseType | void {
    this.create();
    this.log();
    if (this.response) return this.response satisfies ResponseType | ErrorResponseType;
  }

  private log() {
    const NODE_ENVIRONMENT = process.env.NODE_ENV || 'development';
    if (NODE_ENVIRONMENT === 'development') {
      console.log(this.response);
    }
  }
}

export default AppResponse;
