import { MotionEventView } from "motion-event";
import type { MotionEventPayload, GestureEventPayload } from "motion-event";
import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const FPS_OPTIONS = [1, 30, 60, 120];

export default function App() {
  const [motionEvent, setMotionEvent] = useState<MotionEventPayload | null>(
    null,
  );
  const [gestureEvent, setGestureEvent] = useState<GestureEventPayload | null>(
    null,
  );
  const [targetFPS, setTargetFPS] = useState(30);

  const handleMotionEvent = (event: { nativeEvent: MotionEventPayload }) => {
    setMotionEvent(event.nativeEvent);
  };

  const handleGestureEvent = (event: { nativeEvent: GestureEventPayload }) => {
    setGestureEvent(event.nativeEvent);
  };

  return (
    <View style={styles.container}>
      <View style={styles.fpsContainer}>
        {FPS_OPTIONS.map((fps) => (
          <TouchableOpacity
            key={fps}
            style={[
              styles.fpsButton,
              targetFPS === fps && styles.fpsButtonActive,
            ]}
            onPress={() => setTargetFPS(fps)}
          >
            <Text style={styles.fpsText}>{fps} FPS</Text>
          </TouchableOpacity>
        ))}
      </View>

      <MotionEventView
        style={styles.motionArea}
        targetFPS={targetFPS}
        onMotionEvent={handleMotionEvent}
        onGestureEvent={handleGestureEvent}
      />

      <View style={styles.eventsContainer}>
        <Text style={styles.eventTitle}>Motion Event:</Text>
        <Text style={styles.eventText}>
          {motionEvent
            ? JSON.stringify(motionEvent, null, 2)
            : "No motion events yet"}
        </Text>

        <Text style={styles.eventTitle}>Gesture Event:</Text>
        <Text style={styles.eventText}>
          {gestureEvent
            ? JSON.stringify(gestureEvent, null, 2)
            : "No gesture events yet"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f5f5f5",
  },
  fpsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 12,
  },
  fpsButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: "#ddd",
    borderRadius: 8,
  },
  fpsButtonActive: {
    backgroundColor: "#4caf50",
  },
  fpsText: {
    fontWeight: "bold",
    color: "#fff",
  },
  motionArea: {
    width: "100%",
    height: 200,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventsContainer: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginVertical: 5,
  },
  eventText: {
    fontSize: 12,
    color: "#333",
    fontFamily: "monospace",
    marginBottom: 10,
  },
});
