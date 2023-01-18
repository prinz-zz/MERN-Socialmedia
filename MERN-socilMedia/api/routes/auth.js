const express = require('express');
const router = express.Router();
const User = require('../models/User');
const cryptoJS = require('crypto-js');


//REGISTER

router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username ,
        email: req.body.email,
        password : cryptoJS.AES.encrypt(req.body.password, process.env.PASS_CODE).toString(),
    })
    try {
        const user = await newUser.save();
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
    
})


//LOGIN

router.post('/login', async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json('User not found!!');

        const hashedPassword = cryptoJS.AES.decrypt(user.password, process.env.PASS_CODE);
        const originalPassword = hashedPassword.toString(cryptoJS.enc.Utf8);
        originalPassword !== req.body.password && res.status(400).json('Wrong credentials(PASS)');
        //To hide passsword
        const { password, ...others } = user._doc;

        res.status(200).json(others);
        

    } catch (err) {
        res.status(500).json("ERROS");
    }
})


module.exports = router;
