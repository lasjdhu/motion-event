import { MotionEventView } from "motion-event";
import type { MotionEventPayload } from "motion-event";
import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";

const FPS_OPTIONS = [1, 30, 60, 120];

export default function App() {
  const [motionEvent, setMotionEvent] = useState<MotionEventPayload | null>(
    null
  );
  const [targetFPS, setTargetFPS] = useState(30);

  const handleMotionEvent = (event: { nativeEvent: MotionEventPayload }) => {
    setMotionEvent(event.nativeEvent);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Motion Event Demo</Text>
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
              <Text
                style={[
                  styles.fpsText,
                  targetFPS === fps && styles.fpsTextActive,
                ]}
              >
                {fps} FPS
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.motionContainer}>
        <MotionEventView
          style={styles.motionArea}
          targetFPS={targetFPS}
          onMotionEvent={handleMotionEvent}
        >
          <Text style={styles.motionAreaText}>
            Touch and move around this area
          </Text>
          <Button
            title="Press me"
            onPress={() => console.log("Button pressed")}
          />
          <Text style={styles.motionAreaSubtext}>
            Events will be logged below
          </Text>
        </MotionEventView>
      </View>

      <ScrollView
        style={styles.eventsContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.eventTitle}>Motion Event Data:</Text>
        <Text style={styles.eventText}>
          {motionEvent
            ? JSON.stringify(motionEvent, null, 2)
            : "No motion events yet"}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  fpsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fpsButton: {
    paddingVertical: 10,
    marginHorizontal: 4,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    minWidth: 60,
    alignItems: "center",
  },
  fpsButtonActive: {
    backgroundColor: "#2196F3",
  },
  fpsText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },
  fpsTextActive: {
    color: "#fff",
  },
  motionContainer: {
    padding: 20,
  },
  motionArea: {
    height: 200,
    backgroundColor: "#fff",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  motionAreaText: {
    fontSize: 18,
    textAlign: "center",
    color: "#666",
    fontWeight: "500",
    marginBottom: 8,
  },
  motionAreaSubtext: {
    fontSize: 14,
    color: "#999",
    fontWeight: "400",
  },
  eventsContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 12,
  },
  eventText: {
    fontSize: 13,
    lineHeight: 20,
    color: "#333",
    fontFamily: "monospace",
  },
});
