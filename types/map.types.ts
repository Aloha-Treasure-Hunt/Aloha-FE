export interface MapProps {
  center: [number, number];
  zoom: number;
  markers: Array<{
    position: [number, number];
    radius: number;
    color: string;
    name?: string;
    description?: string;
  }>;
  interactive?: boolean;
  height?: string;
}
