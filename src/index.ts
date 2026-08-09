import type { EventSubscription } from "expo-modules-core";

import type {
  MotionEvent,
  MotionEventListener,
  MotionEventCoords,
  MotionEventProperties,
  StartListeningOptions,
} from "./MotionEvent.types";
import { MotionEventActions, ToolTypes } from "./MotionEvent.types";
import MotionEventModule from "./MotionEventModule";

export function startListening(options: StartListeningOptions = {}): void {
  const targetFps = options.targetFps ?? 60;
  if (!Number.isFinite(targetFps)) {
    throw new RangeError("targetFps must be a finite number");
  }
  MotionEventModule.startListening(
    Math.min(120, Math.max(1, Math.round(targetFps))),
  );
}

export function stopListening(): void {
  MotionEventModule.stopListening();
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
  StartListeningOptions,
  EventSubscription,
};
