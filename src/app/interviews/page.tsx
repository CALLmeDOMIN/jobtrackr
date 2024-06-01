import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Interview from "@/components/Interview";
import { interviewData } from "@/lib/data";
import { Plus } from "lucide-react";
import InterviewForm from "@/components/InterviewForm";

const Interviews = () => {
  return (
    <main className="p-4">
      <section>
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-4xl font-bold">Upcoming Interviews</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="p-2">
                <Plus />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Interview</DialogTitle>
              </DialogHeader>
              <InterviewForm />
            </DialogContent>
          </Dialog>
        </div>
        <div className="p-2 space-y-2 md:max-w-[70%]">
          {interviewData.map((interview) => (
            <Interview key={interview.id} {...interview} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Interviews;
