// const users = require('../controllers/getUsers');
// const auth = require('../middleware/getUser');
import express from "express";
import authenticateToken from "../middleware/authenticate.js";

import {profile} from "../controllers/users.js"
import { follow, unfollow} from "../controllers/users.js"
const router = express.Router();

router.use(authenticateToken)

// Use Routes
router.get('/user/', profile);
router.post('/follow/:id', follow);
router.post('/unfollow/:id', unfollow);



export default router;