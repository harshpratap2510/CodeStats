import express from "express";
import { createAdmin, loginAdmin ,logoutAdmin} from "../controllers/adminController.js";


const router = express.Router();

router.route("/signup").post(createAdmin);
router.route("/login").post(loginAdmin);
router.route("/logout").post(logoutAdmin);

export default router;
