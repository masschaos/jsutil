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

function getType (obj) {
  var type = Object.prototype.toString.call(obj).match(/^\[object (.*)\]$/)[1].toLowerCase()
  if (type === 'string' && typeof obj === 'object') return 'object'
  if (obj === null) return 'null'
  if (obj === undefined) return 'undefined'
  return type
}

module.exports = {
  successResponse,
  failedResponse,
  getType
}
