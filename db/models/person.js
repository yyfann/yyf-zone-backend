const mongoose = require('mongoose')

// 建立一个数据结构
let personSchema = new mongoose.Schema({
  name: String,
  age: Number,
})

// 使用数据结构创建一个表
const Person = mongoose.model('Person', personSchema)

module.exports = Person
