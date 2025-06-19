export interface BaseGameConfig {
  id: string,
  type: "memory" | "reaction" | "visual" | "executive function";
  title: string;
}