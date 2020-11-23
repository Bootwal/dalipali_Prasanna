const express=require('express');
const app = require('../app');
const router=express.Router();
const authController=require('../controllers/authController');

//routes here
router.get('/',(req,res)=>{
    res.render('index')
})

// authentication routes here
router.get('/login',authController.login);

router.post('/login',authController.postLogin);

router.get('/register',authController.register);

router.post('/register',authController.postRegister);

router.get('/logout',authController.logout);

module.exports=router;