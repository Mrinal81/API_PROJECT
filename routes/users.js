import express from "express";
import { signin, signup } from "../controllers/user.js";
const router = express.Router();

router.post('/authenticate', signin);
router.post('/signup', signup);

export default router;