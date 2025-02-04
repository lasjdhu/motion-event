import { MotionEventView } from "motion-event";
import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";

export default function App() {
  const [events, setEvents] = useState<string | null>(null);

  const handleMotionEvent = (event: { nativeEvent: any }) => {
    console.log("Motion Event:", event.nativeEvent);
    setEvents(JSON.stringify(event.nativeEvent, null, 2));
  };

  return (
    <View style={styles.container}>
      <Text>Touch anywhere below to capture motion events:</Text>
      <MotionEventView
        style={styles.motionArea}
        onMotionEvent={handleMotionEvent}
      />
      <Text>{events}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  motionArea: {
    width: 300,
    height: 400,
    backgroundColor: "#ddd",
    borderRadius: 10,
    marginVertical: 20,
  },
});
