import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
