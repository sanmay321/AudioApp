import {
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../constants/colorsPallet";
import Header from "../components/Header";
import { globalPath } from "../constants/globalPath";
import ResponsiveText from "../components/RnText";
import Icon from "../components/Icon";
import { hp, wp } from "../helpers/Responsiveness";

const AudioDevices = () => {
  const data = [
    {
      name: "Device",
    },
    {
      name: "Device",
    },
    {
      name: "Device",
    },
    {
      name: "Device",
    },
    {
      name: "Device",
    },
    {
      name: "Device",
    },
    {
      name: "Device",
    },
    {
      name: "Device",
    },
    {
      name: "Device",
    },
    {
      name: "Device",
    },
  ];
  return (
    <ImageBackground source={globalPath.backg} style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Header title={"Audio Devices"} />
        <TouchableOpacity style={styles.btnStyle}>
          <ResponsiveText size={3.5}>Add New Device</ResponsiveText>
          <Icon source={globalPath.Frame} />
        </TouchableOpacity>
        <FlatList
          data={data}
          contentContainerStyle={{ alignItems: "center" }}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={styles.box}>
              <Icon size={wp(22)} source={globalPath.Frame} />
              <View style={styles.line} />
              <ResponsiveText margin={[8,0,0,0]}>
                {item.name}
                {index + 1}
              </ResponsiveText>
            </TouchableOpacity>
          )}
          numColumns={2}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default AudioDevices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.black1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  btnStyle: {
    width: wp(40),
    height: hp(5),
    backgroundColor: colors.grey1,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: hp(2),
    marginBottom:5
  },
  line: {
    width: wp(40),
    backgroundColor: colors.skyblue1,
    height: 2,
  },
  box: {
    width: wp(40),
    height: hp(14),
    backgroundColor: colors.grey1,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
  },
});
