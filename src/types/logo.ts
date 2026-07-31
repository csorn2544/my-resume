import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface BaseLogoItem {
  title?: string;
  href?: string;
  ariaLabel?: string;
}

export interface IconLogoItem extends BaseLogoItem {
  icon: IconDefinition;
}

export interface ImageLogoItem extends BaseLogoItem {
  src: string;
  alt?: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
}

export type LogoItem = IconLogoItem | ImageLogoItem;
