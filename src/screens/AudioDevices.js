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

const AudioDevices = ({navigation}) => {
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
        <Header title={"Audio Devices"}  rightIcon/>
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => setOpenModal(true)}
        >
          <ResponsiveText size={3.5}>Add New Device</ResponsiveText>
          <Icon source={globalPath.Frame} />
        </TouchableOpacity>
        <FlatList
          data={data}
          contentContainerStyle={{ alignItems: "center" }}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={styles.box} onPress={() => navigation.navigate(routeName.DEVICE)}>
              <Icon
                margin={[5, 0, 5, 0]}
                size={wp(18)}
                source={globalPath.voice}
              />
              <View style={styles.line} />
              <ResponsiveText margin={[8, 0, 0, 0]}>
                {item.name}
                {index + 1}
              </ResponsiveText>
            </TouchableOpacity>
          )}
          numColumns={2}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={openModal}
          onRequestClose={() => {
            setOpenModal(!openModal);
          }}
        >
          <View style={styles.modalView}>
            <DropDown
              data={data.map((a) => a.name)}
              defaultButtonText={"Select Device"}
            />
            <Input
              placeholder="Enter Password"
              width={wp(75)}
              height={wp(11)}
              textAlign="left"
            />
            <RnButton title={"Add Device"} />
          </View>
        </Modal>
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
    marginBottom: 5,
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
  modalView: {
    margin: 20,
    backgroundColor: colors.black,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
