const jwt = require('jsonwebtoken')
const secretOrPrivateKey = 'pengyuforever'

// 生成token
exports.createToken = function (username, password) {
  return jwt.sign({username: username, password: password}, secretOrPrivateKey, {
    expiresIn: 60 * 60 * 12
  })
}

// 校验token
exports.checkToken = function (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretOrPrivateKey, (err, decode) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}
