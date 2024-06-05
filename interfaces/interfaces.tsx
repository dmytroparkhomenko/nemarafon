import { RefObject } from "react";

export interface ProgramCardProps {
  uri: string;
  title: string;
  programFields: {
    programPrice: number | null;
    programDescription: Array<{
      __typename: string;
      programDescriptionItem: string;
    }> | null;
  };
}
export interface ScrollPointersProps {
  containerRef: RefObject<HTMLDivElement>;
}
