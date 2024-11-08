import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

const App = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-pblack">Aora</Text>
      <StatusBar style="auto" />
      <Link href={"/home"} style={{ color: "blue" }}>
        Home
      </Link>
    </View>
  );
};
export default App;
