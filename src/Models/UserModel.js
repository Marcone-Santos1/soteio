import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    amigo_secreto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});
const User = mongoose.model("User", UserSchema);
export default User;