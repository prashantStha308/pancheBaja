class HelperError extends Error {
  constructor( message = "something went wrong", stack = "", errors = []
  ) {
    super(message);
    this.message = message;
    this.errors = errors; 
    this.success = false;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { HelperError };