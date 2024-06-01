import { type Interview as InterviewType } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { companyData, jobApplicationData, offerData } from "@/lib/data";

interface LoadDataResult {
  application: (typeof jobApplicationData)[0] | null;
  company: (typeof companyData)[0] | null;
  error: boolean;
}

const loadData = (applicationId: string): LoadDataResult => {
  const application = jobApplicationData.find(
    (application) => application.id === applicationId
  );

  if (!application) {
    return { application: null, company: null, error: true };
  }

  const company = companyData.find(
    (company) => company.id === application.companyId
  );

  if (!company) {
    return { application, company: null, error: true };
  }

  return { application, company, error: false };
};

const Interview = (interview: InterviewType) => {
  const calculateTime = (interviewDate: Date) => {
    const now = new Date();
    const diffInMilliseconds = Math.abs(
      now.getTime() - interviewDate.getTime()
    );
    const diffInMinutes = Math.floor(diffInMilliseconds / 60000);
    const diffInHours = Math.floor(diffInMilliseconds / 3600000);
    const diffInDays = Math.floor(diffInMilliseconds / 86400000);

    if (diffInDays > 0) {
      return `${diffInDays} day(s)`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour(s)`;
    } else {
      return `${diffInMinutes} minute(s)`;
    }
  };

  const { company, application, error } = loadData(interview.applicationId);

  if (error) {
    return <div>Interview not found</div>;
  }

  if (!company || !application) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between space-y-0">
        <div className="space-y-2">
          <CardTitle>{company.name}</CardTitle>
          <CardDescription>{application.position}</CardDescription>
        </div>
        <div className="w-12 h-12 rounded-md bg-white"></div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>{calculateTime(interview.interviewDate)}</p>
        <p>{interview.interviewType}</p>
        <p>{interview.interviewer}</p>
        <p className="underline">{company.website}</p>
      </CardContent>
    </Card>
  );
};

export default Interview;
