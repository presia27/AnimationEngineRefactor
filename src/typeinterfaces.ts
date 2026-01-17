import { InputAction } from "./inputactionlist.ts";

export interface XY {
  x: number;
  y: number;
}

export interface VelocityCommand {
  direction: XY;
  speed: number;
}

type inputType = "key" | "mouseClick";

export interface InputMapValue {
  type: inputType;
  value: string;
  action: InputAction;
}
