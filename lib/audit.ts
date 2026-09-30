import mongoose from "mongoose";
import { connectDb } from "@/lib/db/mongoose";
import { AuditLog } from "@/models/audit-log.model";

type WriteAuditInput = {
  userId?: string;
  action: string;
  entityType: string;
  entityId?: string;
  oldData?: unknown;
  newData?: unknown;
  ipAddress?: string;
  session?: mongoose.ClientSession;
};

export async function writeAuditLog(input: WriteAuditInput): Promise<void> {
  await connectDb();
  const document = {
    userId: input.userId,
    action: input.action,
    entityType: input.entityType,
    entityId: input.entityId,
    oldData: input.oldData,
    newData: input.newData,
    ipAddress: input.ipAddress,
  };
  if (input.session) {
    await AuditLog.create([document], { session: input.session });
    return;
  }
  await AuditLog.create(document);
}
