import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import Task from "@/models/Task";

async function getUserIdFromRequest(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;
  const token = authHeader.split(" ")[1];
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded.id;
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  await connectDB();
  const userId = await getUserIdFromRequest(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const tasks = await Task.find({ userId });
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  await connectDB();
  const userId = await getUserIdFromRequest(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, description, status } = await req.json();
  const task = new Task({ title, description, status, userId });
  await task.save();

  return NextResponse.json(task, { status: 201 });
}

export async function PUT(req: Request) {
  await connectDB();
  const userId = await getUserIdFromRequest(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, title, description, status } = await req.json();
  const updated = await Task.findOneAndUpdate(
    { _id: id, userId },
    { title, description, status },
    { new: true }
  );

  return NextResponse.json(updated);
}

export async function DELETE(req: Request) {
  await connectDB();
  const userId = await getUserIdFromRequest(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  await Task.findOneAndDelete({ _id: id, userId });

  return NextResponse.json({ message: "Task deleted" });
}
