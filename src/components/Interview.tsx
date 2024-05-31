import { type Interview } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { companyData, offerData } from "@/lib/data";

const Interview = (interview: Interview) => {
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

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between space-y-0">
        <div className="space-y-2">
          <CardTitle>{companyData.name}</CardTitle>
          <CardDescription>{offerData.position}</CardDescription>
        </div>
        <div className="w-12 h-12 rounded-md bg-white"></div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>{calculateTime(interview.interviewDate)}</p>
        <p>{interview.interviewType}</p>
        <p>{interview.interviewer}</p>
        <p className="underline">{companyData.website}</p>
      </CardContent>
    </Card>
  );
};

export default Interview;
