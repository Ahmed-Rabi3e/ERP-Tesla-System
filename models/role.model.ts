import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { USER_ROLES } from "@/lib/auth/permissions";

const roleSchema = new Schema(
  {
    code: {
      type: String,
      enum: USER_ROLES,
      required: true,
      unique: true,
    },
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    permissions: { type: [String], default: [] },
    isSystem: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

roleSchema.index({ isActive: 1 });

export type RoleDocument = InferSchemaType<typeof roleSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Role: Model<RoleDocument> =
  mongoose.models.Role ?? mongoose.model<RoleDocument>("Role", roleSchema);
