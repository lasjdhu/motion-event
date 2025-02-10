# motion-event [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

`motion-event` is a lightweight and efficient React Native module for handling raw motion events on Android. It provides high-performance tracking of touch gestures, including velocity, pressure, and precision data.

## 🚀 Features

- **Direct access** to Android `MotionEvent` API
- **High-performance event tracking** with minimal overhead
- **Customizable FPS target** to balance responsiveness and performance
- **Multiple touch points support**
- **Expo-compatible**, making integration seamless in managed and bare workflows

## ⚙️ Installation

```sh
#TODO
```

## 🎨 Preview

```sh
#TODO
```

## 🔨 API

```sh
#TODO
```

## 💻 Basic Usage

```tsx
import {
  MotionEvent,
  startListening,
  stopListening,
  setTargetFPS,
  addMotionEventListener,
} from "motion-event";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  Pressable,
  StyleSheet,
} from "react-native";

export default function App() {
  const [event, setEvent] = useState<MotionEvent | null>(null);
  const [fps, setFps] = useState("60");

  useEffect(() => {
    startListening();
    setTargetFPS(Number(fps));

    const subscription = addMotionEventListener((motionEvent) => {
      setEvent(motionEvent);
    });

    return () => {
      subscription.remove();
      stopListening();
    };
  }, [fps]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.controls}>
        <Pressable onPress={() => startListening()} style={styles.button}>
          <Text style={styles.buttonLabel}>Start</Text>
        </Pressable>
        <Pressable onPress={() => stopListening()} style={styles.button}>
          <Text style={styles.buttonLabel}>Stop</Text>
        </Pressable>
        <TextInput
          style={styles.input}
          value={fps}
          onChangeText={setFps}
          keyboardType="numeric"
          maxLength={3}
        />
      </View>

      <ScrollView style={styles.scrollView}>
        {event ? (
          <View>
            <Text>FPS: {event.fps}</Text>
            <Text>
              Velocity: ({event.velocityX.toFixed(2)},{" "}
              {event.velocityY.toFixed(2)})
            </Text>
          </View>
        ) : (
          <Text>Waiting for motion events...</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f0f2f5" },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  button: { padding: 10, backgroundColor: "#348352", borderRadius: 4 },
  buttonLabel: { color: "white" },
  input: { borderWidth: 1, padding: 8, width: 60, textAlign: "center" },
  scrollView: { flex: 1 },
});
```

## 🤔 Alternatives

| Library                                                                                          | Focus                       |
| ------------------------------------------------------------------------------------------------ | --------------------------- |
| [react-native-gesture-handler](https://github.com/software-mansion/react-native-gesture-handler) | Gesture-based interactions  |
| [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated)           | Advanced gesture animations |

Unlike gesture-based libraries, `motion-event` is designed for low-level event handling, making it ideal for use cases requiring precise touch tracking, such as custom multi-touch interactions and real-time input processing.
