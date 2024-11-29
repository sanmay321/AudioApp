import React, { useRef } from "react";
import { StyleSheet } from "react-native";
import App from "./src/App";
import Login from "./src/screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./src/navigation/Router";

function App1() {
  return <Router />;
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});

export default App1;
