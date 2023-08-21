import { View, Text } from "react-native";
import React from "react";

const BlogCard = ({ data }) => {
  return (
    <View
      style={{
        width: "96%",
        borderRadius: 20,
        margin: 8,
        borderColor: "#b8b8b8",
        borderWidth: 1,
        padding: 10,
        backgroundColor: "#FFFFFFF",
      }}
    >
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontSize: 22, color: "#b8b8b8", fontWeight: "600" }}>
          {data?.user.username}
        </Text>
        <Text style={{ fontSize: 14, color: "#b8b8b8" }}>
          {data.user.email}
        </Text>
      </View>
      <Text style={{ color: "black", marginVertical: 10, fontSize: 18 }}>
        {data?.description}
      </Text>
    </View>
  );
};

export default BlogCard;
