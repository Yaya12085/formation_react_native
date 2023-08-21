import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLogin } from "../components/LoginProvider";

const Intro = ({ navigation }) => {
  const { pending, isLogin } = useLogin();
  const [route, setRoute] = useState("");

  useEffect(() => {
    if (pending) {
      return;
    }
    if (isLogin) {
      setRoute("Home");
    } else {
      setRoute("Login");
    }
    if (route) {
      navigation.navigate(route);
    }
  }, [route, pending, isLogin]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(195, 231, 238, 1)",
      }}
    >
      <Text
        style={{
          fontSize: 60,
          fontWeight: 600,
          marginVertical: 10,
          textAlign: "center",
          fontWeight: "bold",
          letterSpacing: -5,
        }}
      >
        Post It .
      </Text>
      <Text style={{ fontSize: 16, fontWeight: 400, textAlign: "center" }}>
        Votre application de partage de contenu ivoirien!
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 400,
          textAlign: "center",
          marginTop: 10,
        }}
      >
        Connectez-vous et partagez vos pensées du moment
      </Text>
      <ActivityIndicator
        color={"rgb(65 105 225)"}
        style={{ marginVertical: 20, position: "absolute", bottom: 20 }}
      />
    </View>
  );
};

export default Intro;
