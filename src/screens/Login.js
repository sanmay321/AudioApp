import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import { colors } from "../constants/colorsPallet";
import ResponsiveText from "../components/RnText";
import Icon from "../components/Icon";
import { globalPath } from "../constants/globalPath";
import { wp } from "../helpers/Responsiveness";
import Input from "../components/Input";
import RnButton from "../components/RnButton";
import { routeName } from "../constants/routeName";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  return (
    <View style={styles.container}>
      <ResponsiveText
        color={colors.white}
        size={7}
        weight={"bold"}
        textAlign={"center"}
      >
        Log In
      </ResponsiveText>
      <Icon size={wp(90)} source={globalPath.Frame} />
      <View>
        <Input placeholder="E-mail" onChangeText={setEmail} />
        <Input
          placeholder="Password"
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <RnButton
        title={"Log In"}
        disabled={email == "" || Password == ""}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black1,
    justifyContent: "center",
    alignItems: "center",
  },
});
