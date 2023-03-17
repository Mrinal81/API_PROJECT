import mongoose from 'mongoose';




const commentSchema = mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'PostMessage', required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
  text: { type: String, required: true }
});

export default mongoose.model('postComment', commentSchema);