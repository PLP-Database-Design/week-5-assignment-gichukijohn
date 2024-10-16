//declare depedencies
const express=require('express');
const app=express();
const mysql= require('mysql2');
const dotenv=require('dotenv');
const cors=require('cors');

app.use(express.json());
app.use(cors());
dotenv.config();

//creating connection to the database
const db=mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_NAME
 
});

//checking if connection works
db.connect((err)=>{
    if(err) return console.error("error connecting to the database");
    console.log("connected to the database successfully as Id",db.threadId)

    //main content
    //question 1
    app.set('view engine','ejs');
    app.set('views',__dirname +'/views');
    //retrieve data
    app.get('/patients',(req,res)=>{
        db.query("SELECT * FROM patients",(err,results)=>{
            if(err){
                console.error(err);
                res.statusMessage(500).send("error retrieving data");
            }else{
                res.render('patients',{results:results});

            }
        });
        
    });
     //question 2
     app.set('view engine','ejs');
     app.set('views',__dirname +'/views');
     //retrieve data
     app.get('/providers',(req,res)=>{
         db.query("SELECT * FROM providers",(err,results)=>{
             if(err){
                 console.error(err);
                 res.statusMessage(500).send("error retrieving data");
             }else{
                 res.render('providers',{results:results});
 
             }
         });
        });
        //question 3
     app.set('view engine','ejs');
     app.set('views',__dirname +'/views');
     //retrieve data
     app.get('/q3',(req,res)=>{
         db.query("SELECT first_name FROM patients",(err,results)=>{
             if(err){
                 console.error(err);
                 res.statusMessage(500).send("error retrieving data");
             }else{
                 res.render('q3',{results:results});
 
             }
         });
        });

         //question 4
     app.set('view engine','ejs');
     app.set('views',__dirname +'/views');
     //retrieve data
     app.get('/q4',(req,res)=>{
         db.query("SELECT * FROM providers",(err,results)=>{
             if(err){
                 console.error(err);
                 res.statusMessage(500).send("error retrieving data");
             }else{
                 res.render('q4',{results:results});
 
             }
         });
        });

        


    //listening to the port
    app.listen(process.env.PORT,()=>{
        console.log(`server listening on port ${process.env.PORT}`);
        //Sending message to the browser
        console.log("sending message...");
        app.get('/',(req,res)=>{
            res.send('server started successfully');
        });
    });
});
