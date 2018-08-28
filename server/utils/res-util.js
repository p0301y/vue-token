exports.resModel = function (obj) {
  let defaultModel = {
    success: true
  }
  return {
    ...defaultModel,
    ...obj
  }
}
