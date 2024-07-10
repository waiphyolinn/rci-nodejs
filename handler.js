exports.handler = async (event) => {
    var payload;
    try {
      payload = JSON.parse(event.body);
    } catch (error) {
      throw new HTTPError(409, "Invalid input");
    };
  
    console.log('payload', payload);
  };
  
  class HTTPError extends Error {
    constructor(statusCode, message) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  exports.HTTPError = HTTPError;

  
  