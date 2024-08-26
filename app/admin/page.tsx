import Image from "next/image";
import ResumeComponent from "@/components/resume";
import { initialCVData } from "@/lib/data";

export default function Admin() {
  return (
    <main>
      <ResumeComponent initialData={initialCVData} />
    </main>
  );
}
