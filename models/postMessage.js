import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    desc: String,
    creator: String,
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile' 
    }],
    createdAt: {
        type: Date,
        default: new Date()
    },
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'postComment',
    }]
});
const postMessage = mongoose.model('PostMessage', postSchema);

export default postMessage;