import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prisma";
import React from "react";

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
    <main className="max-w-screen-2xl m-auto p-4">
      <h1 className="text-2xl font-bold">Company: {company.name}</h1>
      <p className="text-gray-400">{application.position}</p>

      <h2 className="text-xl mt-4">Interviews</h2>
      {!!interviews.length ? (
        <ul>
          {interviews.map((interview) => (
            <React.Fragment key={interview.id}>
              <Separator />
              <li>
                <div className="flex gap-3 items-center my-2 justify-between px-2">
                  <p>{interview.interviewDate.toLocaleString()}</p>
                  <Button className="cursor-default" variant={"outline"}>
                    {interview.interviewType}
                  </Button>
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

      <h2 className="text-xl mt-4">Notes</h2>
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

      <h2 className="text-xl mt-4">Offer Details</h2>
      {offer ? (
        <div>
          <Separator />
          <p>Offered: {offer.offerDate.toLocaleString()}</p>
          <p>Base Salary: {offer.salary}</p>
          <p>Description: {offer.jobDescription}</p>
          {offer.benefits.map((benefit) => (
            <p key={benefit}>{benefit}</p>
          ))}
          <Separator />
        </div>
      ) : (
        <>
          <Separator />
          <p className="text-center mt-2 ">No offer provided</p>
        </>
      )}
    </main>
  );
};

export default SingleApplication;
