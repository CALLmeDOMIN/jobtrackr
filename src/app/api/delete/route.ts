import { connectToDatabase } from "@/auth/helpers";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const data = await req.json();

    const { interviewId } = data;

    if (!interviewId) {
      return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
    }

    await connectToDatabase();

    await prisma.interview.delete({
      where: {
        id: interviewId as string,
      },
    });

    return NextResponse.json({ message: "Interview Deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
