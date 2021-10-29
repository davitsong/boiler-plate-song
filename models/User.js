const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; //salt가 몇글자인지 -> salt생성
const jwt = require('jsonwebtoken');


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


userSchema.pre('save',function(next){  //user모델으 유저 정보를 저장하기전에 fucntion 실행
    //비밀번호를 암호화 시킨다.
    var user = this;

    if(user.isModified('password')){

        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
    
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash // hash 된 비밀번호로 바꿔줌
                // Store hash in your password DB.
                next()
            });
        });
    } else {
        next()
    }
});

   
   

userSchema.methods.comparePassword = function(plainPassword, cb){
    
    //plainPassword 1234567 암호화된 비밀번호 $2b$10$xBINKV/ZJ8c7c1RD2f9qm.HLvvyDUPTSmudWLjYcCZsZAxOVQcRua
    bcrypt.compare(plainPassword,this.password,function(err,isMatch){
        if(err) return cb(err)
            cb(null,isMatch)
    })
}


userSchema.methods.generateToken = function(cb){
    
    var user = this;
    console.log('user._id',user._id)

    // jsonwebtoken을 사용하여 토큰 생성하기
    var token =jwt.sign(user._id.toHexString(), 'secretToekn')

    user.token = token
    user.save(function(err,user){
        if(err) return cb(err)
        cb(null, user)
    })

    //user._id + 'secretToken' = token 

}



const User = mongoose.model('User',userSchema)           // userSchema로 User model 생성

module.exports={User}    //다른파일에서 사용가능