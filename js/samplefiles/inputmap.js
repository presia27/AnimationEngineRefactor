import { InputAction } from "../inputactionlist.js";
export const myInputMap = [
    { type: "key", value: "w", action: InputAction.MOVE_UP },
    { type: "key", value: "a", action: InputAction.MOVE_LEFT },
    { type: "key", value: "s", action: InputAction.MOVE_DOWN },
    { type: "key", value: "d", action: InputAction.MOVE_RIGHT }
];
