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

export default function Home() {
  return (
    <main className="p-4">
      <section>
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold mb-2">Upcoming Interviews</h1>
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
        <div className="p-2 space-y-2">
          {interviewData.map((interview) => (
            <Interview key={interview.id} {...interview} />
          ))}
        </div>
      </section>
    </main>
  );
}
