import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLogin } from "../components/LoginProvider";
import ButtonComponent from "../components/ButtonComponent";
import BlogCard from "../components/BlogCard";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const { profile, handleLogout } = useLogin();
  const [text, setText] = useState("");
  const [posts, setPosts] = useState([]);
  const [postPending, setPostPending] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [reveal, setReveal] = useState(false);

  //function pour recupere la liste des posts avec axios
  const fetchPosts = () => {
    setRefreshing(true);
    axios
      .get("http://192.168.1.68:5000/posts/")
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((err) => console.log(err))
      .finally(() => setRefreshing(false));
  };

  //function pour ajouter un post
  const addPost = async () => {
    setPostPending(true);
    const token = await AsyncStorage.getItem("token");
    axios
      .post(
        "http://192.168.1.68:5000/posts/add",
        { description: text },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        setText("");
        setReveal(false);
        onRefresh();
      })
      .catch((err) => console.log(err))
      .finally(() => setPostPending(false));
  };

  const onRefresh = React.useCallback(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "100%",
            padding: 10,
            backgroundColor: "rgba(195, 231, 238, 1)",
            flexDirection: "row",
          }}
        >
          <View>
            <Text
              style={{
                color: "gray",
              }}
            >
              Bienvenue
            </Text>
            <Text
              style={{
                fontSize: 26,
                fontWeight: 600,
                color: "black",
              }}
            >
              {profile?.username}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              height: 40,
              width: 100,
              backgroundColor: "red",
              marginRight: "auto",
              position: "absolute",
              right: 6,
              top: 15,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
            onPress={handleLogout}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>
              Déconnexion
            </Text>
          </TouchableOpacity>
        </View>
        {reveal ? (
          <>
            <TextInput
              placeholder="Vous postez quoi aujourd'hui ?"
              numberOfLines={5}
              value={text}
              onChangeText={setText}
              style={{
                alignItems: "center",
                height: 100,
                width: "96%",
                backgroundColor: "white",
                borderColor: "#b8b8b8",
                borderWidth: 1,
                textAlignVertical: "top",
                borderRadius: 10,
                margin: 10,
                padding: 10,
              }}
            />
            <View
              style={{
                width: "100%",
                justifyContent: "space-between",
                flexDirection: "row",
                padding: 10,
              }}
            >
              <ButtonComponent
                title="Annuler"
                bg={"red"}
                onPress={() => setReveal(false)}
              />
              <ButtonComponent
                title="Poster"
                bg={"green"}
                onPress={addPost}
                pending={postPending}
              />
            </View>
          </>
        ) : (
          <View style={{ marginTop: 8 }}>
            <ButtonComponent
              title="Poster un article"
              onPress={() => setReveal(true)}
            />
          </View>
        )}

        <ScrollView
          style={{ flex: 1, width: "100%" }}
          contentContainerStyle={{
            alignItems: "center",
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {posts.length === 0 && <Text>Pas de posts</Text>}
          {posts.map((post) => (
            <BlogCard data={post} key={post._id} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;
