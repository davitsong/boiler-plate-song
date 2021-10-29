const express = require('express')         //express module 가져옴
const app = express()
const port = 5000                          //5000번 서버 
const {User} = require("./models/User")
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")
const config = require("./config/key")


//application /x-www-form-urlencoded 분서해서 가져옴
app.use(bodyParser.urlencoded({extended: true  }))            

//application/jason 타입을 분석해서 가져옴 
app.use(bodyParser.json())
//coockieParser 사용
app.use(cookieParser())


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MonggoDB connected...'))
  .catch(err => console.log(err))



app.get('/', (req, res) => {
  res.send('Hello World!aaf')
})

app.post('/register',(req,res)=>{      
   
  //회원가입할때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터베이스에 넣어준다
  const user = new User(req.body)
  
  user.save((err,userInfo)=>{                         //정보들이 user모델에 저장                      
    if(err) return res.json({success: false, err})    //성공여부를 jason으로 저장
    return res.status(200).json({
      success: true
    })
  })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


//login 기능구현
app.post('/login',(req,res) => {
  
  // 요청된 이메일을 데이터 베이스에서 찾는다
  User.findOne({email:req.body.email},(err,user)=>{
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "no_user"
      })
    }

    // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인.
    user.comparePassword(req.body.password,(err,isMatch)=>{
      if(!isMatch)
      return res.json({loginSuccess: false, message: "wrong_password."})
      
      // 비밀번호까지 맞다면 토큰을 생성하기
    user.generateToken((err,user)=>{
      if(err) return res.status(400).send(err); //error가있다는걸 클라이언트에게 전달
      
      //토큰을 저장한다. 어디에? 쿠키, 로컬스토리지, 세션 ..... 선택!
          res.cookie("x_auth",user.token)//x_auth한다음 저장 쿠키에
          .status(200)//t성공
          .json({loginSuccess: true, userId: user._id})


      })

    })

  })
  
  

})