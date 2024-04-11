// reflechir sur le nombre de propriete ici

export interface Box {
  title: string;
  content: string;
}

export interface Section {
  title: string;
  subtitle?: string;
  contact_button?: string;
  content?: string;
  button?: string;
  content_after_clicking_button?: string;
  box_1?: Box;
  box_2?: Box;
  box_3?: Box;
}

export interface Footer {
  title: string;
  subtitle: string;
  phoneNumber: string;
  fixNumber: string;
  address: string;
}

export interface ContentData {
  fr: {
    header: {
      section_1: string;
      section_2: string;
      section_3: string;
      section_4: string;
    };
    section_1: Section;
    section_2: Section;
    section_3: {
      title: string;
      box_1: Box;
      box_2: Box;
      box_3: Box;
    };
    section_4: Section;
    section_5: Section;
    footer: Footer;
  };
}

export interface ContentContextType {
  content: ContentData;
  setContent: React.Dispatch<React.SetStateAction<ContentData>>;
}

export interface NavigatorWithConnection extends Navigator {
  connection?: {
    downlink?: number;
    effectiveType?: string;
  };
}

export interface FileInfoResponseData {
  sha?: string;
}

export interface ArrowProps {
  fill?: string;
  width?: string;
  height?: string;
  viewBox?: string;
  baseProfile?: string;
  xmlns?: string;
  overflow?: string;
  reversed?: boolean;
}

export interface FootballPropsSVG {
  fill?: string;
  width?: string;
  height?: string;
  viewBox?: string;
  baseProfile?: string;
  xmlns?: string;
  overflow?: string;
}

export interface JudgeSVGProps {
  fill?: string;
  width?: string;
  height?: string;
  viewBox?: string;
  baseProfile?: string;
  xmlns?: string;
  overflow?: string;
}

export interface ReverseArrowProps {
  fill?: string;
  width?: string;
  height?: string;
  viewBox?: string;
  baseProfile?: string;
  xmlns?: string;
  overflow?: string;
  reversed?: boolean;
  isGrey?: boolean;
  lilArrow?: boolean;
  isWhite?: boolean;
}

export interface RoofSVGProps {
  fill?: string;
  width?: string;
  height?: string;
  viewBox?: string;
  baseProfile?: string;
  xmlns?: string;
  overflow?: string;
}

export interface ToggleProps {
  isToggled: boolean;
  size?: string; // La taille est optionnelle et a une valeur par défaut si non fournie
}
