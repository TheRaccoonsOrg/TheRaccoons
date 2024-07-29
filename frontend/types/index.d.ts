export interface SiteConfig {
  name: string;
  author: string;
  description: string;
  keywords: Array<string>;
  url: {
    base: string;
    author: string;
  };
}

export interface ContactConfig {
  email: string;
}

export interface InfoCardProps {
  text: string;
  imagePath: string;
  alt: string;
  width: number;
  height: number;
  buttonText?: string;
  buttonHref?: string;
  linkText?: string;
  linkHref?: string;
}

export type EventTypes = 'hackathon' | 'workshop' | 'other';
interface EventCardProps {
  typeOfEvent: EventTypes;
  cardTitle: string;
  buttonText: string;
  buttonLink: string;
  cardImage: string;
  lastModified?: string;
  show: boolean;
  date?: Date;
}

interface CategoriesProps {
  categorieName: string;
  position: {
    title: string | null;
    projectName: string[];
    description: string | null;
  }[];
}

type CombinedImageProps = {
  imageStyles: string;
  src: string;
  alt: string;
  imageWidth: number;
  imageHeight: number;
  isPriority: boolean;
  date: string;
  place: string;
};

interface PartnerImagesProps {
  imagePath: string;
  alt: string;
  width: number;
  height: number;
  linkHref: string;
}

interface CategoriesProps {
  categorieName: string;
  position: {
    title: string | null;
    projectName: string[];
    description: string | null;
  }[];
}

type CombinedImageProps = {
  imageStyles: string;
  src: string;
  alt: string;
  imageWidth: number;
  imageHeight: number;
  isPriority: boolean;
  date: string;
  place: string;
};

interface PartnerImagesProps {
  imagePath: string;
  alt: string;
  width: number;
  height: number;
  linkHref: string;
}

interface WorkshopProps extends EventCardProps {
  // Card details
  typeOfEvent: 'workshop';
  // Page details
  slug: string;
  title: string;
  dateWithText: string;
  place: string;
  eventShortDescription: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  description: string;
  moreInfo?: string;
  moreInfoLink?: string;
  description2nd: string;
  when: string;
  where: string;
  necessary: string;
  registerLink: string;
  whatToExpect?: string;
  slidesLink?: string;
  timeFrames?: {
    timeFrame?: string;
    descriptionOfTimeFrame?: { shortDescription?: string }[];
  }[];

  subInfoSection: { shortDescription: string }[];
}

interface HeroHeaderProps {
  firstDesc: string;
  secondDesc: string;
  imageSrc: string;
  imageAlt: string;
}

export interface RegisterFormProps {
  translations: {
    validation: {
      name: string;
      email: string;
      emailValid: string;
      password: string;
    };
    text: {
      title: string;
      name: string;
      email: string;
      password: string;
      registerButton: string;
      loginLink: string;
    };
  };
}

export interface LoginFormProps {
  translations: {
    validation: {
      email: string;
      password: string;
    };
    text: {
      title: string;
      email: string;
      password: string;
      forgotPasswordLink: string;
      loginButton: string;
      registerLink: string;
    };
  };
}

export interface FormField {
  ref: string;
  title: string;
  type: string;
}
