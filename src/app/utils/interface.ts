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
  