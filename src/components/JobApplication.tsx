import { type JobApplication as JobApplicationType } from "@prisma/client";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { companyData, offerData } from "@/lib/data";

const JobApplication = (application: JobApplicationType) => {
  const companyName =
    companyData.find((company) => company.id === application.companyId)?.name ||
    "Company Name";

  return (
    <Card className="hover:scale-105 transition-all">
      <CardHeader className="flex flex-row justify-between space-y-0">
        <div className="space-y-2">
          <CardTitle>{companyName}</CardTitle>
          <CardDescription>{application.position}</CardDescription>
        </div>
        <div className="w-12 h-12 rounded-md bg-white"></div>
      </CardHeader>
    </Card>
  );
};

export default JobApplication;
