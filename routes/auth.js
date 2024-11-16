const router = require('express').Router();
const userService = require('../service/user.service');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');


// router.post('/login' , passport.authenticate('local', {
//     successRedirect: '/dashboard',
//     failureRedirect: '/login',
//     failureFlash: true
// }))

router.post('/login' , (req , res, next)=>{
    passport.authenticate('local', (err, user, info)=> {
        if (err) { return next(err); }
        if (!user) {
            const response = {message: info.message, invalid: true} 
            res.redirect(`/login?response=${encodeURIComponent(JSON.stringify(response))}`)
        }
        req.logIn(user, err => {
            if (err) { return next(err); }
            //Jwt
          const token = jwt.sign({
            id: user.id, 
            firstname: user.firstname, 
            lastname: user.lastname, 
            email: user.email 
        }, process.env.JWT_SECRET,{
            expiresIn: process.env.JWT_EXPIRATION,
          });   
        //Cookie options
          const cookieOption = {
            expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRATION * 24 *60 * 60 * 1000),
            httpOnly: true
          } 
            res.cookie( 'token' , token , cookieOption );
            return res.redirect('/dashboard');
        });    
    })(req, res, next);
})

router.post('/register' , async(req , res)=>{
// const member_since = new Date().toISOString().split("T")[0];
// const last_visit = new Date().toISOString().split("T")[1].split(".")[0];      
 
 const {firstname, lastname, email, password} =  req.body;
 const isExist = await userService.existByEmail(email);
 if (isExist) {
    const response = {message: `An account with ${email} already exists`,isUserExist: true}
    res.redirect(`/?response=${encodeURIComponent(JSON.stringify(response))}`)
    return;
 }else {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const result = await userService.registerUser(firstname, lastname, email, hashedPassword);
    if (result)  {
        const response = {message: `${email} registered successfully`,isUserExist: false}
        res.redirect(`/login?response=${encodeURIComponent(JSON.stringify(response))}`)
    }
 }
})
module.exports  = router;