const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,   //공백가능
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
        type: Number,   //0 일반유저 1관리자
        default: 0
    },
    image: String,
    token: {
        type: String    //유효성
    },
    tokenExp: {
        type: Number    //유효기간
        }
})

const User = mongoose.model('User',userSchema)           // userSchema로 User model 생성

module.exports={User}    //다른파일에서 사용가능