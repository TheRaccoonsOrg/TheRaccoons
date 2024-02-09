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

interface EventCardProps {
  title: string;
  buttonText: string;
  buttonLink: string;
  cardImage?: string;
  show: boolean;
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
