import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { connectToDatabase } from "@/auth/helpers";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const { interviewer, interviewDate, interviewType, application } = data;

    if (!interviewer || !interviewDate || !interviewType || !application) {
      return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
    }

    await connectToDatabase();

    const newInterview = await prisma.interview.create({
      data: {
        interviewer,
        interviewDate: new Date(interviewDate),
        interviewType,
        applicationId: application,
        feedback: "",
      },
    });

    return NextResponse.json(newInterview, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
