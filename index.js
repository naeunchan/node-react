const express = require("express")
const app = express()
const port = 3000
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const config = require("./config/key")
const {
    User
} = require("./models/User")

//application/w-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}))

//application/json 파일 분석 및 가져오기
app.use(bodyParser.json())

mongoose.connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err))

app.get("/", (req, res) => res.send("Hello world\n안녕하세요~"))

app.post("/register", (req, res) => {
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

app.listen(port, () => console.log("complete"))