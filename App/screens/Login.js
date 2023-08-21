import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Textinput from "../components/TextInput";
import ButtonComponent from "../components/ButtonComponent";
import axios from "axios";
import { useLogin } from "../components/LoginProvider";

const Login = ({ navigation }) => {
  const [pending, setPending] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin } = useLogin();

  const handleSignin = () => {
    handleLogin(username, password);
  };

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "rgba(195, 231, 238, 1)",
        gap: 12,
      }}
    >
      <Text style={{ fontSize: 50, fontWeight: "bold", letterSpacing: -3 }}>
        Se connecter
      </Text>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 400,
          textAlign: "center",
          fontSize: 16,
        }}
      >
        Connectez-vous a votre compte pour voir le contenue
      </Text>
      <View
        style={{
          width: "100%",
          gap: 20,
          padding: 20,
        }}
      >
        <Textinput placeholder={"Votre username"} onChangeText={setUsername} />
        <Textinput
          placeholder={"Votre mot de passe"}
          onChangeText={setPassword}
          isPassword
        />
      </View>
      <ButtonComponent
        title={"Connexion"}
        onPress={handleSignin}
        pending={pending}
      />
      <View
        style={{
          flexDirection: "row",
          flexWrap: "nowrap",
          gap: 10,
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: 400 }}>
          Vous n'avez pas de compte ?
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Signup");
          }}
        >
          <Text
            style={{ fontSize: 18, fontWeight: 400, color: "rgb(65 105 225)" }}
          >
            Inscrivez-vous
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
