// Reexport the native module. On web, it will be resolved to MotionEventModule.web.ts
// and on native platforms to MotionEventModule.ts
export { default } from './MotionEventModule';
export { default as MotionEventView } from './MotionEventView';
export * from  './MotionEvent.types';
