import { ProgramCardProps } from "@/interfaces/interfaces";
import ProgramsOverview from "./ProgramsOverview";

import { getPrograms } from "@/app/api/programs-fetching/index";
import AppLayout from "../components/AppLayout";

export default async function Programs() {
  const posts: ProgramCardProps = await getPrograms();

  return (
    <AppLayout>
      <div className="mb-12" />
      <ProgramsOverview programs={posts} />
    </AppLayout>
  );
}
