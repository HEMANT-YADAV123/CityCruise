const express = require('express');
const { body } = require('express-validator')
const captainController = require('../controllers/captainController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').isLength({min : 3}).withMessage('First name must be 3 character long'),
    body('password').isLength({min : 6}).withMessage('Password must be 6 character long'),
    body('vehicle.color').isLength({min : 3}).withMessage('Vehicle color must be 3 character long'),
    body('vehicle.plate').isLength({min : 3}).withMessage('Vehicle plate number must be 3 character long'),
    body('vehicle.capacity').isInt({min : 1}).withMessage('Vehicle capacity must be atleast 1'),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid type of vehicle'),
    ],
    captainController.registerController
)

router.post('/login',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min : 6}).withMessage('Password must be 6 character long'),
    ], 
    captainController.loginController
)

router.get('/profile',authMiddleware.authCaptain,captainController.getCaptainProfile)

router.get('/logout',authMiddleware.authCaptain,captainController.logoutController);

module.exports = router;