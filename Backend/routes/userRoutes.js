const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const { body } = require('express-validator');//for validating every data entered in body we use express-validator.
const authMiddleware = require('../middlewares/authMiddleware');


//register route
router.post('/register',[
    body('email').isEmail().withMessage("Invalid Email"),//it checks if the incoming email from body is validEmail , if not valid then write a message.
    //similarly for name but name is in the form of object so we have to seperate it
    body('fullname.firstname').isLength({min : 3}).withMessage('First name must be 3 character long'),
    body('password').isLength({min : 6}).withMessage('Password must be 6 character long'),
],userController.registerController);

//login route
router.post('/login',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min : 6}).withMessage('Password must be 6 character long'),
],userController.loginController)

//forgot password route
router.post('/forgot-password',[
    body('email').isEmail().withMessage("Invalid Email"),
],userController.forgotPasswordController);

//verify reset token route
router.get('/verify-reset-token/:token', userController.verifyResetTokenController);

//reset password route
router.post('/reset-password',[
    body('password').isLength({min : 6}).withMessage('Password must be 6 character long'),
    body('token').notEmpty().withMessage('Token is required'),
],userController.resetPasswordController);

//profile route

router.get('/profile',authMiddleware.authUser,userController.getUserProfile);//get is used to retrive data and post is used to submit data. 

//logout route.
router.post('/logout',authMiddleware.authUser,userController.logoutController);
module.exports = router;