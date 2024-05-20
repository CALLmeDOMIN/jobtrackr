import Interview from "@/components/Interview";
import { interview } from "@/lib/data";

export default function Home() {
  return (
    <main className="p-4">
      <section>
        <h1 className="text-4xl font-bold mb-2">Upcoming Interviews</h1>
        <div className="p-2 space-y-2">
          {Array.from({ length: 3 }, (_, i) => (
            <Interview key={i} {...interview} />
          ))}
        </div>
      </section>
    </main>
  );
}
