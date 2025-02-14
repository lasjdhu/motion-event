# motion-event [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

Lightweight and efficient Expo module for handling raw motion events on Android

## 🚀 Features

- **Direct access** to Android `MotionEvent` API
- **High-performance event tracking** with minimal overhead
- **Customizable FPS target** to balance responsiveness and performance
- **Multiple touch points support**
- **Expo-compatible**, making integration seamless in managed and bare workflows

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

## ⚙️ Installation

```sh
#TODO
```

## 🔨 API

```sh
#TODO
```

## 🤔 Alternatives

| Library                                                                                          | Focus                       |
| ------------------------------------------------------------------------------------------------ | --------------------------- |
| [react-native-gesture-handler](https://github.com/software-mansion/react-native-gesture-handler) | Gesture-based interactions  |
| [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated)           | Advanced gesture animations |

Unlike gesture-based libraries, `motion-event` is designed for low-level event handling, making it ideal for use cases requiring precise touch tracking, such as custom multi-touch interactions and real-time input processing.
