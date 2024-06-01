import { companyData, jobApplicationData } from "@/lib/data";

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

const SingleApplication = ({
  params,
}: {
  params: { applicationId: string };
}) => {
  const { applicationId } = params;

  const { company, application, error } = loadData(applicationId[0]);

  if (error) {
    return <div>Application not found</div>;
  }

  if (!company || !application) {
    return <div>Loading...</div>;
  }

  return <div>{company.name}</div>;
};

export default SingleApplication;
