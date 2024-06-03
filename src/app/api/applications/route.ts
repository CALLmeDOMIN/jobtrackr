import { connectToDatabase } from "@/auth/helpers";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const { status, position, dateApplied, userId, companyName } = data;

    if (!status || !position || !dateApplied || !userId || !companyName) {
      return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
    }

    await connectToDatabase();

    let companyId = await prisma.company
      .findFirst({
        where: {
          name: companyName,
        },
        select: {
          id: true,
        },
      })
      .then((company) => company?.id);

    if (!companyId) {
      companyId = await prisma.company
        .create({
          data: {
            name: companyName,
          },
        })
        .then((company) => company.id);
    }

    if (!companyId) {
      return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }

    const newApplication = await prisma.jobApplication.create({
      data: {
        status,
        position,
        dateApplied: new Date(dateApplied),
        userId,
        companyId,
      },
    });

    return NextResponse.json(newApplication, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
