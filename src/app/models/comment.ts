export interface Comment {
  by: string;
  id: number;
  parent?: number;
  text: string;
  time: number;
  kids?: number[];
  deleted?: boolean;
  dead?: boolean;
  type?: string;
}