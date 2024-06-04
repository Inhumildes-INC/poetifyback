class CustomError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  class NotFoundError extends CustomError {
    constructor(message = 'Not Found') {
      super(message, 404);
    }
  }
  
  class BadRequestError extends CustomError {
    constructor(message = 'Bad Request') {
      super(message, 400);
    }
  }
  
  class InternalServerError extends CustomError {
    constructor(message = 'Internal Server Error') {
      super(message, 500);
    }
  }
  
  module.exports = {
    CustomError,
    NotFoundError,
    BadRequestError,
    InternalServerError,
  };
  