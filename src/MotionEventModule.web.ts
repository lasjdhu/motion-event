import { registerWebModule, NativeModule } from 'expo';

import { MotionEventModuleEvents } from './MotionEvent.types';

class MotionEventModule extends NativeModule<MotionEventModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(MotionEventModule);
