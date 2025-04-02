import bcrypt from "bcryptjs";
import mongoose, { model, models, Schema } from "mongoose";

export interface IUser {
  email: string,
  password: string,
  _id?: mongoose.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/.+\@.+\..+/, "Please use a valid email address"]
    },
    password: {
      type: String,
      required: [true, "Password is required"]
    }
  },
  { timestamps: true }
)

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = models?.User || model<IUser>("User", userSchema);

export default User;