export interface Story {
  id: number;
  by: string;
  score: number;
  title: string;
  url: string;
  time: number;
  descendants: number;
  kids?: number[];
}
