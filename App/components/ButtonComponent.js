import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";

const ButtonComponent = ({ title, onPress, pending, bg }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: bg ? bg : "rgb(65 105 225)",
        width: 150,
        maxWidth: 200,
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onPress}
      disabled={pending}
    >
      {pending ? (
        <ActivityIndicator color={"white"} />
      ) : (
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default ButtonComponent;
