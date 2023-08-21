import { useState, useEffect } from "react";
import { View, Text, TextInput } from "react-native";
function Textinput({
  borderColor,
  placeholder,
  value,
  onChangeText,
  isPassword
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View>
      <TextInput
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        placeholder={placeholder}
        style={{
          height: 60,
          borderWidth: 1,
          paddingVertical: 10,
          paddingHorizontal: 12,
          borderRadius: 8,
          borderColor: isFocused ? "rgb(65 105 225)" : "gray"
        }}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPassword ? true : false}
      />
    </View>
  );
}
export default Textinput;
