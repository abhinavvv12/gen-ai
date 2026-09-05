const { Router } = require('express')

// import controllers
const {registerUserController, loginUserController, logoutUserController,getMeController} = require('../controllers/auth.controller')

// import middlewares
const {authUser} = require('../middlewares/auth.middleware')

const authRouter = Router()

authRouter.post('/register',registerUserController);
authRouter.post('/login',loginUserController);
authRouter.get('/logout',logoutUserController);

authRouter.get('/get-me',authUser,getMeController)

module.exports = authRouter;













