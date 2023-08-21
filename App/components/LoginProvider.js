import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { useContext } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  //states pour les infos de l'user
  const [profile, setProfile] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [pending, setPending] = useState(false);

  ///function pour récuperer les infos de l'user avec un token
  const fetchUser = (token) => {
    setPending(true);
    axios
      .get(
        "http://192.168.1.68:5000/users/current/",

        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          setProfile(res.data.user);
          setIsLogin(true);
        } else {
          //alert err res.data.message
        }
      })
      .catch((err) => {
        setProfile({});
        setIsLogin(false);
      })
      .finally(() => {
        setPending(false);
      });
  };

  //function de connexion
  const handleLogin = (username, password) => {
    axios
      .post("http://192.168.1.68:5000/users/login", { username, password })
      .then(async (res) => {
        if (res.data.success) {
          await AsyncStorage.setItem("token", res.data.token);
          fetchUser(res.data.token);
          //alert err res.data.message
        } else {
          //alert err res.data.message
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //function d'inscription
  const handleRegister = (username, email, password) => {
    axios
      .post("http://192.168.1.68:5000/users/register", {
        username,
        email,
        password,
      })
      .then(async (res) => {
        if (res.data.success) {
          await AsyncStorage.setItem("token", res.data.token);
          fetchUser(res.data.token);
          //alert err res.data.message
        } else {
          //alert err res.data.message
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //function de déconnnexion
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    setIsLogin(false);
    setProfile({});
  };
  //function qui check si ya un token sauvegarder ensuite execute la function recup user infos
  const actionOnStart = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token !== null) {
      fetchUser(token);
    } else {
      setIsLogin(false);
      setProfile({});
    }
  };

  useEffect(() => {
    actionOnStart();
  }, []);

  return (
    <LoginContext.Provider
      value={{
        pending,
        profile,
        isLogin,
        handleLogin,
        handleRegister,
        handleLogout,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;
