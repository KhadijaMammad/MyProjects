class BaseResponse {
  constructor(status, message, data, statusCode = null) {
    this.status = status,
      this.message = message,
      this.data = data;
    if (statusCode !== null)
      this.statusCode = statusCode
  }
}
class SuccessResponse extends BaseResponse {
  // Accepts (statusCode, message, data)
  constructor(statusCode, message, data = null) {
    super(true, message, data, statusCode);
  }
}
class ErrorResponse extends BaseResponse {
  // Accepts (statusCode, message)
  constructor(statusCode, message) {
    super(false, message, null, statusCode);
  }
}

module.exports = { SuccessResponse, ErrorResponse };