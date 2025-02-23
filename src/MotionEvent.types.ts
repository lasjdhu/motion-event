import { EventSubscription } from "expo-modules-core";

export const MotionEventActions = {
  DOWN: 0, // Touch down event
  UP: 1, // Touch up event
  MOVE: 2, // Touch move event
  CANCEL: 3, // Touch cancel event
  POINTER_DOWN: 5, // Additional pointer down
  POINTER_UP: 6, // Additional pointer up
} as const;

export const ToolTypes = {
  FINGER: 1, // Touch input from finger
  STYLUS: 2, // Input from stylus
  MOUSE: 3, // Input from mouse
  ERASER: 4, // Input from stylus eraser
} as const;

export interface MotionEventCoords {
  orientation: number; // Orientation of the tool
  pressure: number; // Pressure of the touch
  size: number; // Size of the touch area
  toolMajor: number; // Major axis of the tool
  toolMinor: number; // Minor axis of the tool
  touchMajor: number; // Major axis of the touch area
  touchMinor: number; // Minor axis of the touch area
  x: number; // X coordinate
  y: number; // Y coordinate
}

export interface MotionEventProperties {
  id: number; // Unique identifier for the pointer
  toolType: number; // Type of tool (see ToolTypes)
}

export interface MotionEvent {
  action: number; // The action type (see MotionEventActions)
  actionMasked: number; // The masked action type
  actionIndex: number; // Index of the pointer that triggered the event
  eventTime: number; // Time the event occurred
  downTime: number; // Time of the initial down event
  edgeFlags: number; // Flags indicating which edges were touched
  deviceId: number; // ID of the input device
  source: number; // Source of the event
  pointerCount: number; // Number of pointers in the event
  pointerCoords: MotionEventCoords[]; // Array of pointer coordinates
  pointerProperties: MotionEventProperties[]; // Array of pointer properties
  rawX: number; // Raw X coordinate
  rawY: number; // Raw Y coordinate
  xPrecision: number; // X axis precision
  yPrecision: number; // Y axis precision
  velocityX: number; // X axis velocity
  velocityY: number; // Y axis velocity
  fps: number; // Current FPS
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
