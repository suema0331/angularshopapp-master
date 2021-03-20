const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');
// const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  // author: ObjectId,
  username: {
    type: String,
    required: true,
    max:[60, 'ユーザー名は最大60文字までです'] },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    max:[60, 'メールアドレスは最大60文字までです'] },
  password: {
    type: String,
    required: true,
    min:[6, 'パスワードは最大6文字以上で入力してください'],
    max:[30, 'パスワードは最大30文字までです'] },
})

// foundUser(this)の暗号化されたpasswordと生のpassword（inputPassword）を比較
UserSchema.methods.hasSamePassword = function(inputPassword) {
  const user = this
  return bcrypt.compareSync(inputPassword, user.password)
}


// save前にこの関数を呼ぶ(暗号化前のpassword)
UserSchema.pre('save',function(next){
  const user = this
  const saltRounds = 10; // 10Round 大きくすると、1hash作るのに時間がかかる

  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      // Store hash in your password DB.
      user.password = hash

      next() // save実行
    });
  });
})

module.exports = mongoose.model('User', UserSchema)
