function ResponseSuccess(status, code, message, data) {
   let response = {
      status: status,
      code: code,
      message: message,
      data: data,
   }
   return response
}

module.exports = {
   ResponseSuccess
};