import { EventSubscription } from "expo-modules-core";

import {
  MotionEvent,
  MotionEventListener,
  MotionEventName,
  MotionEventCoords,
  MotionEventProperties,
} from "./MotionEvent.types";
import MotionEventModule from "./MotionEventModule";

export function startListening(): void {
  MotionEventModule.startListening();
}

export function stopListening(): void {
  MotionEventModule.stopListening();
}

export function setTargetFPS(fps: number): void {
  MotionEventModule.setTargetFPS(fps);
}

export function addMotionEventListener(
  // eslint-disable-next-line prettier/prettier
  listener: MotionEventListener
): EventSubscription {
  return MotionEventModule.addListener("onMotionEvent", listener);
}

export type {
  MotionEvent,
  MotionEventCoords,
  MotionEventProperties,
  MotionEventListener,
  MotionEventName,
  EventSubscription,
};
