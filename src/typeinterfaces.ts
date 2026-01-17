import { InputAction } from "./inputactionlist.ts";

export type AssetTypes = "img" | "audio" | "other";

export interface IAssetList {
  id: string;
  type: AssetTypes;
  location: string;
}

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
