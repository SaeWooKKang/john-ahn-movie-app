const mongoose = require('mongoose');
const bcript = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true, 
    unique: 1
  },
  password: {
    type: String,
    minlength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  image: String,
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
});

// 저장 전 암호화
userSchema.pre('save', function(next) {
  let user = this; // User의 인스턴스
  if(user.isModified('password')) {
    // 비밀 번호를 암호화 시킨다.
    bcript.genSalt(saltRounds, (err, salt) => {
      if(err) return next(err);

      bcript.hash(user.password, salt, (err, hash) => {
        if(err) return next(err);
        user.password = hash;
        next();
      })
    })
  } else {
    next();
  }
})

// 스키마를 맵핑한 모델의 프로퍼티 메서드 할당됨 
userSchema.methods.comparePassword = function (plainPassword, cb) {
  // plainPassword 12345566  암호화된 비밀번호  2344$#$#$#$ㄹㄴㄴㅇㄹㄴ
  // this 는 user 객체
  // console.log(this.password); // 암호화된 비밀번호
  bcript.compare(plainPassword, this.password, (err, isMatch) => {
    if(err) return cb(err);
    // console.log('match: ', isMatch); // boolean 값 
    cb(null, isMatch);
  });
};

// token 생성
userSchema.methods.generateToken = function(cb) {
  
  let user = this;
  // jsonwebtoken을 이용해서 token을 생성하기
  let token = jwt.sign(user._id.toHexString(), 'secretToken');

  // user._id + 'secretToken' = token
  // ->
  // 'secretToken' -> user._id

  user.token = token;
  // db 저장, cb 호출로 client 쿠키에 저장
  user.save((err, user) => {
    if(err) return cb(err)
    cb(null, user)
  });
};

// 정적 메서드 정의
userSchema.statics.findByToken = function (token, cb) {
  let user = this; // User
  // user._id + '' = token
  // 토큰을 decode 한다.
  jwt.verify(token, 'secretToken', (err, decoded) => {
    
    // 유저 아이디를 이용해서 유저를 찾은 다음에 
    // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
    user.findOne({"_id": decoded, "token": token}, (err, user) => {
      if(err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model('User', userSchema);

module.exports = {User};