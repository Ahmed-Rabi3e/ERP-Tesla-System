import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { USER_ROLES } from "@/lib/auth/permissions";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true, select: false },
    name: { type: String, required: true, trim: true },
    role: {
      type: String,
      enum: USER_ROLES,
      required: true,
      index: true,
    },
    extraPermissions: { type: [String], default: [] },
    deniedPermissions: { type: [String], default: [] },
    isActive: { type: Boolean, default: true, index: true },
    lastLoginAt: { type: Date },
    deletedAt: { type: Date, default: null, index: true },
  },
  { timestamps: true }
);

userSchema.index({ email: 1, deletedAt: 1 });
userSchema.index({ role: 1, isActive: 1 });

export type UserDocument = InferSchemaType<typeof userSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const User: Model<UserDocument> =
  mongoose.models.User ?? mongoose.model<UserDocument>("User", userSchema);
