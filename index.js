const express = require("express")
const app = express()
const port = process.env.port || 4000
const ejs = require("ejs")
const path = require("path")
const qrcode = require("qrcode")

//================= body parser =============

var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//===========setting the view engine as ejs===========

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "view"))

//============== get api for landing page =========

app.get("/", (req, res, next)=>{
    res.render("index")
})

//============== post api for generating QR code ===========

app.post("/page", (req, res)=>{
    try{
        const input_text = req.body.text
        // console.log(input_text);
        qrcode.toDataURL(input_text, (err, src)=>{
            res.render("page", {
                qr_code: src
            })
        })
        
    }catch(e){
        res.json(e);
    }
})

app.listen(port, ()=>{console.log(`server is running at ${port} port`);})