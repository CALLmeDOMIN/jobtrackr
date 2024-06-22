import JobApplication from "@/components/JobApplication";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ApplicationForm from "@/components/ApplicationForm";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

const Applications = async () => {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return null;
  }

  const applications = await prisma.jobApplication.findMany({
    where: {
      user: {
        id: session.user.id,
      },
    },
  });

  return (
    <main className="p-4">
      <div className="mb-2 flex items-center gap-2">
        <h1 className="text-4xl font-bold">Your job applications</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="p-2">
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Job Application</DialogTitle>
            </DialogHeader>
            <ApplicationForm />
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col gap-3 p-2 md:grid md:grid-cols-3">
        {applications.map((application) => (
          <Link key={application.id} href={`/applications/${application.id}`}>
            <JobApplication {...application} />
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Applications;
