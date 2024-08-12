export interface ImageTextSectionType {
  type: "image-text";
  imageURI: string;
  text: string;
  title: string;
  leftToRight: boolean;
}

export interface HeroSectionType {
  type: "hero";
  imageURI: string;
}

export interface DataSectionType {
  type: "data";
  url: string;
}

export type Section = HeroSectionType | ImageTextSectionType | DataSectionType;
