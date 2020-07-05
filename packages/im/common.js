function successResponse () {
  return {
    success: true,
    errMsg: ''
  }
}

function failedResponse (errMsg) {
  return {
    success: false,
    errMsg: errMsg
  }
}

module.exports = {
  successResponse,
  failedResponse
}
