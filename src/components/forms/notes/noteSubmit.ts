"use server";

import { connectToDatabase } from "@/auth/helpers";
import { noteSchema } from "./noteSchema";
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
  const parsed = noteSchema.safeParse(formData);

  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString();
    }

    return {
      status: "error",
      message: "Error: Invalid note",
      fields,
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

  try {
    const { note, applicationId } = formData;

    if (!note || !applicationId) {
      return {
        status: "error",
        message: "Error: Invalid data",
      };
    }

    await connectToDatabase();

    const newNote = await prisma.note.create({
      data: {
        note: note.toString(),
        applicationId: applicationId.toString(),
      },
    });

    return {
      status: "submitted",
      message: `Note: ${formData.note}`,
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
