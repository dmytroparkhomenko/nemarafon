import { RefObject } from "react";

export interface ProgramCardProps {
  uri: string;
  title: string;
  programFields: {
    programPrice: number | null;
    programShortDescription: string | null;
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

export interface ProgramData {
  uri?: string;
  title: string;
  description: string;
  purchaseDate: string;
  expires: string;
}

export interface ProgramPageProps {
  params: { uri: string };
}

export interface ScrollPointersProps {
  containerRef: RefObject<HTMLDivElement>;
}

export interface SessionUser {
  email: string;
  image: string;
  name: string;
}

export interface Session {
  user?: SessionUser;
  expires?: string;
}

// ProgramNavigator
interface ProgramDescriptionItem {
  __typename: string;
  programDescriptionItem: string;
}

interface ProgramContentItem {
  __typename: string;
  programVideoLink: string;
}

interface ProgramFields {
  programPrice: number;
  programShortDescription: string;
  programDescription: ProgramDescriptionItem[];
  programContent: ProgramContentItem[];
}

export interface Program {
  uri: string;
  title: string;
  programFields: ProgramFields;
}

export interface ProgramNavigatorProps {
  program: Program;
}
