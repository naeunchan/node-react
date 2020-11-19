const express = require("express")
const app = express()
const port = 3000
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const config = require("./config/key")
const cookieParser = require("cookie-parser")

const {
    auth
} = require("./middleware/auth")
const {
    User
} = require("./models/User")

//application/w-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}))

//application/json 파일 분석 및 가져오기
app.use(bodyParser.json())
app.use(cookieParser())

mongoose.connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err))

app.get("/", (req, res) => res.send("Hello world\n안녕하세요~"))

app.post("/api/users/register", (req, res) => {
    //회원 가입 때 필요한 정보를 client로부터 가져온다.
    // body-parser로 내용을 가져올 수 있다(데이터)
    const user = new User(req.body)
    user.save((err, userInfo) => {
        if (err)
            return res.json({
                success: false,
                err
            })
        return res.status(200).json({
            success: true
        })
    })
})

app.post("/api/users/login", (req, res) => {
    // 요청된 이메일을 DB에서 찾기
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "해당 이메일이 없습니다."
            })
        }

        // 요청된 이메일이 DB에 있다면 비밀번호 검사
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({
                    loginSuccess: false,
                    message: "비밀번호가 틀렸습니다."
                })


            // 비밀번호 일치 시 토큰 생성
            user.generateToken((err, user) => {
                if (err)
                    return res.status(400).send(err)

                // token 저장
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true,
                        userId: user._id
                    })
            })
        })
    })
})

app.get("/api/users/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname
    })
})

app.get("/api/users/logout", auth, (req, res) => {
    User.findOneAndUpdate({
        _id: req.user._id
    }, {
        token: ""
    }, (err, user) => {
        if (err)
            return res.json({
                success: false,
                err
            })
        return res.status(200).send({
            success: true
        })
    })
})

app.listen(port, () => console.log("complete"))