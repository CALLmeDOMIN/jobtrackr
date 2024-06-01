import { type JobApplication as JobApplicationType } from "@prisma/client";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { companyData, offerData } from "@/lib/data";
import Image from "next/image";

const JobApplication = (application: JobApplicationType) => {
  const companyName =
    companyData.find((company) => company.id === application.companyId)?.name ||
    "Company Name";

  return (
    <Card className="hover:scale-[1.025] transition-all">
      <CardHeader className="flex flex-row justify-between space-y-0">
        <div className="space-y-2">
          <CardTitle>{companyName}</CardTitle>
          <CardDescription>{application.position}</CardDescription>
        </div>
        <div className="rounded-md w-12 h-12 bg-white overflow-hidden">
          <Image
            src={`/logos/${companyName.toLowerCase()}.png`}
            width={1000}
            height={1000}
            alt={`${companyName} logo`}
            className="object-cover"
          />
        </div>
      </CardHeader>
    </Card>
  );
};

export default JobApplication;
