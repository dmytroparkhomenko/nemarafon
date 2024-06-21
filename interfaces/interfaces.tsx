import { RefObject } from "react";

export interface ProgramCardProps {
  uri: string;
  title: string;
  content?: any;
  programFields: {
    programPrice: number | null;
    programDescription: Array<{
      __typename: string;
      programDescriptionItem: string;
    }> | null;
    programContent: Array<{
      __typename: string;
      programVideoLink: any;
    }> | null;
  };
}
export interface ScrollPointersProps {
  containerRef: RefObject<HTMLDivElement>;
}
