import express from 'express';
import { registerUser,logInUser, forgotPassword, resetPassword } from '../controllers/userController.js';


const router=express.Router();


router.post("/create",registerUser);
router.post("/login",logInUser);
router.post("/forgot-password",forgotPassword);
router.put("/password-reset/:token",resetPassword);

export default router;