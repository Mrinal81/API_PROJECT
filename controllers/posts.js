import json from "body-parser";
import mongoose from "mongoose";
import postMessage from "../models/postMessage.js";
import postComment from "../models/comment.js";

export const getPosts = async (req, res) => {
	try {
		let creator = req.user.id;
		const result = await postMessage.find({ creator });
		let posts = []
		for (let index = 0; index < result.length; index++) {
			const p = result[index];
			let comments = (await postComment.find({_id: { $in: p.comment }})).map(c => c.text)
			posts.push({ id: p._id, title: p.title, desc: p.desc, createdAt: p.createdAt, likes: p.likes.length, comments })
		}
		res.status(200).json(posts);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createPost = async (req, res) => {
	let { title, desc } = req.body;

	try {
		let creator = req.user.id;
		const post = await postMessage.create({ title, desc, creator });
		res.status(200).json({ id: post._id, title: post.title, desc: post.desc, createdAt: post.createdAt });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};


export const deletePost = async (req, res) => {
	const { id } = req.params;
	let post = await postMessage.findById(id)
	if (!post) {
		return res.status(404).json({ message: "No such post exist" })
	}
	if (req.user.id != post.creator) {
		return res.status(404).json({ message: "Cant delete Others post" })
	}
	await postMessage.findByIdAndRemove(id);
	res.json({ message: "Post deleted successfully" });
};

export const likePost = async (req, res) => {

	if (!req.user.id) return res.json({ message: "unauthorized" });

	const post = await postMessage.findById(req.params.id);
	if (!post) {
		return res.status(404).send("no post");
	}

	const index = post.likes.findIndex((id) => String(id) === req.user.id);
	if (index === -1) {
		post.likes.push(req.user.id);
	} else {
		post.likes = post.likes.filter((id) => String(id) !== String(req.user.id));
	}

	const updatedPost = await postMessage.findByIdAndUpdate(req.params.id, post, {
		new: true,
	});
	res.json(updatedPost);
};

export const postDislike = async (req, res) => {
	try {
		const post = await postMessage.findById(req.params.id);
		if (!post) {
			return res.status(404).json({ message: 'Post not found.' });
		}
		if (!post.likes.includes(req.user.id)) {
			return res.status(400).json({ message: 'You have not liked this post yet.' });
		}
		post.likes.pull(req.user.id);
		await post.save();
		return res.json({ success: true, message: `You have unliked the post with ID ${req.params.id}.` });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ success: false, message: 'An error occurred while unliking the post.' });
	}
};

export const commentPost = async (req, res) => {

	const { text } = req.body;

	try {
		const post = await postMessage.findById(req.params.id);
		if (!post) {
			return res.status(404).json({ success: false, message: 'Post not found.' });
		}
		const comment = await postComment.create({ post: req.params.id, author: req.user.id, text });
		post.comment.push(comment._id);
		await post.save();
		return res.json({ commentId: comment._id });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ success: false, message: 'An error occurred while adding the comment.' });
	}
};