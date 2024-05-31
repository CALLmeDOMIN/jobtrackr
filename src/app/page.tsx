import Interview from "@/components/Interview";
import { Button } from "@/components/ui/button";
import { interviewData } from "@/lib/data";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-4">
      <section>
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold mb-2">Upcoming Interviews</h1>
          <Link href={"/add-interview"}>
            <Button className="p-2">
              <Plus />
            </Button>
          </Link>
        </div>
        <div className="p-2 space-y-2">
          {Array.from({ length: 3 }, (_, i) => (
            <Interview key={i} {...interviewData} />
          ))}
        </div>
      </section>
    </main>
  );
}
