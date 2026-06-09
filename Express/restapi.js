let mysql = require('mysql2')
let exp = require('express')
let app = exp()
let cors = require('cors');



app.use(exp.json());
// app.use(exp.static('Extra'))
app.use(exp.urlencoded({ extended: true }));
app.use(cors());



app.listen(9090,function(){
    console.log("server started")
})

app.get('/login',function(req,res){
    res.sendFile(__dirname+"/loginform.html");
})

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pass",
    database: "project_db"
})

con.connect(function (err) {
    if (!err) {
        console.log("connection established")
    }
    else
        console.log("connection failed")
})


app.get('/users',function(req,res){
    let querry='select * from users'
    con.query(querry,function(err,result){
        if(!err)
            res.json(result);
        else{
            console.log("error occured")
        }
    })
})


app.get('/users/:id',function(req,res){

    let id =req.params.id
    let querry= 'select * from users where userid=? '

    con.query(querry,[id],function(err,result){
        if(!err && result.length>0){
            res.json(result[0])
        }
        else{
            res.json(null)
        }
    })
})



app.post('/logincheck',function(req,res){
   const querry="select * from users where username=? and password=?";
   con.query(querry,[req.body.username,req.body.password],function(err,result){
    if(result.length===1){
        res.send(200).json({user:{userid:result[0].userid,username:result[0].username,role:result[0].role},token:"abc123"})
    }
    else{
        res.send(401).json({message:"invalid credentials"})
    }
})
})


//////Register
// app.post("/register", function (req, res) {
//     let { u_id, password, fname, mname, lname, email, contact } = req.body;
//     let query = "INSERT INTO users (u_id, password, fname, mname, lname, email, contact) VALUES (?, ?, ?, ?, ?, ?, ?)";
        
//     con.query(query, [u_id, password, fname, mname, lname, email, contact], function (err, result) {
//         if (!err) {
//             res.write(result)
//             res.send(true);
//             res.end()
            
//         } else {
//             console.error("Registration database error: ", err);
//             res.send(false);

//         }
//     });
// });

// app.post('/reset',function(req,res){
//     let {username,oldpassword,newpassword}=req.body;
//     let querry='update users set password=? where u_id=? and password=?';

//     con.query(querry,[newpassword,username,oldpassword],function(err,result){
//         if(err){
//             console.error("something went wrong",err);  
//             res.send(false)
//         }
//         if(result.affectedRows>0){
//             res.send(true);
//         }
//         else{
//             res.send(false)
//         }
//     })
// })

// // Assignment 2 log file maintain karta

// app.use(function (req, res, next) {
//     console.log("in general middleware")
//     next();
// })



// // app.use(function(req,res,next){
// //     let ip=req.ip;
// //     let url=req.originalUrl;
// //     let method=req.method;
// //     let currentTime=new Date();
// //     let querry= "insert into request_logs(clientip,request_url,request_method,request_time) values(?,?,?,?)";
// //     con.query(querry,[ip,url,method,currentTime],function(err,result){
// //         if(!err){
// //             console.log("data added");
// //         }
// //         else{
// //             console.log(err.toString());
// //         }
// //     })
// //     next();

// // })


