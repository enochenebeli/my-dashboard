import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  status: "Pending" | "Completed";
  userId: mongoose.Types.ObjectId;
}

const TaskSchema: Schema<ITask> = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Task: Model<ITask> = mongoose.models.Task || mongoose.model<ITask>("Task", TaskSchema);

export default Task;
