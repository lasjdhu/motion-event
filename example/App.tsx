import {
  MotionEvent,
  startListening,
  stopListening,
  setTargetFPS,
  addMotionEventListener,
} from "motion-event";
import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from "react-native";

const EventDataSection = React.memo(
  ({ title, data }: { title: string; data: Record<string, string> }) => {
    const entries = useMemo(() => Object.entries(data), [data]);

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {entries.map(([key, value]) => (
          <Text key={key} style={styles.dataRow}>
            <Text style={styles.dataLabel}>{key}:</Text> {value}
          </Text>
        ))}
      </View>
    );
  },
);

export default function App() {
  const [event, setEvent] = useState<MotionEvent | null>(null);
  const [fps, setFps] = useState("60");

  const formattedGeneralData = useMemo(() => {
    if (!event) return null;
    return {
      "Action type": String(event.action),
      "Action Index": String(event.actionIndex),
      "Action Masked": String(event.actionMasked),
      "Device ID": String(event.deviceId),
      "Down Time": String(event.downTime),
      "Edge Flags": String(event.edgeFlags),
      "Event Time": String(event.eventTime),
      "Current FPS": String(event.fps),
      "Pointer Count": String(event.pointerCount),
      "Raw X": event.rawX.toFixed(2),
      "Raw Y": event.rawY.toFixed(2),
      "Source type": String(event.source),
      "Velocity X": event.velocityX.toFixed(2),
      "Velocity Y": event.velocityY.toFixed(2),
      "Precision X": event.xPrecision.toFixed(4),
      "Precision Y": event.yPrecision.toFixed(4),
    };
  }, [event]);

  const formattedPointerData = useMemo(() => {
    if (!event) return [];
    return event.pointerCoords.map((coord, index) => ({
      Orientation: coord.orientation.toFixed(2),
      Pressure: coord.pressure.toFixed(2),
      Size: coord.size.toFixed(2),
      "Tool Major": coord.toolMajor.toFixed(2),
      "Tool Minor": coord.toolMinor.toFixed(2),
      "Touch Major": coord.touchMajor.toFixed(2),
      "Touch Minor": coord.touchMinor.toFixed(2),
      X: coord.x.toFixed(1),
      Y: coord.y.toFixed(1),
      ID: String(event.pointerProperties[index].id),
      "Tool Type": String(event.pointerProperties[index].toolType),
    }));
  }, [event]);

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
      <View style={styles.header}>
        <View style={styles.hStack}>
          <Pressable onPress={startListening} style={styles.button}>
            <Text style={styles.buttonLabel}>Start</Text>
          </Pressable>
          <Pressable onPress={stopListening} style={styles.button}>
            <Text style={styles.buttonLabel}>Stop</Text>
          </Pressable>
        </View>
        <View style={styles.hStack}>
          <Text style={styles.label}>Target FPS:</Text>
          <TextInput
            style={styles.input}
            value={fps}
            onChangeText={setFps}
            keyboardType="numeric"
            maxLength={3}
          />
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {event && formattedGeneralData ? (
          <View style={styles.eventContainer}>
            <EventDataSection title="General" data={formattedGeneralData} />

            {formattedPointerData.map((pointerData, index) => (
              <EventDataSection
                key={index}
                title={`Pointer ${index + 1}`}
                data={pointerData}
              />
            ))}
          </View>
        ) : (
          <Text style={styles.waiting}>Waiting for motion events...</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f2f5" },
  header: {
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e1e4e8",
  },
  hStack: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  button: {
    width: 120,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#348352",
    borderRadius: 4,
    marginHorizontal: 8,
  },
  buttonLabel: { fontSize: 16, color: "white" },
  label: { fontSize: 16, marginRight: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#e1e4e8",
    borderRadius: 4,
    padding: 8,
    width: 60,
    textAlign: "center",
  },
  scrollView: { flex: 1 },
  waiting: { textAlign: "center", marginTop: 24, fontSize: 16, color: "#666" },
  eventContainer: { padding: 16 },
  section: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginBottom: 12 },
  dataRow: { fontSize: 15, marginBottom: 6 },
  dataLabel: { fontWeight: "500" },
});
