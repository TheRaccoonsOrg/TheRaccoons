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

// types.ts
export interface PageData {
  id: number;
  title: string;
  content: string;
}
