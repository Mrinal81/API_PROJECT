import mongoose from 'mongoose';

const ProfileSchema =mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    }]
});

export default mongoose.model('Profile', ProfileSchema);
