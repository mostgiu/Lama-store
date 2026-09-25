export type productType = {
  id: string | number;
  name: string;
  shortDescription:string;
  price: number;
  sizes:string[];
  colors:string[];
  images: Record<string, string>;
};