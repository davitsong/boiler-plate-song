const express = require('express')         //express module 가져옴
const app = express()
const port = 5000                          //5000번 서버 

const {User} = require("./User")
const bodyParser = require('body-parser')

const config = require("./config/key")

app.use(bodyParser.urlencoded({extended: true  }))


app.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://songbangwon:01068123488@cluster0.3jq85.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MonggoDB connected...'))
  .catch(err => console.log(err))




app.get('/', (req, res) => {
  res.send('Hello Worldsdasdasdasdsdfsassfgsd!')
})

app.post('/register',(req,res)=>{      
  
  const user = new User(req.body)
  
  user.save((err,userInfo)=>{
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})