const mysql = require('../model/db.js');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const Signup = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Enter your credentials'
        });
    }

    mysql.query(`select * from user where email=?`, [email], (err, user) => {
        if (err) {
            console.log('error----------->', err);
            return res.status(502).json({
                success: false,
                message: 'something went wrong',
                user: null
            });
        } else {
            if (user.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Email is already used'
                });
            } else {
                const userid = Math.floor(Math.random() * (8998)) + 1000;
                console.log('userid----------->', userid);

                // Use appropriate salt rounds (10)
                bcrypt.hash(password,Number(process.env.HASH), (hasherr, hashpassword) => {
                    console.log('hashpassword---------->',hashpassword)
                    if (hasherr) {
                        console.log('bcrypt hash error:', hasherr);  // Log hash error for debugging
                        return res.status(502).json({
                            success: false,
                            message: `Hash error: ${hasherr}`
                        });
                    } else {
                        mysql.query(`insert into user (userid, name, email, password) values(?, ?, ?, ?)`, [userid, name, email, hashpassword], (err2, addres) => {
                            if (err2) {
                                return res.status(502).json({
                                    success: false,
                                    message: err2
                                });
                            } else {
                                return res.status(201).json({
                                    success: true,
                                    message: 'New user has been created'
                                });
                            }
                        });
                    }
                });
            }
        }
    });
}

module.exports = Signup;
