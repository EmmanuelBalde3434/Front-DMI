import React from "react";
import { View, Text } from "react-native";

type HeaderProps = {
  title: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
};

export default function Header({ title, left, right }: HeaderProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: "#0ea5e9",
      }}
    >
      <View style={{ width: 40, alignItems: "flex-start" }}>
        {left ?? null}
      </View>

      <Text
        style={{
          color: "#fff",
          fontSize: 20,
          fontWeight: "800",
          textAlign: "center",
          flex: 1,
        }}
        numberOfLines={1}
      >
        {title}
      </Text>

      <View style={{ width: 40, alignItems: "flex-end" }}>
        {right ?? null}
      </View>
    </View>
  );
}
