const mongoose = require('mongoose')

// 建立一个表(collection), 描述字段
let personSchema = new mongoose.Schema({
  username: String,
  password: String,
})

// 建立一个数据模型类, 其实例有数据库的增删改查操作
const User = mongoose.model('users', personSchema)

module.exports = User