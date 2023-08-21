import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Textinput from "../components/TextInput";
import ButtonComponent from "../components/ButtonComponent";
import { useLogin } from "../components/LoginProvider";

const Signup = ({ navigation }) => {
  const { handleRegister } = useLogin();

  const [pending, setPending] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    handleRegister(username, email, password);
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
      <Text
        style={{
          fontSize: 50,
          fontWeight: 600,
          fontWeight: "bold",
          letterSpacing: -3,
        }}
      >
        S'inscrire
      </Text>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 400,
          textAlign: "center",
          fontSize: 16,
        }}
      >
        Content de vous compter parmis nous, inscrivez-vous a votre compte pour
        voir le contenue
      </Text>
      <View
        style={{
          width: "100%",
          gap: 20,
          padding: 20,
        }}
      >
        <Textinput placeholder={"Votre pseudo"} onChangeText={setUsername} />
        <Textinput placeholder={"Votre email"} onChangeText={setEmail} />
        <Textinput
          placeholder={"Votre mot de passe"}
          onChangeText={setPassword}
          isPassword
        />
      </View>
      <ButtonComponent
        title={"Inscription"}
        onPress={handleSignup}
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
          Vous avez déjà un compte ?
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text
            style={{ fontSize: 18, fontWeight: 400, color: "rgb(65 105 225)" }}
          >
            Connectez-vous
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signup;
