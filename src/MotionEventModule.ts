import { NativeModule, requireNativeModule } from "expo";

import { MotionEventModuleEvents } from "./MotionEvent.types";

declare class MotionEventModule extends NativeModule<MotionEventModuleEvents> {}

export default requireNativeModule<MotionEventModule>("MotionEvent");
