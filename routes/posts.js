import express from "express";
import { getPosts, createPost, deletePost, likePost, postDislike, commentPost } from "../controllers/posts.js";
import authenticateToken from '../middleware/authenticate.js'

// import auth from "../middleware/auth.js";
const router = express.Router();

router.use(authenticateToken)

router.get('/all_post/', getPosts);
router.post('/posts/', createPost);
router.delete('/posts/:id', deletePost);
router.post('/like/:id', likePost);
router.post('/unlike/:id', postDislike);
router.post('/comment/:id', commentPost);

export default router;