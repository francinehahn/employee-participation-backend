import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    employees: {
        type: Array,
        required: true
    },
    projects: {
        type: Array,
        required: true
    }
})

export const UserModel = mongoose.model("User", UserSchema)