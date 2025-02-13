import { EventSubscription } from "expo-modules-core";

export const MotionEventActions = {
  DOWN: 0,
  UP: 1,
  MOVE: 2,
  CANCEL: 3,
  POINTER_DOWN: 5,
  POINTER_UP: 6,
} as const;

export const ToolTypes = {
  FINGER: 1,
  STYLUS: 2,
  MOUSE: 3,
  ERASER: 4,
} as const;

export interface MotionEventCoords {
  orientation: number;
  pressure: number;
  size: number;
  toolMajor: number;
  toolMinor: number;
  touchMajor: number;
  touchMinor: number;
  x: number;
  y: number;
}

export interface MotionEventProperties {
  id: number;
  toolType: number;
}

export interface MotionEvent {
  action: number;
  actionMasked: number;
  actionIndex: number;
  eventTime: number;
  downTime: number;
  edgeFlags: number;
  deviceId: number;
  source: number;
  pointerCount: number;
  pointerCoords: MotionEventCoords[];
  pointerProperties: MotionEventProperties[];
  rawX: number;
  rawY: number;
  xPrecision: number;
  yPrecision: number;
  velocityX: number;
  velocityY: number;
  fps: number;
}

export interface MotionEventError {
  code: string;
  message: string;
  details?: any;
}

export type MotionEventResult =
  | { type: "success"; data: MotionEvent }
  | { type: "error"; error: MotionEventError };

export type MotionEventName = "onMotionEvent";
export type MotionEventListener = (event: MotionEvent) => void;

export interface MotionEventModule {
  startListening(): void;
  stopListening(): void;
  setTargetFPS(fps: number): void;
  addListener(
    eventName: MotionEventName,
    listener: MotionEventListener,
  ): EventSubscription;
}
