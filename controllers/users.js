// import bcrypt  from 'bcryptjs';
// import jwt from 'jsonwebtoken';
import Profile from '../models/getUser.js';
import mongoose from 'mongoose';


export const profile= async (req, res) => {
    try {
        const user = await Profile.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json({
            name: user.name,
            followers: user.followers.length,
            following: user.following.length
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


export const follow= async (req, res) => {
    try {
      const currentUser = await Profile.findById(req.user.id);
      const userToFollow = await Profile.findById(req.params.id);
      if (!userToFollow) {
        return res.status(404).json({ success: false, message: 'User not found.' });
      }
      if (currentUser.following.includes(userToFollow._id)) {
        return res.status(400).json({ success: false, message: 'You are already following this user.' });
      }
      currentUser.following.push(userToFollow._id);
      userToFollow.followers.push(currentUser._id);
      await currentUser.save();
      await userToFollow.save();
      return res.json({ success: true, message: `You are now following user with ID ${req.params.id}.` });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'An error occurred while following the user.' });
    }
  };



  // POST /api/unfollow/{id}
export const unfollow= async (req, res) => {
    try {
      const currentUser = await Profile.findById(req.user.id);
      const userToUnfollow = await Profile.findById(req.params.id);
      if (!userToUnfollow) {
        return res.status(404).json({ success: false, message: 'User not found.' });
      }
      if (!currentUser.following.includes(userToUnfollow._id)) {
        return res.status(400).json({ success: false, message: 'You are not following this user.' });
      }
      currentUser.following.pull(userToUnfollow._id);
      userToUnfollow.followers.pull(currentUser._id);
      await currentUser.save();
      await userToUnfollow.save();
      return res.json({ success: true, message: `You have unfollowed user with ID ${req.params.id}.` });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'An error occurred while unfollowing the user.' });
    }
    };
