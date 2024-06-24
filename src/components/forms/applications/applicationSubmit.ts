"use server";

import { connectToDatabase } from "@/auth/helpers";
import { applicationSchema } from "./applicationSchema";
import prisma from "@/lib/prisma";

export type FormState = {
  status: "idle" | "submitting" | "submitted" | "error";
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export const onSubmitAction = async (
  prevState: FormState,
  data: FormData,
): Promise<FormState> => {
  const formData = Object.fromEntries(data);
  const parsed = applicationSchema.safeParse(formData);

  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString();
    }

    return {
      status: "error",
      message: "Error: Invalid application",
      fields,
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

  try {
    const { companyName, position, status, dateApplied, userId } = formData;

    if (!companyName || !position || !status || !dateApplied || !userId) {
      return {
        status: "error",
        message: "Error: Invalid data",
      };
    }

    await connectToDatabase();

    let companyId = await prisma.company
      .findMany({
        where: {
          name: companyName.toString(),
        },
        select: {
          id: true,
        },
      })
      .then((companies) => companies[0]?.id);

    if (!companyId) {
      companyId = await prisma.company
        .create({
          data: {
            name: companyName.toString(),
          },
        })
        .then((company) => company.id);
    }

    await prisma.jobApplication.create({
      data: {
        companyId: companyId,
        position: position.toString(),
        status: status.toString(),
        dateApplied: new Date(dateApplied.toString()),
        userId: userId.toString(),
      },
    });

    return {
      status: "submitted",
      message: `Application created`,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Error: Server Error",
    };
  } finally {
    await prisma.$disconnect();
  }
};
