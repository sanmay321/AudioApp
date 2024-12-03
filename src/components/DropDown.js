//Node Imports
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
//Local Imports
import { globalPath } from "../constants/globalPath";
import { colors } from "../constants/colorsPallet";
import { hp } from "../helpers/Responsiveness";
import { wp } from "../helpers/Responsiveness";
import Icon from "./Icon";
import { handleMargin, handlePadding } from "../constants/theme";
import Fonts from "../helpers/Fonts";
import ResponsiveText from "./RnText";
const defaultWidth = wp(75);
const defaultHeight = wp(11);

export default function DropDown({
  data,
  defaultButtonText,
  defaultValueByIndex,
  onSelect,
  title,
  height,
  width,
  position,
  backgroundColor,
  alignSelf,
  margin,
  padding,
  refreshing,
  disabled,
  search,
  ...props
}) {
  return (
    <View
      style={[
        styles.container,
        margin && handleMargin(margin),
        padding && handlePadding(padding),
        position && { alignSelf: position },
        backgroundColor && { backgroundColor },
        width && { width },
        height && { height },
        alignSelf && { alignSelf },
      ]}
    >
      <SelectDropdown
        search={search}
        statusBarTranslucent={false}
        // disabled={data.length == 0 || disabled}
        // dropdownStyle={{borderRadius: 5}}
        dropdown1RowTxtStyle={styles.textStyle}
        defaultValueByIndex={defaultValueByIndex}
        defaultButtonText={defaultButtonText}
        rowTextStyle={styles.rowtextStyle}
        rowStyle={{
          borderBottomColor: colors.black1,
          backgroundColor:colors.black,
          alignItems:'center'
        }}
        buttonStyle={{
          backgroundColor: null,
          height: height ? height : defaultHeight,
          width: width ? width : defaultWidth,
          borderRadius: 10,
        }}
        buttonTextStyle={styles.textStyle}
        renderCustomizedRowChild={(text) => {
          return (
            <ResponsiveText
              size={3}
              // color={colors.white}
              padding={[0, 10, 0, 10]}
              // textTransform="uppercase"
            >
              {text}
            </ResponsiveText>
          );
        }}
        renderDropdownIcon={() => {
          return (
            <Icon
              source={globalPath.dropdown}
              // tintColor={colors.primary}
              size={18}
              margin={[0, 10, 0, 0]}
            />
          );
        }}
        renderSearchInputRightIcon={() => {
          return (
            <Icon
              source={globalPath.search}
              tintColor={colors.white}
              size={18}
              margin={[0, 10, 0, 0]}
            />
          );
        }}
        searchInputTxtStyle={styles.textStyle}
        searchPlaceHolder="SEARCH"
        // dropdownIconPosition={"left"}
        data={refreshing ? [] : data}
        onSelect={onSelect ? onSelect : () => {}}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: defaultHeight,
    width: defaultWidth,
    alignSelf: "center",
    justifyContent: "center",
    borderColor: colors.skyblue1,
    borderRadius: 10,
    borderWidth: 1,
  },
  textStyle: {
    color: colors.white,
    fontSize: wp(3.5),
    textAlign: "left",
    paddingHorizontal: 5,
    fontFamily: Fonts.MontserratLight,
  },
  rowtextStyle: {
    color: colors.black,
    fontSize: wp(3.5),
    textAlign: "center",
    paddingHorizontal: 5,
    fontFamily: Fonts.MontserratLight,
  },
});
