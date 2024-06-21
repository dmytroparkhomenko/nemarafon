import { ProgramCardProps } from "@/interfaces/interfaces";
import ProgramsOverview from "./ProgramsOverview";

import { getPrograms } from "@/api/programs-fetching/index";

export default async function Programs() {
  const posts: ProgramCardProps = await getPrograms();

  return <ProgramsOverview programs={posts} />;
}
