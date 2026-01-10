import { Banner as BannerProps } from "@/interfaces/Banner";

export interface Banner {
  loading?: boolean;
  height?: string | number;
  data?: Array<BannerProps>;
}
