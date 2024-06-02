import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Interview from "@/components/Interview";
import { Plus } from "lucide-react";
import InterviewForm from "@/components/InterviewForm";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

const Interviews = async () => {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return null;
  }

  const interviews = await prisma.interview.findMany({
    where: {
      jobApplication: {
        user: {
          id: session.user.id,
        },
      },
    },
    orderBy: {
      interviewDate: "asc",
    },
  });

  const applications = await prisma.jobApplication
    .findMany({
      where: {
        user: {
          id: session.user.id,
        },
      },
      select: {
        id: true,
        Company: {
          select: {
            name: true,
          },
        },
        position: true,
      },
    })
    .then((applications) =>
      applications.map((application) => ({
        value: application.id,
        label: `${application.Company.name} - ${application.position}`,
      }))
    );

  return (
    <main className="p-4">
      <section>
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-4xl font-bold">Upcoming Interviews</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="p-2">
                <Plus />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Interview</DialogTitle>
              </DialogHeader>
              <InterviewForm applications={applications} />
            </DialogContent>
          </Dialog>
        </div>
        <div className="p-2 space-y-2 md:max-w-[70%]">
          {interviews.map((interview) => (
            <Interview key={interview.id} {...interview} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Interviews;
