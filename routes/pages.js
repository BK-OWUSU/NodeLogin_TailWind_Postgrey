const router = require('express').Router()

router.get('/' , (req , res)=>{
    // Get the message from query parameters
    const response = req.query.response ? JSON.parse(decodeURIComponent(req.query.response)) : null;
    res.render('index', {response});
})

router.get('/login',checkNotAuthenticated, (req , res)=>{
    // Get the message from query parameters
    const response = req.query.response ? JSON.parse(decodeURIComponent(req.query.response)) : null;
    res.render('login', {response})
})

router.get('/dashboard', checkAuthentication, (req , res)=>{
    res.render('dashboard', { user: req.user })
})

router.delete('/logout', (req, res, next) => {
    req.logout((err) => { // Add a callback function
        if (err) {
            return next(err); // Handle any error that occurs during logout
        }
        console.log(req.session.id)
        console.log(req.session.cookie)
        req.session.destroy((err) => {
            if (err) {
                return next(err); // Handle any error during session destruction
            }
            res.redirect('/login'); // Redirect to login page
        });
    });
});

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
        res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/dashboard');
    }
    next ();
}
module.exports  = router