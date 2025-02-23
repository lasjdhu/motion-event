# motion-event [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

Lightweight and efficient Expo module for handling raw motion events on Android

## 🚀 Features

- **Direct access** to Android `MotionEvent` API
- **High-performance event tracking** with minimal overhead
- **Customizable FPS target** to balance responsiveness and performance
- **Multiple touch points support**
- **Expo-compatible**, making integration seamless in managed and bare workflows
- Start and stop listening with built-in functions

## Contributing

Your contributions to `motion-event` are welcomed! This package is currently in **testing phase** and is being prepared for publishing on NPM. Initially, this package was created to meet my own specific needs, but contributions from the community are highly encouraged. Feel free to create issues for feature requests, bug reports, or any improvements you have in mind.

If you'd like to contribute code, please check out [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 🎨 Preview

<p align="center">
  <img alt="Example" src="readme-assets/example.gif" width="250"/>
</p>

## 💻 Basic Usage

You can see the working example in the `example` directory.

```tsx
export default function App() {
  const [event, setEvent] = useState<MotionEvent | null>(null);
  const [fps, setFps] = useState(60);

  useEffect(() => {
    startListening();
    setTargetFPS(fps);

    const subscription = addMotionEventListener((motionEvent) => {
      setEvent(motionEvent);
    });

    return () => {
      subscription.remove();
      stopListening();
    };
  }, [fps]);

  return (
    <SafeAreaView>
      <View>
        <Pressable onPress={() => startListening()}>
          <Text>Start</Text>
        </Pressable>
        <Pressable onPress={() => stopListening()}>
          <Text>Stop</Text>
        </Pressable>
        <TextInput value={fps} onChangeText={(e) => setFps(Number(e))} />
      </View>

      <Text>{JSON.stringify(event, null, 2)}</Text>
    </SafeAreaView>
  );
}
```

## 🤔 Alternatives

| Library                                                                                          | Focus                       |
| ------------------------------------------------------------------------------------------------ | --------------------------- |
| [react-native-gesture-handler](https://github.com/software-mansion/react-native-gesture-handler) | Gesture-based interactions  |
| [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated)           | Advanced gesture animations |

Unlike gesture-based libraries, `motion-event` is designed for low-level event handling, making it ideal for use cases requiring precise touch tracking, such as custom multi-touch interactions and real-time input processing.

## API Reference

### Functions

#### `startListening()`

Starts listening for motion events.

```typescript
function startListening(): void;
```

#### `stopListening()`

Stops listening for motion events.

```typescript
function stopListening(): void;
```

#### `setTargetFPS(fps: number)`

Sets the target frames per second for motion event updates.

```typescript
function setTargetFPS(fps: number): void;
```

#### `addMotionEventListener(listener: MotionEventListener)`

Adds a listener for motion events. Returns an EventSubscription that can be used to remove the listener.

```typescript
function addMotionEventListener(
  listener: MotionEventListener,
): EventSubscription;
```

### Constants

#### MotionEventActions

```typescript
const MotionEventActions = {
  DOWN: 0, // Touch down event
  UP: 1, // Touch up event
  MOVE: 2, // Touch move event
  CANCEL: 3, // Touch cancel event
  POINTER_DOWN: 5, // Additional pointer down
  POINTER_UP: 6, // Additional pointer up
} as const;
```

#### ToolTypes

```typescript
const ToolTypes = {
  FINGER: 1, // Touch input from finger
  STYLUS: 2, // Input from stylus
  MOUSE: 3, // Input from mouse
  ERASER: 4, // Input from stylus eraser
} as const;
```

### Types

#### MotionEvent

The main event object containing all motion event data.

```typescript
interface MotionEvent {
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
```

#### MotionEventCoords

Detailed coordinates and properties for each pointer.

```typescript
interface MotionEventCoords {
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
```

#### MotionEventProperties

Properties for each pointer.

```typescript
interface MotionEventProperties {
  id: number; // Unique identifier for the pointer
  toolType: number; // Type of tool (see ToolTypes)
}
```

#### MotionEventError

Error object structure.

```typescript
interface MotionEventError {
  code: string;
  message: string;
  details?: any;
}
```

#### MotionEventResult

Union type for successful and error results.

```typescript
type MotionEventResult =
  | { type: "success"; data: MotionEvent }
  | { type: "error"; error: MotionEventError };
```
