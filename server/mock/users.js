let users = []

exports.users = users

// 添加用户
exports.addUser = function (username, password) {
  let obj = {username: username, password: password}

  users.push(obj)
}

// 校验用户是否存在(其实最好的方法是在前台校验在用户输入的时候)
exports.isExist = function (username) {
  let flag = false
  users.some((item) => {
    if (item.username === username) {
      flag = true
      return false
    } else {
      return true
    }
  })

  return flag
}

// 校验用户密码是否正确
exports.isRight = function (username, password) {
  let flag = false
  users.some((item) => {
    if (item.username === username && item.password === password) {
      flag = true
      return false
    } else {
      return true
    }
  })

  return flag
}
