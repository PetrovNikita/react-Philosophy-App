var express = require("express");
var path = require("path");
const fs = require("fs");
var bodyParser = require("body-parser");
var multer = require('multer');
const mongoose = require("mongoose");
const posts = require("./server/serverScripts/posts");
const gets = require("./server/serverScripts/gets");
const autentification = require("./server/serverScripts/autentification");
 
var app = express();
var jsonParser = bodyParser.json();
var textParser = bodyParser.text();
var upload = multer();
app.use(express.static(path.resolve(__dirname,'build')));
app.use(upload.array());

// подключение
mongoose.connect("mongodb://localhost:27017/commentdb", { useNewUrlParser: true }, (err) => {
    if (err) console.log(err);

    app.listen(3000, function(){
        console.log("Сервер ожидает подключения...");
    });
});

//стартовая страница (регистрации \ входа)
app.get('/home', (req, res) => {
    console.log('/home');
    fs.readFile(path.join(__dirname, '/build/index.html'), (error, data) => {
        if(error){
            response.statusCode = 404;
            response.end("Resourse not found!");
        }   
        else{
            res.end(data);
        }
    });
})

app.get('/categories', (req, res) => {
    console.log(req.path);
    gets.getCategories()
        .then(result => res.send(result));

})

app.get('/loginPage', (req, res) => {
    console.log(req.path);
    res.redirect('/');
})

app.get('/textsViewingPage', (req, res) => {
    console.log(req.path);
    gets.getCategories()
    .then(result => res.render("textsViewingPage/textsViewingPage.hbs", {
        categories: result,
}));
})

app.get('/get/comment/:userLogin', (req, res) => {
    gets.getUserCommentsbyLogin(req, res).catch(( err) => console.log(err));
});

app.get('text/comment/:userLogin', (req, res) => {
    res.sendFile(__dirname + 'text.html');
});

//регистрация пользователя
app.post('/reg', async (req, res)=> {
    console.log(req.path);
    console.log(req.body);

    let sessionCookie = await autentification.autentificateUser(req.body);
    if (!sessionCookie) {
        res.send('User_Exist');
    };
    res.setHeader("Set-Cookie", `sessionCookie=${sessionCookie}; path=/`);
    res.setHeader("userLogin", req.body.userLogin);
    res.send('success'); 
    //res.redirect('/add');
});

//проверка логина на существование при регистрации
app.post('/loginCheck', textParser, async(req, res) => {
    console.log(req.path, req.body);
    let result = await posts.loginValueCheckRegister(req.body);
    console.log(result);
    res.send(result);
});

//обработка при логине зарегистрованного пользователя
app.post('/login', async(req, res) => {
    console.log(req.path, req.body);
    let result = await autentification.loginUserAutentification(req.body);
    console.log(result);
    if (result == "Incorrect_Password" || result == "No_User_Found") {
        res.send(result);
    } else {
        res.setHeader("Set-Cookie", `sessionCookie=${result}; path=/`);
        res.setHeader("userLogin", req.body.userLogin);
        res.send('success'); 
    };
})

//СТАРАЯ отправка коммента
app.post('/post/comment', async (req, res) => { 
    console.log(req.headers.cookie);
    let userLogin = await autentification.passUser(req.headers.cookie);
    if (userLogin) {
        posts.postComment(userLogin, req, res).catch(err => console.log(err));
    }
    else {
        console.log('To registration.');
        res.send('To registration.');
    }
} );

//НОВАЯ отправка на сервер коммента
app.post('/postComment', jsonParser, async (req, res) => { console.log(req.path); posts.postTextComment(req, res);});

//выдача текста при нажатии в категориях
app.get('/getText/:textName', async (req, res) => {
    if (! await autentification.passUser(req.headers.cookie)) {
        console.log('no access'); 
        res.send(`{
            "textName": "",
            "textBody": "Register or login on site to read texts and comments"
        }`);
    };
    gets.getText(req, res).catch((err) => console.log(err)) 
} );

app.get('/getComments/:textName', async (req, res) => {
    let encode = req.params["textName"];
    console.log(encode);
    let comments = await gets.getTextComments(encode);
    res.send(JSON.stringify( {'comments': comments} ));
})


process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});



//nodemon commentApp.js

