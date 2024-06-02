import { type JobApplication as JobApplicationType } from "@prisma/client";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import prisma from "@/lib/prisma";

const JobApplication = async (application: JobApplicationType) => {
  const { name } = (await prisma.company.findFirst({
    where: {
      id: application.companyId,
    },
    select: {
      name: true,
    },
  })) || { name: "" };

  return (
    <Card className="hover:scale-[1.025] transition-all">
      <CardHeader className="flex flex-row justify-between space-y-0">
        <div className="space-y-2">
          <CardTitle>{name}</CardTitle>
          <CardDescription>{application.position}</CardDescription>
        </div>
        <div className="rounded-md w-12 h-12 bg-white overflow-hidden">
          <Image
            src={`/logos/${name.toLowerCase()}.png`}
            width={1000}
            height={1000}
            alt={`${name} logo`}
            className="object-cover"
          />
        </div>
      </CardHeader>
    </Card>
  );
};

export default JobApplication;
