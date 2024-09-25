const mysql=require('mysql2');
const dotenv=require('dotenv');
dotenv.config();

const mysqlconnection=mysql.createConnection({
    host:process.env.HOST,
    password:process.env.PASSWORD,
    user:process.env.USER,
    database:process.env.DATABASE
})
module.exports=mysqlconnection