import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ResponsiveText from "./RnText";
import { colors } from "../constants/colorsPallet";
import { hp, wp } from "../helpers/Responsiveness";
import Icon from "./Icon";
import { globalPath } from "../constants/globalPath";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, rightIcon,leftIcon, dots }) => {
  const navigation=useNavigation()
  return (
    <View
      style={{
        backgroundColor: colors.grey1,
        alignItems: "center",
        padding: wp(5),
        flexDirection: "row",
        justifyContent: rightIcon ? "space-between" : "center",
      }}
    >
      {rightIcon &&
        (leftIcon ? (
          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Icon source={globalPath.leftA} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <Icon source={globalPath.logou} />
          </TouchableOpacity>
        ))}
      <ResponsiveText size={4} weight={"bold"} color={colors.white}>
        {title}
      </ResponsiveText>
      {rightIcon &&
        (dots ? (
          <TouchableOpacity>
            <Icon source={globalPath.dots} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <Icon source={globalPath.logout} />
          </TouchableOpacity>
        ))}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
