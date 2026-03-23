export interface Container {
  slug: string;
  name: string;
  description: string;
  features: string[];
  image: string;
  layout: string;
  photos: string[];
  route?: string;
  badge?: string;
}
