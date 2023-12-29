function Response(status, code, message, data) {
   let response = {
      status: !!status,
      code: code ? code : 200,
      message: message ? message : "Success",
      data: data ? data : null,
   }
   return response
}

module.exports = {
   Response
};