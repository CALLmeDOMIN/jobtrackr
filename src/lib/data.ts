// mocked data

import { Company, Interview, JobApplication, Offer } from "@prisma/client";

export const offerData: Offer = {
  id: "1",
  position: "Software Engineer",
  jobDescription: "Software Engineer at Google",
  benefits: ["Health Insurance", "401k"],
  salary: 100000,
  offerDate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const companyData: Company = {
  id: "1",
  name: "Google",
  contactPerson: "John Doe",
  industry: "Tech",
  location: "Mountain View, CA",
  website: "https://google.com",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const jobApplicationData: JobApplication = {
  id: "1",
  status: "Offer",
  dateApplied: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: "1",
  resume: "https://resume.com",
  coverLetter: "https://coverletter.com",
  companyId: "1",
  offerId: "1",
};

export const interviewData: Interview = {
  id: "1",
  applicationId: "1",
  interviewDate: new Date("2024-06-01 08:00:00"),
  interviewer: "Jane Doe",
  interviewType: "Technical",
  feedback: "Great interview",
  createdAt: new Date(),
  updatedAt: new Date(),
};
