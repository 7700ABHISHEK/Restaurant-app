import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

export const User = mongoose.models.User || mongoose.model('User', userSchema);