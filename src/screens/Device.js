import {
  FlatList,
  ImageBackground,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../constants/colorsPallet";
import Header from "../components/Header";
import { globalPath } from "../constants/globalPath";
import ResponsiveText from "../components/RnText";
import Icon from "../components/Icon";
import { hp, wp } from "../helpers/Responsiveness";
import DropDown from "../components/DropDown";
import Input from "../components/Input";
import RnButton from "../components/RnButton";
import { routeName } from "../constants/routeName";

const Device = ({ navigation }) => {
  const [openModal, setOpenModal] = useState(false);
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
        <Header title={"Device 1"} leftIcon rightIcon dots />
        <View style={styles.today}>
          <TouchableOpacity>
            <Icon source={globalPath.leftA} />
          </TouchableOpacity>
          <ResponsiveText>Today</ResponsiveText>
          <TouchableOpacity>
            <Icon source={globalPath.rightA} />
          </TouchableOpacity>
        </View>
        <View style={{ height: hp(20) }}>
          <FlatList
            horizontal
            data={data}
            contentContainerStyle={{
              alignItems: "center",
              backgroundColor: colors.grey1,
            }}
            renderItem={({ item, index }) => (
              <ResponsiveText margin={[8, 0, 0, 0]}>
                {item.name}
                {index + 1}
              </ResponsiveText>
            )}
          />
        </View>
        <View style={styles.controlerContainer}>
          <View style={styles.time}>
            <ResponsiveText>04:40:45</ResponsiveText>
          </View>
          <View style={styles.control}>
            <TouchableOpacity>
              <Icon source={globalPath.dec} size={wp(7)} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon source={globalPath.pause} size={wp(5)} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon source={globalPath.increase} size={wp(7)} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Device;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  controlerContainer: {
    flexDirection: "row",
    alignItems: "center",
    // width: wp(40),
    justifyContent: "space-between",
    paddingHorizontal: wp(10),
    backgroundColor: colors.grey1,
    height: hp(6),
    marginTop: hp(2),
  },
  time: {
    backgroundColor: colors.skyblue1,
    height: 25,
    width: wp(20),
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  control: {
    flexDirection: "row",
    alignItems: "center",
    width: wp(40),
    justifyContent: "space-between",
  },
  today: {
    flexDirection: "row",
    alignSelf: "center",
    width: wp(40),
    justifyContent: "space-between",
    marginVertical: hp(2),
  },
});
