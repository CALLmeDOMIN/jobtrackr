import { type Interview as InterviewType } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Contact,
  DotIcon,
  Link as LinkIcon,
  MoveRight,
  Timer,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";

const Interview = async (interview: InterviewType) => {
  const application = await prisma.jobApplication.findFirst({
    where: {
      id: interview.applicationId,
    },
  });

  const { name, website } = (await prisma.company.findFirst({
    where: {
      id: application?.companyId,
    },
    select: {
      name: true,
      website: true,
    },
  })) || { name: "", website: "" };

  if (!application || !name) {
    return null;
  }

  const calculateTime = (interviewDate: Date) => {
    const now = new Date();
    const diffInMilliseconds = Math.abs(
      now.getTime() - interviewDate.getTime(),
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
          <CardTitle>{name}</CardTitle>
          <CardDescription>{application.position}</CardDescription>
        </div>
        <div className="h-12 w-12 overflow-hidden rounded-md bg-white">
          <Image
            src={`/logos/${name.toLowerCase()}.png`}
            width={1000}
            height={1000}
            alt={`${name} logo`}
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="flex justify-between">
        <div className="space-y-2">
          <p className="flex gap-2">
            <Timer className="rounded-md bg-white text-background" />
            {calculateTime(interview.interviewDate)}
          </p>
          <p className="flex gap-2">
            <DotIcon className="rounded-md bg-white text-background" />
            {interview.interviewType}
          </p>
          <p className="flex gap-2">
            <Contact className="rounded-md bg-white text-background" />
            {interview.interviewer}
          </p>
          <p className="flex gap-2">
            <LinkIcon className="rounded-md bg-white text-background" />
            <Link
              href={`https://${website}`}
              className="flex gap-2 underline"
              rel="noreferrer noopener"
              target="_blank"
            >
              https://{website}
            </Link>
          </p>
        </div>
        <div className="flex items-end justify-end">
          <Link href={`/applications/${application.id}`} className="flex gap-2">
            <span className="hidden md:block">Open application</span>
            <MoveRight />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default Interview;
