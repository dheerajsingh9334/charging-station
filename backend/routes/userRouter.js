const express = require('express');
const { signup,login, logout } = require('../controller/UserController');
const { protectRoute } = require('../middleware/authmidleware');
const userRouter = express.Router();

userRouter.post("/signup",signup);
userRouter.post("/Login",login);
userRouter.post("/logout",protectRoute,logout);
module.exports = userRouter;