import express from "express";
import { createUser, loginUser, logoutUser } from "../controllers/userController.js";
import { getUserProfile, updateProfile } from '../controllers/userController.js';
import { verifyToken , authMiddleware } from '../middlewares/authMiddleware.js';  
import { getAllPlatformStats, getGeeksForGeeksStats, getCodechefStats, getLeetCodeStats, getCodeforcesStats } from '../controllers/statsController.js';

import { addFriend, removeFriend, getFriends, searchUsers } from '../controllers/friendController.js';
import { getAllUsers } from '../controllers/userController.js';
import upload from '../middlewares/uploadMiddleware.js'; // Assuming you have a multer setup for file uploads


const router = express.Router();

router.route("/signup").post(createUser);

router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

router.get('/profile', getUserProfile); 
router.put('/update-profile',verifyToken, upload.single('profilePic'), updateProfile);
router.get('/all', verifyToken, getAllUsers); // Get all users
router.get('/user-status',authMiddleware, (req, res) => {
    res.status(200).json({ ok: true, isAdmin: req.user.isAdmin });
});


// coding profiles 
router.get('/leetcode-profile/:username', getLeetCodeStats);
router.get('/codeforces-profile/:username', getCodeforcesStats);
router.get('/codechef-profile/:username', getCodechefStats);
router.get('/gfg-profile/:username', getGeeksForGeeksStats); 
router.get("/stats/:username", getAllPlatformStats);

//friends
router.post('/friends/:id', authMiddleware, addFriend);
router.delete('/friends/:id', authMiddleware, removeFriend);
router.get('/friends', authMiddleware, getFriends);
router.get('/friends/search', authMiddleware, searchUsers);





export default router;
 