import InterviewForm from "@/components/InterviewForm";
import NotesForm from "@/components/NotesForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prisma";
import { Minus, Plus } from "lucide-react";
import React from "react";
import DeleteInterview from "./DeleteInterview";

const SingleApplication = async ({
  params,
}: {
  params: { applicationId: string };
}) => {
  const { applicationId } = params;

  const application = await prisma.jobApplication.findUnique({
    where: {
      id: applicationId[0],
    },
  });

  if (!application) {
    return <div>Application not found</div>;
  }

  const interviews = await prisma.interview.findMany({
    where: {
      applicationId: application.id,
    },
  });

  const company = await prisma.company.findUnique({
    where: {
      id: application.companyId,
    },
  });

  if (!company) {
    return <div>Company not found</div>;
  }

  const notes = await prisma.note.findMany({
    where: {
      applicationId: application.id,
    },
  });

  let offer = null;

  if (application.offerId) {
    offer = await prisma.offer.findFirst({
      where: {
        id: application.offerId,
      },
    });
  }

  return (
    <main className="max-w-screen-xl m-auto p-4">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">Company: {company.name}</h1>
        <Button
          variant={"outline"}
          disabled
          className={
            "cursor-default uppercase " +
            (application.status === "Rejected"
              ? "bg-red-400/30 border-red-400 text-red-400"
              : application.status === "Applied"
              ? "bg-green-400/30 border-green-400 text-green-400"
              : "bg-blue-400/30 border-blue-400 text-blue-400")
          }
        >
          {application.status}
        </Button>
      </div>
      <p className="text-gray-400">{application.position}</p>

      <div className="md:grid md:grid-cols-2 md:gap-10">
        <div>
          <div className="flex gap-2 items-center mt-8">
            <h2 className="text-xl">Interviews</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="p-1 h-5">
                  <Plus size={12} />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Interview</DialogTitle>
                </DialogHeader>
                {/* <InterviewForm single applicationId={applicationId} /> */}
              </DialogContent>
            </Dialog>
          </div>
          {!!interviews.length ? (
            <ul>
              {interviews.map((interview) => (
                <React.Fragment key={interview.id}>
                  <Separator />
                  <li>
                    <div className="flex gap-3 items-center my-2 justify-between px-2">
                      <p>{interview.interviewDate.toLocaleString()}</p>
                      <div className="space-x-2 flex items-center">
                        <Button className="cursor-default" variant={"outline"}>
                          {interview.interviewType}
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="destructive" className="p-3">
                              <Minus size={12} />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Are you sure you want to remove this interview?
                              </DialogTitle>
                            </DialogHeader>
                            <DialogFooter>
                              <DialogClose asChild>
                                <DeleteInterview interviewId={interview.id} />
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </li>
                </React.Fragment>
              ))}
              <Separator />
            </ul>
          ) : (
            <>
              <Separator />
              <p className="text-center mt-2 ">No interviews</p>
            </>
          )}
        </div>
        <div>
          <div className="flex gap-2 items-center mt-8">
            <h2 className="text-xl">Notes</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="p-1 h-5">
                  <Plus size={12} />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Interview</DialogTitle>
                </DialogHeader>
                <NotesForm applicationId={applicationId} />
              </DialogContent>
            </Dialog>
          </div>
          {!!notes.length ? (
            <ul>
              {notes.map((note) => (
                <React.Fragment key={note.id}>
                  <Separator />
                  <li>
                    <div className="flex gap-3 items-center my-2 justify-between px-2">
                      <p>{note.note}</p>
                    </div>
                  </li>
                </React.Fragment>
              ))}
              <Separator />
            </ul>
          ) : (
            <>
              <Separator />
              <p className="text-center mt-2 ">No notes</p>
            </>
          )}
        </div>
        <div className="md:col-span-2">
          <h2 className="text-xl mt-4">Offer Details</h2>
          {offer ? (
            <div>
              <Separator />
              <div className="p-4 space-y-2">
                <div>
                  <h2 className="text-lg font-bold">Offered:</h2>
                  <p>{offer.offerDate.toLocaleString()}</p>
                </div>
                <div>
                  <h2 className="text-lg font-bold">Base Salary:</h2>
                  <p>{offer.salary}</p>
                </div>
                <div>
                  <h2 className="text-lg font-bold">Description:</h2>
                  <p>{offer.jobDescription}</p>
                </div>
                <div>
                  <h2 className="text-lg font-bold">Benefits:</h2>
                  {offer.benefits.map((benefit) => (
                    <p key={benefit}>{benefit}</p>
                  ))}
                </div>
              </div>
              <Separator />
            </div>
          ) : (
            <>
              <Separator />
              <p className="text-center mt-2 ">No offer provided</p>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default SingleApplication;
