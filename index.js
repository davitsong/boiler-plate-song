const express = require('express')         //express module 가져옴
const app = express()
const port = 5000                          //5000번 서버 
const {User} = require("./models/User")
const bodyParser = require('body-parser')
const config = require("./config/key")


//application /x-www-form-urlencoded 분서해서 가져옴
app.use(bodyParser.urlencoded({extended: true  }))            

//application/jason 타입을 분석해서 가져옴 
app.use(bodyParser.json())


const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://songbangwon:01068123488@cluster0.3jq85.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
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