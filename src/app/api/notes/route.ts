import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { connectToDatabase } from "@/auth/helpers";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const { note, applicationId } = data;

    console.log(note, applicationId);

    if (!note || !applicationId) {
      return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
    }

    await connectToDatabase();

    const newNote = await prisma.note.create({
      data: {
        note,
        applicationId,
      },
    });

    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
