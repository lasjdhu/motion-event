import { EventSubscription } from "expo-modules-core";

import {
  MotionEvent,
  MotionEventListener,
  MotionEventName,
  MotionEventCoords,
  MotionEventProperties,
  MotionEventActions,
  ToolTypes,
  MotionEventError,
  MotionEventResult,
} from "./MotionEvent.types";
import MotionEventModule from "./MotionEventModule";

export function startListening(): void {
  try {
    MotionEventModule.startListening();
  } catch (error) {
    console.error("Failed to start listening:", error);
  }
}

export function stopListening(): void {
  try {
    MotionEventModule.stopListening();
  } catch (error) {
    console.error("Failed to stop listening:", error);
  }
}

export function setTargetFPS(fps: number): void {
  MotionEventModule.setTargetFPS(fps);
}

export function addMotionEventListener(
  listener: MotionEventListener,
): EventSubscription {
  return MotionEventModule.addListener("onMotionEvent", listener);
}

export { MotionEventActions, ToolTypes };
export type {
  MotionEvent,
  MotionEventCoords,
  MotionEventProperties,
  MotionEventListener,
  MotionEventName,
  MotionEventError,
  MotionEventResult,
  EventSubscription,
};
