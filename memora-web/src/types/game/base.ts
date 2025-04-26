export interface BaseGameConfig {
  id: string,
  type: "memory" | "reaction" | "visual";
  title: string;
}