export interface NasaApiResponse {
collection: {
  version: string;
  href: string;
  items: {
    href: string;
    data: {
      center: string;
      title: string;
      nasa_id: string;
      date_created: string;
      keywords: string[];
      media_type: string;
      description_508: string;
      secondary_creator?: string;  
      description: string;
    }[];
    links: {
      href: string;
      rel: string;
      render: string;
    }[];
  }[]}
};