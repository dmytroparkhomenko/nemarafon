import { ProgramCardProps } from "@/interfaces/interfaces";
import ProgramsOverview from "./ProgramsOverview";

import { getPrograms } from "@/app/api/programs-fetching/index";

export default async function Programs() {
  const posts: ProgramCardProps = await getPrograms();

  return (
    <main className="px-5 md:px-24 py-12 md:py-16 min-h-[100vh] md:h-[100vh] md:w-[100vw] z-0 bg-[url('/sources/second-bg.jpg')] bg-left">
      <ProgramsOverview programs={posts} />
    </main>
  );
}
