const express = require('express');
const app = express();
const port = 8000;
// const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { auth } = require('./middleware/auth.js');

const config = require('./config/key.js');

// application/x-wwww-formurlencoded
app.use(express.urlencoded({extended: true})); // body-parser 가 express에 내장
// application/json
app.use(express.json());
app.use(cookieParser());

const {User} = require('./models/User.js');

const mongoose = require('mongoose');

mongoose.connect(config.mongoURI
  // {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // userCreateIndex: true,
    //  useFindAndModify: false
  // }
).then(() => console.log('MongoDb Connected...'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World!'));

// 회원 가입을 위한 route
// User 스키마를 맵핑한 모델(클래스)로 인스턴스 만들고, 암호화 후 db에 저장
app.post('/api/users/register', (req, res) => {
  // client에서 회원가입 데이터를 받고,  
  // 그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body);

  user.save((err, userInfo) => {
    
    if (err) return res.json({success: false, err});
    // console.log('userInfo', userInfo);
    return res.status(200).json({
      success: true
    });
  });
});

app.post('/api/users/login', (req, res) => {
  // 요청된 이메일을 데이터베이스에서 있는지 찾는다
  // 일치하는 데이터가 있으면, findOne() 메서드의 두번째 인자인 콜백함수에 
  // 두 번째 값으로 전달된다.
  // 찾는 값이 없으면 첫번째 인자에 err로,,
  // 찾는 값이 있으면 해당 user 인스턴스가 두번쨰 인자로 들어감
  User.findOne({email: req.body.email}, (err, user) => {
    if(!user) return res.json({
      loginSuccess: false,
      message: "제공된 이메일에 해당하는 유저가 없습니다."
    });
    // console.log(user); 해당 id user의 전체 데이터 담겨 있음

    // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch)
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})

      // 비밀번호까지 맞다면 토큰을 생성하기.
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);
        // token을 저장한다. 어디에 ? 쿠키 , 로컬스토리지
        res.cookie("x_auth", user.token)
        .status(200)
        .json({loginSuccess: true, userId: user._id})
      })
    })
  })
});

// role 1 어드민 role 2 특정 부서 어드민
// role 0 -> 일반유저 role이 0이 아니면 관계자

app.get('/api/users/auth', auth, (req, res) => {
  // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 True라는 말.
  res.status(200).json({
    _id: req.user._id,
    isAdimin: req.user.role === 0 ? false: true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
});

app.get('/api/users/logout', auth, (req, res) => {
  // auth에서 token으로 user정보 찾고, req에 담아줌 
  // DB에 _id에 해당하는 토큰 지움 
  User.findOneAndUpdate({_id: req.user._id},
    {token: ""},
    (err, user) => {
      if (err) return res.json({success: false, err});
      return res.status(200).send({
        success: true
      })
    })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


