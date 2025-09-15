export interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url?: string;
      large_image_url?: string;
    };
    webp?: {
      image_url: string;
      small_image_url?: string;
      large_image_url?: string;
    };
  };
  score?: number;
  episodes?: number;
  synopsis?: string;
  genres?: Array<{
    mal_id: number;
    name: string;
  }>;
}
